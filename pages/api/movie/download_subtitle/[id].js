import { downloadSubtitles } from '../../../../lib/opensubtitles'
export default async function handler(req, res) {
  const { id } = req.query

  try {
    const url = downloadSubtitles(id)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Api-Key': 'T9bkK4GY38DZsKykArc5ybmjVCkzDHSj',
        'Content-Type': 'application/json', // Specify content type as JSON
      },
      body: JSON.stringify({ file_id: id }), // Convert to JSON string
    })

    const data = await response.json()
    res.status(200).json({
      results: data,
    })
  } catch (err) {
    res.status(500).json({ error: res })
  }
}
