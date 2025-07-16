export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const gqlEndpoint = 'https://gql.pump.fun/graphql';

  try {
    const gqlResponse = await fetch(gqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const data = await gqlResponse.json();

    if (!gqlResponse.ok) {
      return res.status(gqlResponse.status).json({
        error: 'Pump.fun error',
        message: data.error || 'Something went wrong',
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: 'Proxy error',
      message: err.message || 'internal error',
    });
  }
}
