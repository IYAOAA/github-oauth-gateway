import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const code = req.body.code;
  if (!code) {
    return res.status(400).json({ error: 'Missing code' });
  }

  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  try {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id,
        client_secret,
        code
      },
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );

    const token = response.data.access_token;
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: 'OAuth failed', details: error.message });
  }
}