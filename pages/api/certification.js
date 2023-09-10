import { getUrl } from '../../lib/tmdb'

export default async function handler(req, res) {
  try {
    const response = await fetch(getUrl('movie/602334/release_dates'))
    const data = await response.json()
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// https://api.themoviedb.org/3/movie/{movie_id}/release_dates?api_key=<<api_key>>
