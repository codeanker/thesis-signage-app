import path from 'path'
import { fileURLToPath } from 'url'

export const dirname = (url: string) => {
  return path.dirname(fileURLToPath(url))
}
