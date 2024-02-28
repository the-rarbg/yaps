import { getSubtitles } from '../../../../lib/opensubtitles'
export default async function handler(req, res) {
  const { id } = req.query
  try {
    const url = getSubtitles(id)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': '',
        'Api-Key': 'T9bkK4GY38DZsKykArc5ybmjVCkzDHSj',
      },
    })
    const data = await response.json()
    res.status(200).json({
      results: data.data,
      total_pages: [data.total_pages],
      total_results: [data.total_count],
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
