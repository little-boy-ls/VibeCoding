export interface TechItem {
  name: string
  role: string
}

export interface RepoInfo {
  id: string
  name: string
  folder: string
  port?: string
  summary: string
  stack: string[]
  highlights: string[]
  command: string
}

export interface ModuleShot {
  id: string
  title: string
  client: 'uniapp' | 'user' | 'admin' | 'boot'
  image: string
  caption: string
  features: string[]
}

export interface FeatureBlock {
  id: string
  title: string
  desc: string
  tags: string[]
}

export const projectMeta = {
  name: 'Code-Verse',
  cnName: '码述',
  tagline: '计算机方向学习分享平台',
  description:
    '面向考研 408、算法刷题与 Vibe Coding 的一体化学习系统。四端同源：移动端 UniApp、PC 用户站、Vben 管理后台、芋道 Spring Boot 后端，业务模块 cverse 含 30+ 张表与 AI 大模型接入。',
  year: '2026',
  stats: [
    { label: '业务表', value: '30+' },
    { label: '前端应用', value: '3' },
    { label: 'API 模块', value: 'cverse' },
    { label: '部署端口', value: '48080' },
  ],
}

export const repos: RepoInfo[] = [
  {
    id: 'boot',
    name: 'code-verse-boot',
    folder: 'code-verse-boot',
    port: ':48080',
    summary: '芋道 Spring Boot 2.7 后端，自定义 yudao-module-cverse 承载全部业务域。',
    stack: ['Java 8', 'Spring Boot', 'MyBatis Plus', 'Redis', 'MySQL'],
    highlights: [
      'REST：/admin-api/cverse/* 与 /app-api/cverse/*',
      '考试交卷 AI 建议、可配置大模型代理',
      '多租户、权限、文件、定时任务等基础能力',
    ],
    command: 'mvn spring-boot:run -pl yudao-server',
  },
  {
    id: 'uniapp',
    name: 'code-verse-uniapp',
    folder: 'code-verse-uniapp',
    summary: 'UniApp + Vue3 移动端/H5/小程序 C 端，五 Tab 主框架 + cverse 业务分包。',
    stack: ['Vue 3', 'UniApp', 'Pinia', 'Vite', 'UnoCSS'],
    highlights: [
      '首页、知识库、课程、考试、我的',
      '组卷限时考、考试历史、AI 学习建议',
      '问答社区、提示词库、悬浮 AI 助手',
    ],
    command: 'pnpm dev:h5',
  },
  {
    id: 'admin',
    name: 'code-verse-admin-vben',
    folder: 'code-verse-admin-vben',
    port: ':5666',
    summary: 'Vben Admin 5 运营后台，19 个 cverse 管理模块，动态菜单驱动路由。',
    stack: ['Vue 3', 'Vben', 'Ant Design Vue', 'Vite', 'TypeScript'],
    highlights: [
      '内容/课程/题库/试卷/考试记录 CRUD',
      'AI 模型配置（通义/GPT/DeepSeek）',
      '创作者审核、Banner、问答 moderation',
    ],
    command: 'pnpm dev:antd',
  },
  {
    id: 'user',
    name: 'code-verse-user',
    folder: 'code-verse-user',
    port: ':5667',
    summary: '独立 PC 用户站，Ant Design Vue，对接同一套 app-api。',
    stack: ['Vue 3', 'Pinia', 'Ant Design Vue', 'Vite'],
    highlights: [
      '工作台、知识库、学习中心、工具箱、社区',
      '不依赖 Vben，轻量可单独部署',
    ],
    command: 'pnpm dev',
  },
]

export const features: FeatureBlock[] = [
  {
    id: 'content',
    title: '知识库',
    desc: '视频、图文、资料分类浏览，支持搜索与阅读量统计。',
    tags: ['cverse_content', '分类树', 'H5/PC 同步'],
  },
  {
    id: 'course',
    title: '课程中心',
    desc: '章节课时结构，视频播放、学习进度与笔记。',
    tags: ['章节树', '进度', '评论'],
  },
  {
    id: 'exam',
    title: '考试引擎',
    desc: '408 公共题库、个人题库、规则组卷、限时作答、交卷 AI 分析。',
    tags: ['组卷', '限时考', 'AI 建议'],
  },
  {
    id: 'prompt',
    title: '提示词库',
    desc: 'Vibe Coding 场景模板与 Prompt Chain，可复制复用。',
    tags: ['模板', '变量', '链路'],
  },
  {
    id: 'qa',
    title: '问答社区',
    desc: '提问、回答、采纳与点赞，待解决/已解决筛选。',
    tags: ['社区', '采纳', '分页'],
  },
  {
    id: 'ai',
    title: 'AI 能力',
    desc: '后台配置多厂商模型，App 对话与试卷建议走后端代理。',
    tags: ['通义千问', 'exam_hint', 'chat'],
  },
]

export const moduleShots: ModuleShot[] = [
  {
    id: 'home',
    title: '首页工作台',
    client: 'uniapp',
    image: '/assets/screenshots/home.png',
    caption: '统计卡片、快捷入口、Banner 轮播与 AI 悬浮助手',
    features: ['今日学习', '热门内容', '课程推荐'],
  },
  {
    id: 'content',
    title: '知识库',
    client: 'uniapp',
    image: '/assets/screenshots/content.png',
    caption: '分类 Chips + 内容卡片列表',
    features: ['文章', '视频', '资料'],
  },
  {
    id: 'course',
    title: '课程中心',
    client: 'uniapp',
    image: '/assets/screenshots/course.png',
    caption: '课程列表、课时播放与学习进度',
    features: ['章节', '播放', '笔记'],
  },
  {
    id: 'exam-paper',
    title: '组卷考试',
    client: 'uniapp',
    image: '/assets/screenshots/exam-paper.png',
    caption: '试卷统计、创建试卷、考试历史与 AI 建议',
    features: ['规则组题', '限时', '历史'],
  },
  {
    id: 'exam-bank',
    title: '题库练习',
    client: 'uniapp',
    image: '/assets/screenshots/exam-public.png',
    caption: '公共题库 / 我的题库 Tab，科目与难度筛选',
    features: ['408', '算法', '导入'],
  },
  {
    id: 'tabbar',
    title: '五 Tab 导航',
    client: 'uniapp',
    image: '/assets/screenshots/tab-home.png',
    caption: '自定义 TabBar：首页 / 知识 / 课程 / 考试 / 我的',
    features: ['自定义图标', '缓存策略'],
  },
]

export const techStack: TechItem[] = [
  { name: 'Spring Boot 2.7', role: 'API 服务' },
  { name: 'MyBatis Plus', role: 'ORM' },
  { name: 'Redis', role: '缓存' },
  { name: 'Vue 3 + TS', role: '三端 UI' },
  { name: 'UniApp', role: '移动/H5' },
  { name: 'Vben Admin', role: '运营后台' },
  { name: 'Pinia', role: '状态' },
  { name: 'DashScope API', role: 'AI 代理' },
]
