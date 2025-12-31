import fs from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async (event) => {
  const { filePath } = await readBody(event)
  const cleanPath = filePath.startsWith('/') ? filePath.substring(1) : filePath
  const absolutePath = path.resolve(process.cwd(), 'content', `${cleanPath}.md`)

  if (fs.existsSync(absolutePath)) {
    const content = fs.readFileSync(absolutePath, 'utf-8')
    return { content }
  }

  throw createError({ statusCode: 404, statusMessage: 'Arquivo não encontrado' })
})