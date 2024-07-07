import path from 'path'
import fs from 'fs'
import fsExtra from 'fs-extra'

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

export const updatePackageJson = (
  projectName: string,
  projectDir: string,
  basePath?: string
) => {
  const packageJsonPath = handlePath(`${projectDir}/package.json`, basePath)
  if (!fs.existsSync(packageJsonPath)) {
    console.error(`Package.json not found at ${packageJsonPath}`)
    return
  }
  try {
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8')
    const packageJsonData = JSON.parse(packageJsonContent)
    packageJsonData.name = projectName
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJsonData, null, 2))
  } catch (error) {
    console.error('Error updating package.json:', error)
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
