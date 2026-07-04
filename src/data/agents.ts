import { asset } from '@/utils/asset'
import type { CaptureSlide, ClientKey } from '@/data/portfolio'

export interface AgentModule {
  id: string
  index: string
  platform: string
  title: string
  subtitle: string
  year: string
  cover: string
  tagline: string
  summary: string
  clients: { key: ClientKey; name: string; desc: string; label?: string }[]
  captures: CaptureSlide[]
  status: 'published' | 'draft'
}

const cozeCap = (n: number) => asset(`assets/agent/coze/${n}.png`)

function mkAgent(
  title: string,
  caption: string,
  detail: string,
  highlights: string[],
  image: string,
  client: ClientKey,
): CaptureSlide {
  return { image, title, caption, detail, highlights, client }
}

const cozeCaptures: CaptureSlide[] = [
  mkAgent(
    'Bot 配置与调试',
    '人设 · 工作流绑定 · 预览出图',
    'UI 设计稿生成助手 Bot：左侧人设与回复逻辑写明何时调用 UI_GPTImage2 工作流（确认页面类型、风格、尺寸后直接调用），右侧编排绑定工作流与变量 key。预览区成功生成极简风手机登录页，并输出布局、配色与交互的设计思路说明。',
    ['工作流触发条件', '变量 key 注入', '预览调试闭环'],
    cozeCap(1),
    'bot',
  ),
  mkAgent(
    '工作流编排',
    '开始 → 大模型 → 文本处理 → 生图',
    'UI_GPTImage2 工作流全链路：开始节点收集 requirement / page_type / style，豆包 2.0 Pro 生成 ui_prompt，文本处理节点拼接 UI 约束，GT2 g2_generate_image 异步出图（image_urls 传空数组 []），结束节点返回 image_url 与 prompt_used。',
    ['变量命名规范', 'Prompt 转英文 UI 描述', '插件参数与异常处理'],
    cozeCap(2),
    'workflow',
  ),
]

export const agentModules: AgentModule[] = [
  {
    id: 'agent-coze',
    index: '01',
    platform: 'Coze',
    title: 'Coze 扣子',
    subtitle: '工作流 + Bot · UI 设计稿生成',
    year: '2026',
    cover: cozeCap(1),
    tagline: '熟悉平台 · 工作流编排 · Bot 绑定 · GPT Image 2 出图',
    summary:
      '从 0 熟悉扣子 2026 新版界面：编程项目内搭建 UI_GPTImage2 工作流（大模型写 Prompt → 文本处理 → 米核 GT2 生图），再封装为 UI 设计稿生成助手 Bot，完成人设、工作流绑定与预览调试。2 屏实机截图覆盖 Bot 编排与工作流画布。',
    clients: [
      { key: 'workflow', name: 'UI_GPTImage2', desc: '工作流 · 5 节点', label: '工作流编排' },
      { key: 'bot', name: 'UI设计稿生成助手', desc: 'Bot · 预览调试', label: 'Bot 配置' },
    ],
    captures: cozeCaptures,
    status: 'published',
  },
]

export function getPublishedAgents() {
  return agentModules.filter(a => a.status === 'published')
}
