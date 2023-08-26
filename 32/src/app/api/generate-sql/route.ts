import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

export const runtime = 'edge'

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!
})

const openai = new OpenAIApi(apiConfig)

export async function POST(req: Request) {

  const { schema, prompt } = await req.json()

  const message = `
  O seu trabalho é criar queries em SQL a partir de um schema SQL abaixo.

  Schema SQL
  """
  ${schema}
  """

  A partir do schema acima, escreva una query SQL a partir da solicitação abaixo.
  Me retorne somente o código SQL, nada além disso.

  Solicitação: ${prompt}
  `.trim()

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      { role: 'user', content: message }
    ]
  })

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}