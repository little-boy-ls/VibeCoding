import { asset } from '@/utils/asset'

export type ClientKey = 'app' | 'user' | 'admin'

export interface CaptureSlide {
  image: string
  title: string
  caption: string
  detail: string
  highlights: string[]
  client: ClientKey
}

export interface PortfolioWork {
  id: string
  index: string
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

export const siteMeta = {
  brand: '灵跃',
  title: '灵跃 · VibeCoding 全栈作品集',
  enTitle: 'VibeCoding',
  tagline: 'VibeCoding 全栈作品集',
  description: '',
  logo: asset('assets/banner.png'),
  heroVideo: asset('assets/hero-bg-hd.mp4'),
  stack: ['Spring Boot · cverse', 'UniApp', 'Vue PC', 'Vben Admin'],
}

const cap = (client: ClientKey, n: number) => asset(`assets/captures/${client}/${n}.png`)
const gameCap = (n: number) => asset(`assets/gaems-yuanzheng/${n}.png`)

const mk = (
  client: ClientKey,
  n: number,
  title: string,
  caption: string,
  detail: string,
  highlights: string[],
): CaptureSlide => ({ image: cap(client, n), title, caption, detail, highlights, client })

const appCaptures: CaptureSlide[] = [
  mk('app', 1, '登录', '手机号验证码 · 租户 · 微信', 'CodeVerse 租户下，Tab 切换「手机号 / 密码」。表单含 +86 手机号、短信验证码与「获取验证码」，底部提供微信登录与注册入口，背景为统一蓝白视觉。', ['租户下拉 CodeVerse', '手机号 / 密码 Tab', '微信与其他登录方式']),
  mk('app', 2, '首页', '晚上好 · 数据概览 · 八宫格入口', '登录后首页：顶部问候与搜索框，四张统计卡（知识 30 / 课程 8 / 题库 15 / 问答 15），下方八宫格直达知识库、课程、题库、问答、提示词、组卷、热门课、我的考试，右下角 AI 悬浮入口。', ['统计卡实时数字', '八宫格模块 shortcut', 'AI 助手悬浮球']),
  mk('app', 3, '知识库列表', '分类 Tab · 文章卡片', '知识 Tab 页：顶部分类（全部 / 计算机基础 / 数据结构…），列表展示封面缩略图、标题与阅读数，如「Vue3 组件设计笔记」「Java 入门课件 PDF」「Axios 请求封装」。', ['横向分类筛选', '左图右文卡片', '阅读数展示']),
  mk('app', 4, '课程列表', '全部 / 热门 / 最新', '课程 Tab：搜索框与三个排序 Tab。列表项含封面、标题、副标题与课时数，可见「MySQL 性能优化与索引设计」「React 18 全栈入门」「Spring Cloud 微服务实战」等课程。', ['课程搜索', 'Tab 切换排序', '课时数标注']),
  mk('app', 5, '课程详情', 'Vibe Coding 工作流', '课程详情页展示封面、标题「Vibe Coding 工作流：从需求到可部署」、副标题「AI 辅助全栈开发方法论」，标注 2 课时 / 2 章节，底部「立即加入学习」，下方章节目录含 Prompt 工程基础。', ['章节目录展开', '加入学习 CTA', '封面与 metadata']),
  mk('app', 6, '课时播放', '视频区 · 目录 / 资料 / 笔记', '课时页顶部蓝色导航栏，中部视频占位与进度环（0%），底部 Tab 切换目录、资料、笔记；当前课时「用 AI 生成并 Review CRUD 模块」，资料 Tab 显示「本课时暂无配套资料」。', ['播放进度环', '三 Tab 切换', '正在学习标记']),
  mk('app', 7, '公共题库', '408 科目 · 难度筛选', '考试 Tab 下「公共题库」：二级 Tab 为公共 / 我的 / 组卷。科目 Chip 含数据结构、计组、操作系统、计算机网络；难度可选全部 / 简单 / 中等 / 困难，列表为判断题卡片并带「立即练习」。', ['408 四科切换', '难度 Chip', '判断题卡片']),
  mk('app', 8, '我的题库', '导入题目 · 空状态', '「我的题库」Tab：主按钮「导入题目」，空状态文案「暂无个人题目」，支持用户导入私有题目参与组卷。', ['导入题目入口', '空状态引导', '与公共题库 Tab 并列']),
  mk('app', 9, '组卷考试', '试卷列表 · 抽题规则', '「组卷考试」Tab 顶部统计（试卷 2 / 题量 8 / 可开考 1 / 时长 60 分），操作「考试历史」「创建试卷」。试卷卡展示题数、总分、时长、标签（公共题库 / 规则抽题 / 数据结构）及抽题规则明细。', ['顶部汇总指标', '抽题规则列表', '创建试卷入口']),
  mk('app', 10, '考试历史', '已交卷 / 进行中 / 超时', '历史列表按状态 Tab 筛选。每条记录含试卷名、记录编号、得分与正确率，展示答对题数、错题、限时、总题数；进行中记录可「继续考试」，已交卷可「查看详情」。', ['状态 Tab 筛选', '得分与正确率', '继续 / 详情入口']),
  mk('app', 11, '答题明细', '交卷后逐题复盘', '交卷后答题明细：顶部汇总答对 0/5、限时 30 分钟、错题 5。逐题展示题干、知识点标签（图 / 排序）、你的答案与得分，选项 A/B 为判断题对错。', ['逐题正误标记', '知识点 Tag', '得分拆分']),
  mk('app', 12, '考试作答', '倒计时 · 答题卡 · 交卷', '作答页顶部大号倒计时（29:56）与已答 / 题数 / 总分，答题卡 1–5 跳题，当前第 1 题判断题「快排最坏 O(n²)」，底部上一题 / 下一题 / 交卷。', ['顶部计时条', '答题卡跳题', '交卷按钮']),
  mk('app', 13, '创建试卷', '抽题规则表单', '创建试卷页：勾选包含公共题库 / 我的导入题，规则 1 可选择来源（公共题库）、科目（数据结构）、抽题数量 5、每题分值 2、难度。底部「保存试卷」「保存并开始考试」。', ['多规则块编辑', '来源与科目下拉', '保存并开始考试']),
  mk('app', 14, '问答社区', '待解决 / 已解决', '问答列表含搜索与状态 Tab（全部 / 待解决 / 已解决）。可见问题如「OSI 七层模型速记」「Vite 和 Webpack 构建速度差在哪」「LeetCode 刷题顺序」等，展示回答数与浏览量，右下角发布按钮。', ['问题状态 Tab', '回答 / 浏览统计', '发布问题 FAB']),
  mk('app', 15, '我的', '学习账户 · 快捷入口', '个人页：头像与「学习账户」标签，四格统计（我的试卷 2 / 我的题目 0 / 题库 15 / 在学 8），六宫格快捷入口（问答、提示词、考试、知识、课程、搜索）及学习服务列表。', ['学习数据统计', '六快捷入口', '学习服务分组']),
]

const userCaptures: CaptureSlide[] = [
  mk('user', 1, '工作台首页', '数据概览 · 登录弹窗', '未登录时访问首页，左侧菜单展示知识库 / 计算机基础 / 学习中心，主区有统计卡（知识 30、课程 8、题库 15、分类 5）与推荐专题；居中弹出 CodeVerse 登录框（账号 / 密码 / 进入 CodeVerse）。', ['侧栏模块导航', '统计卡四象限', 'Modal 登录不打断布局']),
  mk('user', 2, '知识库', '全部内容 · 30 篇文章', '知识库 / 全部内容：左侧树形分类，右侧搜索与分页。置顶推荐「Vue3 组件设计笔记」，网格卡片含封面、标题、摘要与阅读数，共 30 篇技术文章。', ['分类树 + 列表', '推荐位大卡', '分页 12 条/页']),
  mk('user', 3, '全部课程', '8 门课 · 156 课时', '学习中心 / 全部课程：筛选 Tab 全部 / 热门 / 最新，搜索框与课程总数。推荐课「MySQL 性能优化与索引设计」含 12 课时，列表展示 React、Spring Cloud 等课程卡片。', ['课程统计卡', '推荐课程横卡', '搜索与 Tab']),
  mk('user', 4, '课程学习', '目录 · 笔记 · 课程介绍', 'Vibe Coding 课程学习页：左栏章节课时列表，中栏图文课时内容，右栏课时信息与上 / 下一课时；底部 Tab 为课程介绍、我的笔记、下载资料、课程评论，介绍区描述 Prompt 与 CRUD 工作流。', ['三栏学习布局', '进度 50% 展示', '笔记与介绍 Tab']),
  mk('user', 5, '提示词库', '12 条模板 · 一键复制', '工具箱 / 提示词库：列表含「正则表达式生成」「README 文档生成」「日志排查助手」「前端 Props 类型定义」等 12 条模板，每条可展开查看占位符并复制。', ['模板卡片列表', '复制 / 展开操作', '开发场景分类']),
  mk('user', 6, '题库练习', '408 操作系统 · 表格刷题', '题库练习中心：Tab 公共 / 我的 / 组卷，左栏科目（数据结构、计组、操作系统、计算机网络），右侧表格列出 OS 真题题干、章节 Tag、年份与难度，行内「练习」按钮。', ['科目侧栏', '408 真题表格', '难度色标']),
  mk('user', 7, '问答社区', '15 个问题 · 待解决筛选', '社区页：顶栏「技术互助 · 经验共享」与发布按钮，Filter 全部 / 待解决 / 已解决。列表与移动端同源问题（OSI、Vite/Webpack、LeetCode 顺序等），展示回答数与浏览量。', ['发布问题 CTA', '状态筛选', '与 App 社区同源']),
]

const adminCaptures: CaptureSlide[] = [
  mk('admin', 1, '管理端登录', '账号密码 · 扫码 / 手机', 'Vben 登录页：左侧品牌插画，右侧 CodeVerse 租户选择、账号 admin、密码框、记住账号，主按钮登录，下方手机号登录 / 扫码登录及微信 / 支付宝 / QQ / GitHub 第三方入口。', ['多租户选择', '多种登录方式', '第三方 OAuth 图标']),
  mk('admin', 2, '内容分类', '树形分类 · 408 / Vibe Coding', '内容分类树：顶级「计算机基础」下挂数据结构、Java 后端、前端开发、Vibe Coding、408 考研等节点，列展示编码、领域类型 Tag、启用状态与增删改操作。', ['树表联动', '领域类型 Tag', '子分类新增']),
  mk('admin', 3, '内容标签', 'framework / skill / tool 分组', '标签列表：分组编码 tool / skill / exam / framework / lang，标签含 Claude、Cursor、408、React、Vue3、Spring Boot、Java 等，带颜色圆点、排序与启用状态。', ['分组编码', '颜色标识', 'CRUD 操作']),
  mk('admin', 4, '内容管理', '封面 · 类型 · 审核记录', '内容列表：左树筛选分类，右表展示编号、封面缩略图、标题（Vue3 笔记、Git 工作流、单元测试等）、分类、作者、类型 Tag（资料 / 图文）及修改 / 审核记录，共 30 条。', ['封面列预览', '内容类型 Tag', '审核记录跳转']),
  mk('admin', 5, '课程管理', '8 门课 · 难度 Tag', '课程列表：MySQL 性能优化、React 18、Spring Cloud、408 全程班、算法系统课、Vue3+TS、Vibe Coding 工作流、Java 零基础等，列含封面、分类、作者、副标题、难度 Tag（入门 / 进阶 / 高级）。', ['难度色标', '封面缩略图', '审核 / 删除操作']),
  mk('admin', 6, '学习路线', '408 冲刺 · Java 后端路线', '路线列表两条：「408 统考冲刺路线」（408 考研领域，4 节点）与「Java 后端工程师路线」（后端开发，4 节点），支持新增 / 编辑 / 删除。', ['领域 Tag', '节点数统计', '路线封面']),
  mk('admin', 7, '提示词库', 'Vibe Coding · 10 条场景', 'Vibe Coding 模块下提示词列表：正则生成、README、日志排查、Props 类型、408 题目润色、Git Commit、单测用例、Swagger 注解、SQL 建表、Code Review 清单等，含场景与难度。', ['场景字段', '难度 Tag', '新增提示词']),
  mk('admin', 8, '考研题库', '408 四科 · 15 道题', '左侧科目表（数据结构 / 计组 / OS / 计网），右侧题目列表：UDP 不可靠传输、RISC 定长指令、BST 中序有序等判断 / 选择题，支持按题型筛选与新增。', ['科目 / 题目分栏', '章节 Tag', '408 真题维护']),
  mk('admin', 9, '算法题库', 'LeetCode 收录', '算法题列表：最长递增子序列（进阶）、反转链表（入门）、两数之和（入门），列含 slug、标签 Algorithm、来源 LeetCode、状态与编辑 / 删除。', ['难度 Tag', 'LeetCode 来源', 'Slug 字段']),
  mk('admin', 10, '考试试卷', '组卷方式 · 时长分值', '试卷列表：创建人 CodeVerse，列展示科目、标题、题数、时长（分）、总分、组卷方式 Tag「规则随机」、状态开启，支持新建试卷。', ['组卷方式 Tag', '题量 / 时长 / 总分', '新建试卷']),
  mk('admin', 11, '面试八股', 'Java 专题树 · JVM 文章', '左侧 Java 专题树（JVM / 并发 / 数据库 / 计算机网络），右侧文章表：JVM 内存区域、GC 算法、synchronized vs ReentrantLock、MySQL B+ 树、TCP vs UDP 等，含难度与浏览量。', ['专题树导航', '难度 Tag', '浏览量统计']),
  mk('admin', 12, '考试记录', '用户答卷 · 状态 Tag', '考试记录筛选：编号、试卷标题、用户 ID、状态。列表用户 CodeVerse 的多条记录，状态 Tag「进行中 / 已交卷」，列示题数 5、得分、答对数与开始 / 交卷时间。', ['状态色标', '得分 / 答对', '时间轴字段']),
  mk('admin', 13, '内容审核', '待审 / 通过 · 驳回', '审核队列：业务类型 + 标题（Spring Boot 快速入门、动规+二分、Vue3+Vben 组件速查），提交人、审核状态 Tag（已通过 / 待审核）、审核意见与通过 / 驳回操作。', ['审核状态 Tag', '查看原文', '通过 / 驳回']),
  mk('admin', 14, 'Banner 运营', '首页轮播配置', 'Banner 列表：算法训练营、Java 后端系统课、加入创作者计划、Vibe Coding 新课、408 考研冲刺营等条目，列示缩略图、跳转链接、排序与启用状态。', ['缩略图预览', '外链 URL', '启用开关']),
  mk('admin', 15, '创作者', '官方 · 待审核作者', '创作者列表：CodeVerse 官方（已通过，标签全栈 / Vibe Coding）与「码上开花」（待审核，Java / 408 / 算法），列示简介、领域 Tag 与审核通过操作。', ['审核状态', '领域 Tag', '启用状态']),
  mk('admin', 16, '问答管理', '15 条社区问题', '问答后台列表：与 C 端同源问题标题，列示提问人、浏览量、回答数、开启状态与「查看回答」，共 15 条记录分页。', ['浏览 / 回答数', '状态 Tag', '查看回答']),
  mk('admin', 17, 'AI 模型配置', '新增模型弹窗', 'AI 模型配置页打开「新增 AI 模型」对话框：展示名称、厂商、模型标识（qwen-turbo / gpt-4o-mini）、API Base、API Key、使用场景、默认开关、Temperature 0.7、Max Token 2048、系统提示词。', ['OpenAI 兼容配置', '场景与默认模型', 'Temperature / Token']),
]

function mkGame(
  title: string,
  caption: string,
  detail: string,
  highlights: string[],
  image: string,
): CaptureSlide {
  return { image, title, caption, detail, highlights, client: 'app' }
}

const voidCaptures: CaptureSlide[] = [
  mkGame('选将', '三将卡牌 · 技能预览 · 开始远征', '主菜单选将页：顶部 Void Expedition 品牌与「卡牌对决 · Roguelike 远征」副标题。三张竖版武将卡可选——赛拉斯（虚空骑士 · 龙胆）、伊莲（深渊法师 · 连环）、薇拉（影刃刺客 · 影袭），选中高亮金框，底部「开始游戏」进入地图。', ['三将技能差异化', '竖版卡牌选将 UI', 'Roguelike 远征引导文案'], gameCap(1)),
  mkGame('分支地图', '7 层闯关 · 战斗 / 营火 / 商店 / 事件', '第一章「虚空大教堂」分支地图：顶栏展示赛拉斯体力 80/80、金币 999 与进度 0/57。1F–7F 纵向节点含战斗（双剑）、营火（火焰）、商店（金币）、事件（问号）与精英（骷髅），虚线连接可选路径，起始 1F 四节点高亮可选。', ['Slay the Spire 式分支', '多类型节点图标', '章节进度顶栏'], gameCap(2)),
  mkGame('卡牌战斗', '出牌阶段 · 杀闪锦囊 · 战报面板', '战斗界面：上方幽影巡礼者（40/40）带「重击」意图，中部战报 BATTLE LOG 记录遭遇与意图；下方赛拉斯（80/80）手牌五张——杀、决、闪等三国杀风格基本牌与锦囊，每张标注费用与效果，底部「撤退 / 结束出牌」。', ['敌人意图预告', '手牌费用与类型', '实时战报滚动'], gameCap(3)),
]

const dieCap = (n: number) => asset(`assets/games-die/${n}.png`)

const stackCaptures: CaptureSlide[] = [
  mkGame('主页', '每日目标 · 团子养成 · 图鉴收集', '首页「叠高高 · 对准落块 · 叠向软软云」：顶部成就进度与礼包入口，中部预览多彩软糖叠塔。下方今日小目标（叠到 9 层）、本周挑战（0/14 层）、团子 Lv.1 养成条、图鉴 0/4，「开始叠~」主按钮与小伙伴排行榜，整体马卡龙糖果色系。', ['每日 / 每周目标', '团子等级 + 图鉴收集', '好友排行榜'], dieCap(1)),
  mkGame('叠塔进行', '点击落块 · 层数累计 · 棉花糖层', '核心玩法页：天空渐变背景，顶部实时层数「0 层」与今日进度 0/9 层、当前「棉花糖层」标签。底部悬浮方块左右摆动，点击「点我」将方块对准落下并叠加，越叠越高，考验节奏与精准度。', ['点击落块核心循环', '实时层数 HUD', '摆动对准判定'], dieCap(2)),
  mkGame('本局结算', '层数评级 · 连击贴贴 · 再来一局', '结算弹窗「本局结束 · 新纪录!」：大号成绩 3 层与三星评级，右侧展示本局叠出的软糖块。连击 / 贴贴 / 最高三项统计，「击败 19% 玩家」进度条与追平提示，底部再来一局 / 分享战绩 / 回首页。', ['成绩评级 + 星级', '连击 / 贴贴数据', '击败百分比激励'], dieCap(3)),
  mkGame('分享战绩', '战绩海报 · 扫码挑战 · 抖音裂变', '分享战绩海报页：卡片式「叠高高 · 软软方块 · 叠塔战绩」，突出击败 19% 玩家、3 层成绩与软糖叠塔插画。底部「你能叠到 4 层吗?」挑战文案与「扫码来挑战我」二维码，成就 1/20，为抖音社交裂变而设计。', ['可分享战绩海报', '扫码挑战裂变', '成就系统'], dieCap(4)),
]

export const portfolioWorks: PortfolioWork[] = [
  {
    id: 'code-verse',
    index: '01',
    title: 'Code-Verse',
    subtitle: '码述 · 计算机学习分享平台',
    year: '2026',
    cover: cap('app', 2),
    tagline: '408 题库 · 课程 · 提示词 · 三端同源',
    summary:
      '码述平台实机界面：移动端 15 屏、PC 站 7 屏、Vben 管理端 17 屏。切换 Tab 可只看某一端；截图与右侧说明一一对应，自动轮播，悬停暂停。',
    clients: [
      { key: 'app', name: 'code-verse-uniapp', desc: 'H5 · 15 屏' },
      { key: 'user', name: 'code-verse-user', desc: 'PC · 7 屏' },
      { key: 'admin', name: 'code-verse-admin-vben', desc: 'Admin · 17 屏' },
    ],
    captures: [...appCaptures, ...userCaptures, ...adminCaptures],
    status: 'published',
  },
  {
    id: 'void-expedition',
    index: '02',
    title: 'Void Expedition',
    subtitle: '虚空远征 · 三国杀风格卡牌 Roguelike',
    year: '2026',
    cover: gameCap(1),
    tagline: '选将 · 分支地图 · 杀闪桃锦囊 · H5 + 小程序',
    summary:
      'H5 浏览器与微信小程序双端同源的 Roguelike 卡牌游戏：选将开局、7 层分支地图闯关、三国杀风格出牌战斗。3 屏实机截图展示核心玩法循环。',
    clients: [
      { key: 'app', name: 'h5-ai-games', desc: 'H5 · 小程序 · 3 屏', label: 'H5 · 微信小程序' },
    ],
    captures: voidCaptures,
    status: 'published',
  },
  {
    id: 'stack-high',
    index: '03',
    title: 'Stack High',
    subtitle: '叠高高 · 抖音软糖叠塔小游戏',
    year: '2026',
    cover: dieCap(1),
    tagline: '点击落块 · 团子养成 · 战绩裂变 · 抖音小游戏',
    summary:
      '抖音平台上线的休闲叠塔小游戏：马卡龙糖果风格，点击对准落块一路叠高。含每日目标、团子养成、图鉴收集与战绩分享裂变。4 屏实机截图覆盖主页到分享的完整闭环。',
    clients: [
      { key: 'app', name: 'stack-high', desc: '抖音小游戏 · 4 屏', label: '抖音小游戏' },
    ],
    captures: stackCaptures,
    status: 'published',
  },
]

export function getPublishedWorks() {
  return portfolioWorks.filter(w => w.status === 'published')
}
