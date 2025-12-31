import fs from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async (event) => {
  // 1. Captura os dados enviados pelo frontend
  const body = await readBody(event)
  const { filePath, content } = body

  if (!filePath || content === undefined) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Caminho do arquivo ou conteúdo ausente.',
    })
  }

  // 2. Resolve o caminho absoluto
  // Remove a barra inicial do path se existir e adiciona .md
  const cleanPath = filePath.startsWith('/') ? filePath.substring(1) : filePath
  const absolutePath = path.resolve(process.cwd(), 'content', `${cleanPath}.md`)

  try {
    // 3. Garante que a pasta existe (ex: cria 'content/acomodacoes' se não existir)
    const directory = path.dirname(absolutePath)
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true })
    }

    // 4. Escreve o arquivo no disco
    fs.writeFileSync(absolutePath, content, 'utf-8')

    // Opcional: Aqui você pode adicionar uma lógica para salvar logs no seu SQLite
    // console.log(`Arquivo ${cleanPath}.md atualizado com sucesso.`)

    return {
      success: true,
      message: 'Arquivo salvo com sucesso!',
      path: absolutePath
    }
  } catch (error: any) {
    console.error('Erro ao salvar arquivo:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `Erro interno ao gravar no disco: ${error.message}`,
    })
  }
})