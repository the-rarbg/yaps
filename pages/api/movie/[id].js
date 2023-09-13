import { getLinkByIMDB, getMovieCasts, getMovieDetail } from '../../../lib/tmdb'

export default async function handler(req, res) {
  const { id } = req.query

  try {
    const response = await fetch(getMovieDetail(id))
    const response2 = await fetch(getMovieCasts(id))

   
   
   
   
    const data = await response.json()
    const data2 = await response2.json()
    const response3 = await fetch(getLinkByIMDB(data.imdb_id));
    const data3 = await response3.json()   
    
    res.status(200).json({
      detail: data,
      credits: data2,
      imdb :data3
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
