import { getTvCasts, getTvDetail } from '../../../lib/tmdb'

export default async function handler(req, res) {
  const { id } = req.query

  try {
    const response = await fetch(getTvDetail(id))
    const response2 = await fetch(getTvCasts(id))
    const data = await response.json()
    const data2 = await response2.json()
    res.status(200).json({
      detail: data,
      credits: data2,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
