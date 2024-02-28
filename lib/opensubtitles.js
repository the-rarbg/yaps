import { OPENSUBTITLES_KEY } from '../utils'

export function getSubtitles(id) {
  return `https://api.opensubtitles.com/api/v1/subtitles?imdb_id=${id}`
}
export function downloadSubtitles() {
  return 'https://api.opensubtitles.com/api/v1/download'
}
