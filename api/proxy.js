export default async function handler(req, res) {
  const gqlUrl = 'https://gql.pump.fun/graphql';
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(gqlUrl)}`;

  try {
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();
    console.log('AllOrigins proxy responded:', text);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(text);

  } catch (err) {
    console.error('AllOrigins proxy failed', err);
    res.status(500).json({ error: 'Proxy error', message: err.message });
  }
}
