import path from 'path'
import { fileURLToPath } from 'url'

/**
 * Obtiene el directorio de un archivo a partir de su URL de ES Module
 * @param {string} fileURL - URL del archivo (ej: import.meta.url)
 * @returns {object} ruta del archivo y directorio
 */

export const createDirname = (metaUrl) => {
  // const __dirname = path.dirname(fileURLToPath(metaUrl));
  return {
    __dirname: path.dirname(fileURLToPath(metaUrl)), // Devuelve la ruta
    __filename: fileURLToPath(metaUrl) // Bonus: Similar a __filename de CJS
  }
}
