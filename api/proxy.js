export default async function handler(req, res) {
  try {
    const gqlResponse = await fetch('https://gql.pump.fun/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' // 👈 Add this
      },
      body: JSON.stringify(req.body),
    });

    const data = await gqlResponse.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Proxy error',
      message: error.message,
    });
  }
}
