import Anthropic from '@anthropic-ai/sdk'

const MODEL = 'claude-sonnet-4-6'
const MAX_TOKENS = 4096

let client = null

function getClient() {
  if (!client) {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
    if (!apiKey) {
      throw new Error('VITE_ANTHROPIC_API_KEY is not set. Add it to your .env file.')
    }
    client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })
  }
  return client
}

/**
 * Send a single-turn prompt to Claude.
 * Returns { rawResponse: string }.
 * Throws on API or network error.
 */
export async function callClaude(prompt) {
  const anthropic = getClient()
  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    messages: [{ role: 'user', content: prompt }],
  })
  const rawResponse = message.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('')
  return { rawResponse }
}
