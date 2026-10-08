/**
 * Avic RAG agent plugin.
 *
 * Current scaffold: registers the model-facing `avic_search` tool so the plugin
 * is loadable and visible end to end. The retrieve path is TODO:
 * query -> embedding -> user vector database -> reranker -> answer context.
 *
 * @module @deepseek-ai/dsh-agent-avic
 */
import type { Context } from '@deepseek-ai/cordis'
import { defineTool } from '@deepseek-ai/dsh-tools'

export const name = 'agent-avic'
// 这个插件依赖 tools 这个服务。Cordis 会等 tools 服务注册好之后，
// 才加载并启动你的插件，同时把 tools 通过上下文（ctx）注入使用
export const inject = ['tools']    

/** Arguments accepted by the avic_search tool, validated by the tool registry. */
interface AvicSearchArgs {
  /** Natural-language retrieval query. */
  query: string
  /** Maximum number of chunks to return after reranking. */
  topK?: number
}                                                                                                               

/**
 * Registers Avic's model-facing capabilities. Registration is an effect:
 * unloading the plugin removes the tool.
 * @param ctx - the scoped plugin context with the tool registry injected.
 */
export function apply(ctx: Context): void {
  ctx.tools.register(defineTool({
    name: 'avic_search',
    description: 'Search the Avic knowledge base. Returns relevant document chunks for the query.',
    parameters: {
      query: { type: 'string', required: true, description: 'Natural-language retrieval query' },
      topK: { type: 'number', description: 'Maximum chunks to return; defaults to 5' },
    },
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: value }],
    },
    async execute(args: AvicSearchArgs): Promise<string> {
      // TODO(avic): implement query -> embedding -> vector DB -> reranker.
      return `[avic_search scaffold] query=${JSON.stringify(args.query)} topK=${String(args.topK ?? 5)} — retrieval backend is not wired yet.`
    },
  }))
}
