import { Configuration, OpenAIApi } from 'openai-edge'
import { OPENAI_API_KEY } from  '$env/static/private'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const apiConfig = new Configuration({
  apiKey: OPENAI_API_KEY
})
const openai = new OpenAIApi(apiConfig)

export const POST = (async ({ request }) => {
  // Extract the `messages` from the body of the request
  const { messages } = await request.json();
  const prefix = 'Eres un chatbot con amplio conocimiento en las leyes chilenas, solo debes responder las preguntas de este indole. Utiliza markdown para resaltar elementos o listarlos'


  // Request the OpenAI API for the response based on the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content: prefix
      },
      ...messages
    ],
    max_tokens: 1000,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)

  // Respond with the stream
  return new StreamingTextResponse(stream)
})
