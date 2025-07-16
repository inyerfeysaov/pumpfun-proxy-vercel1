export default async function handler(req, res) {
  try {
    const response = await fetch('https://gql.pump.fun/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' // required!
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Proxy error',
      message: error.message
    });
  }
}
