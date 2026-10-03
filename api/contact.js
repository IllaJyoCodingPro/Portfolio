const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 5000;

function sendJson(response, status, body) {
  response.status(status).setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(body));
}

function isText(value, maxLength) {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength;
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return sendJson(response, 405, { error: 'Method not allowed.' });
  }

  const { name, email, message, website } = request.body ?? {};

  if (website) {
    return sendJson(response, 400, { error: 'Invalid submission.' });
  }

  if (
    !isText(name, MAX_NAME_LENGTH)
    || typeof email !== 'string'
    || email.length > 254
    || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    || !isText(message, MAX_MESSAGE_LENGTH)
  ) {
    return sendJson(response, 400, { error: 'Please provide a valid name, email, and message.' });
  }

  const flowUrl = process.env.POWER_AUTOMATE_URL;
  if (!flowUrl) {
    console.error('Contact form is not configured: POWER_AUTOMATE_URL is missing.');
    return sendJson(response, 503, { error: 'The contact form is temporarily unavailable.' });
  }

  let parsedFlowUrl;
  try {
    parsedFlowUrl = new URL(flowUrl);
  } catch {
    console.error('Contact form is not configured: POWER_AUTOMATE_URL is invalid.');
    return sendJson(response, 503, { error: 'The contact form is temporarily unavailable.' });
  }

  if (parsedFlowUrl.protocol !== 'https:') {
    console.error('Contact form is not configured: POWER_AUTOMATE_URL must use HTTPS.');
    return sendJson(response, 503, { error: 'The contact form is temporarily unavailable.' });
  }

  try {
    const flowResponse = await fetch(parsedFlowUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(20000),
    });

    if (!flowResponse.ok) {
      console.error(`Contact form flow returned HTTP ${flowResponse.status}.`);
      return sendJson(response, 502, { error: 'Your message could not be saved. Please try again later.' });
    }

    return sendJson(response, 200, { message: 'Your message was saved successfully.' });
  } catch (error) {
    console.error('Contact form could not reach the Power Automate flow.', error);
    return sendJson(response, 502, { error: 'Your message could not be saved. Please try again later.' });
  }
}
