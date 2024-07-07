import path from 'path'
import fs from 'fs'
import fsExtra from 'fs-extra'
import { replaceTemplate, Variable } from './replaceTemplate'

export const handlePath = (
  filePath: string,
  baseUrl: string = path.resolve(process.cwd(), './build/src')
) => path.join(baseUrl, filePath)

export const createDirectory = (dirPath: string, basePath?: string) => {
  const pathDir = handlePath(dirPath, basePath)
  if (!fs.existsSync(pathDir)) {
    fs.mkdirSync(pathDir, { recursive: true })
  }
}

export const copyTemplate = (src: string, dest: string, basePath?: string) => {
  try {
    const srcPath = handlePath(src, basePath)
    const destPath = handlePath(dest, basePath)
    if (!fs.existsSync(srcPath)) {
      throw new Error(`Source path does not exist: ${srcPath}`)
    }
    fsExtra.copySync(srcPath, destPath, { overwrite: true })
  } catch (error) {
    console.error('Error copying template:', error)
  }
}

export const updateFileContent = (
  filePath: string,
  replacements: Variable[],
  basePath?: string
) => {
  try {
    const fileDir = handlePath(filePath, basePath)

    if (!fs.existsSync(fileDir)) {
      throw new Error(`File not found: ${fileDir}`)
    }

    let fileContent = fs.readFileSync(fileDir, 'utf-8')

    fileContent = replaceTemplate(fileContent, replacements)

    fs.writeFileSync(fileDir, fileContent)
    console.log(`Updated file: ${fileDir}`)
  } catch (error) {
    console.error('Error updating file content:', error)
  }
}

export const writeFile = (
  filePath: string,
  data: string,
  basePath?: string
) => {
  const pathname = filePath.replace(/^\.*\/|\/?[^/]+\.[a-z]+|\/$/g, '') // Remove leading directory markers, and remove ending /file-name.extension

  const pathDir = handlePath(pathname, basePath)

  if (!fs.existsSync(pathDir)) {
    fs.mkdirSync(pathDir, { recursive: true })
  }

  const fileDir = handlePath(filePath, basePath)

  fs.writeFileSync(fileDir, data, { flag: 'w' })
}

export const readFile = (filePath: string, basePath?: string) => {
  const fileDir = handlePath(filePath, basePath)

  if (!fs.existsSync(fileDir)) return null

  return fs.readFileSync(fileDir, 'utf-8')
}
