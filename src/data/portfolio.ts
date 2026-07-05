import { asset } from '@/utils/asset'

export type ClientKey = 'app' | 'user' | 'admin' | 'workflow' | 'bot'

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
  mk('app', 1, '登录', '极光背景 · 租户 · 微信', 'CodeVerse 登录页：统一极光渐变背景，Tab 切换手机号 / 密码，租户下拉、短信验证码与微信登录，品牌狐狸 Logo 居中展示。', ['极光全屏背景', '手机号 / 密码 Tab', '微信与其他登录方式']),
  mk('app', 2, '首页', '统计卡 · 九宫格 · 轮播', '登录后首页：问候与搜索框，四张统计卡，3×3 紧凑九宫格入口，下方 Banner 轮播与热门内容，右下角圆形 Logo 学习助手（光纹动画）。', ['统一极光页面背景', '3×3 模块入口', '学习助手悬浮入口']),
  mk('app', 3, '知识库列表', '分类 Chip · 文章卡片', '知识 Tab：横向分类 Chip（全部 / 计算机基础 / 数据结构…），左图右文列表展示 Vue3 笔记、Java 课件、Axios 封装等，带阅读数。', ['横向分类筛选', '封面缩略图卡片', '阅读数展示']),
  mk('app', 4, '课程列表', '全部 / 热门 / 最新', '课程 Tab：搜索与排序 Tab，列表含 MySQL 性能优化、React 18、Spring Cloud、408 全程班等，展示副标题与课时数。', ['课程搜索', 'Tab 切换排序', '课时数标注']),
  mk('app', 5, '公共题库', '408 科目 · 难度筛选', '考试 Tab「公共题库」：科目 Chip（数据结构 / 计组 / OS / 计网）与难度筛选，判断题卡片带章节 Tag 与「立即练习」。', ['408 四科切换', '难度 Chip', '立即练习入口']),
  mk('app', 6, '单题练习', '判断题 · 提交答案', '从题库进入单题练习页：展示章节与难度 Tag，判断题「二叉排序树中序有序」，A/B 正确错误选项，底部提交答案。', ['单题沉浸式作答', '章节 / 难度 Tag', '提交反馈']),
  mk('app', 7, '我的题库', '导入题目 · 空状态', '「我的题库」Tab：主按钮「导入题目」，空状态「暂无个人题目」，支持私有题目参与组卷。', ['导入题目入口', '空状态引导', '与公共题库 Tab 并列']),
  mk('app', 8, '组卷考试', '试卷列表 · 抽题规则', '组卷 Tab 顶部汇总（试卷 / 题量 / 可开考 / 时长），试卷卡展示题数、总分、时长、标签与抽题规则明细，可开始考试。', ['顶部汇总指标', '抽题规则列表', '创建试卷入口']),
  mk('app', 9, '创建试卷', '基本信息表单', '创建试卷页：试卷名称、考试时长、备注，勾选公共题库 / 我的导入题，底部保存或保存并开始考试。', ['基本信息表单', '题库来源勾选', '保存并开始考试']),
  mk('app', 10, '抽题规则', '多规则块编辑', '抽题规则编辑：按来源 / 科目 / 数量 / 分值 / 难度配置多条规则，支持添加与删除规则块。', ['多规则块编辑', '来源与科目下拉', '动态添加规则']),
  mk('app', 11, '考试作答', '倒计时 · 答题卡 · 交卷', '限时作答页：大号倒计时、已答 / 题数 / 总分，答题卡跳题，判断题选项，上一题 / 下一题 / 交卷。', ['顶部计时条', '答题卡跳题', '交卷按钮']),
  mk('app', 12, '考试历史', '状态 Tab · AI 提示', '历史列表按全部 / 已交卷 / 进行中 / 已超时筛选，展示得分、正确率与答对 / 错题统计，低正确率记录提示查看 AI 分析。', ['状态 Tab 筛选', '得分与正确率', 'AI 薄弱分析入口']),
  mk('app', 13, 'AI 学习建议', '成绩概览 · 薄弱章节', '交卷后 AI 报告：成绩概览、AI 评价、薄弱章节（排序 / 查找 / 图）、错题回顾与分步学习建议。', ['AI 自动生成报告', '薄弱章节定位', '错题回顾与建议']),
  mk('app', 14, '我的', '学习账户 · 快捷入口', '个人页：头像与统计（试卷 / 题目 / 题库 / 在学），六宫格快捷入口与学习服务列表（课程 / 考试历史 / 题库练习）。', ['学习数据统计', '六快捷入口', '学习服务分组']),
  mk('app', 15, '课程详情', '章节目录 · 加入学习', '课程详情：封面、标题「Vibe Coding 工作流」、课时统计与章节目录，底部「立即加入学习」。', ['章节目录展开', '加入学习 CTA', '封面与 metadata']),
  mk('app', 16, '课时资料', 'PDF 下载 · 学习建议', '课时页资料 Tab：展示 vue3-notes.pdf 可下载，顶部播放区与学习进度，底部给出先视频后资料的复习建议。', ['配套 PDF 下载', '目录 / 资料 / 笔记 Tab', '学习建议提示']),
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
  mk('admin', 1, '管理端登录', 'bg-content 背景 · 账号登录', 'Vben 登录页：左侧 bg-content 机器人插画背景，右侧 CodeVerse 租户、账号密码与记住账号，支持手机号 / 扫码及第三方登录。', ['品牌插画背景', '多租户选择', '多种登录方式']),
  mk('admin', 2, '运营工作台', '待审核 · 快捷入口', '登录后工作台：待审核内容 / 创作者统计，四象限数据卡（内容 30 / 课程 8 等），快捷入口直达内容、课程、审核、创作者、分类与提示词库。', ['待办统计卡片', '快捷入口网格', '运营指引']),
  mk('admin', 3, '内容分类', '树形分类 · 408 / Vibe Coding', '内容分类树：计算机基础下挂数据结构、Java 后端、前端、Vibe Coding、408 考研等，列展示编码、领域类型 Tag 与启用状态。', ['树表联动', '领域类型 Tag', '子分类新增']),
  mk('admin', 4, '内容标签', 'framework / skill / tool 分组', '标签列表：分组 tool / skill / exam / framework / lang，标签含 Claude、Cursor、408、React、Vue3、Spring Boot、Java 等，带颜色圆点与排序。', ['分组编码', '颜色标识', 'CRUD 操作']),
  mk('admin', 5, '内容管理', '封面 · 类型 · 审核记录', '内容列表：左树筛选分类，右表展示封面、标题、分类、作者、类型 Tag（资料 / 图文）及修改 / 审核记录，共 30 条。', ['封面列预览', '内容类型 Tag', '审核记录跳转']),
  mk('admin', 6, '课程管理', '8 门课 · 难度 Tag', '课程列表：MySQL、React、Spring Cloud、408 全程班、算法、Vue3、Vibe Coding、Java 零基础等，列含封面、领域、难度 Tag（入门 / 进阶 / 高级）。', ['难度色标', '封面缩略图', '审核 / 删除操作']),
  mk('admin', 7, '学习路线', '408 冲刺 · Java 后端路线', '路线列表：408 统考冲刺路线（408 考研，4 节点）与 Java 后端工程师路线（后端开发，4 节点），支持新增 / 编辑 / 删除。', ['领域 Tag', '节点数统计', '路线封面']),
  mk('admin', 8, '提示词库', 'Vibe Coding · 12 条场景', '提示词列表：正则生成、README、日志排查、Props 类型、408 润色、Git Commit、单测、Swagger、SQL 建表、Code Review 等，含场景与难度。', ['场景字段', '难度 Tag', '新增提示词']),
  mk('admin', 9, '考研题库', '408 四科 · 15 道题', '左侧科目表（数据结构 / 计组 / OS / 计网），右侧题目列表：UDP、RISC、BST 中序等判断 / 选择题，支持按题型筛选与新增。', ['科目 / 题目分栏', '章节 Tag', '408 真题维护']),
  mk('admin', 10, 'Agent 知识库', 'Qdrant · RAGFlow 切片', 'Agent 中心知识库：408 与算法题库 KB，配置 Qdrant 向量库、RAGFlow 解析，支持上传文档、同步考试 / 算法与全量同步。', ['向量库选型', 'RAGFlow 解析', '文档同步操作']),
  mk('admin', 11, 'Agent 管理', '408 考研助教 · RAG', 'Agent 定义列表：408 考研助教（exam408_tutor），启用 RAG、最大步数与模型绑定，支持新增 / 编辑 / 删除。', ['Agent 编码', 'RAG 开关', '模型与步数配置']),
  mk('admin', 12, '工具管理', '内置 Tool · 只读', 'Agent 内置工具：search_exam_questions、get_exam_question_detail、get_user_wrong_questions、search_problems 等，供 Agent 调用题库与算法数据。', ['内置工具清单', '工具描述', '只读展示']),
  mk('admin', 13, '集成配置', 'Qdrant · RAGFlow · Dify · Coze', 'Agent 集成配置：Coze 工作流、Dify、RAGFlow 文档解析、Milvus、Qdrant 五条集成，支持测试连接与 CRUD。', ['多引擎集成', '测试连接', '默认集成标记']),
  mk('admin', 14, '算法题库', 'LeetCode 收录', '算法题列表：最长递增子序列、反转链表、两数之和，列含 slug、Algorithm 标签、LeetCode 来源、难度与编辑 / 删除。', ['难度 Tag', 'LeetCode 来源', 'Slug 字段']),
  mk('admin', 15, '面试八股', 'Java 专题树 · JVM 文章', '左侧 Java 专题树（JVM / 并发 / 数据库 / 计网），右侧文章表：JVM 内存、GC、synchronized、MySQL B+ 树、TCP vs UDP 等。', ['专题树导航', '难度 Tag', '浏览量统计']),
  mk('admin', 16, '考试记录', '答卷列表 · AI 建议', '考试记录筛选：试卷、用户、状态 Tag（进行中 / 已交卷），列示得分与交卷时间，已交卷记录可查看 AI 建议。', ['状态色标', 'AI 建议入口', '时间轴字段']),
  mk('admin', 17, 'Banner 运营', '首页轮播配置', 'Banner 列表：算法训练营、Java 后端系统课、创作者计划、Vibe Coding 新课、408 冲刺营等，列示缩略图、跳转链接、排序与启用。', ['缩略图预览', '外链 URL', '启用开关']),
  mk('admin', 18, '创作者', '官方 · 待审核作者', '创作者列表：CodeVerse 官方（已通过，全栈 / Vibe Coding）与码上开花（待审核，Java / 408 / 算法），列示简介、领域 Tag 与审核。', ['审核状态', '领域 Tag', '启用状态']),
  mk('admin', 19, '问答管理', '15 条社区问题', '问答后台：OSI 七层、Vite vs Webpack、LeetCode 顺序、JWT vs Session 等问题，列示提问人、浏览 / 回答数与查看回答。', ['浏览 / 回答数', '状态 Tag', '查看回答']),
  mk('admin', 20, 'AI 模型配置', '通义 · GPT · DeepSeek', 'AI 模型列表：通义 Embedding / Turbo、GPT-4o Mini、DeepSeek Chat、智谱 GLM-4，配置场景、Temperature、MaxToken 与默认模型。', ['OpenAI 兼容配置', '场景与默认模型', 'Temperature / Token']),
]

function mkGame(
  title: string,
  caption: string,
  detail: string,
  highlights: string[],
  image: string,
  client: ClientKey = 'app',
): CaptureSlide {
  return { image, title, caption, detail, highlights, client }
}

const voidCaptures: CaptureSlide[] = [
  mkGame('游戏登录', '账号密码 · 注册 · 哥特背景', 'H5 登录页：大教堂暗色背景，居中金色边框登录框。顶部 VOID EXPEDITION 品牌，表单含账号、密码与昵称（注册可选），主按钮「登录」与次按钮「注册账号」，文案「登录后开始远征」。', ['游戏主题登录框', '账号 / 注册一体', '哥特视觉背景'], gameCap(1)),
  mkGame('新手指引', '五步教程 · 玩法说明', '新手指引页：返回按钮 + 五步卡片——欢迎与通关目标、选将、闯关地图、战斗规则（3 能量 / 杀闪）、自动云端存档。每步标题金色、正文米色，与 C 端教程文案同源。', ['五步玩法引导', 'Roguelike 规则说明', '存档机制介绍'], gameCap(2)),
  mkGame('选将', '四将卡牌 · 继续远征 · 远征历史', '主菜单：顶部品牌与「卡牌对决 · Roguelike 远征」，展示玩家远征统计。四张竖版武将卡——赛拉斯、伊莲、薇拉、雷恩，选中高亮金框并显示技能与体力 / 能量。底部「继续远征 / 开始游戏」，以及远征历史、新手指引、退出登录。', ['四将技能差异化', '继续远征读档', '玩家战绩顶栏'], gameCap(3)),
  mkGame('分支地图', '8 层闯关 · 七类节点', '第一章「虚空大教堂」：顶栏赛拉斯 80/80、金币 99、进度 0/59。1F–8F 纵向分支含战斗、精英、营火、商店、事件、宝箱与 Boss，虚线连接路径，当前层节点高亮可选。', ['Slay the Spire 式分支', '战斗 / 精英 / 宝箱 / Boss', '章节进度顶栏'], gameCap(4)),
  mkGame('卡牌战斗', '出牌阶段 · 杀闪 · 战报面板', '第 2 回合出牌阶段：上方亡魂执剑者（35/46）带防御姿态与力量 Buff，中部 BATTLE LOG 滚动战报；下方赛拉斯（80/80）手牌五张杀 / 闪，每张标注费用与效果，底部「撤退 / 结束出牌」。', ['敌人意图与 Buff', '三国杀风格手牌', '实时战报滚动'], gameCap(5)),
  mkGame('后台登录', '账号 / 手机 · 图形验证码', '虚空远征管理端登录：左侧 banner 品牌区「VOID EXPEDITION / 虚空远征 / 游戏配置与运营数据管理平台」，右侧白卡 Tab 切换账号登录与手机登录。账号 Tab 含用户名、密码、图形验证码（7+5=?）与记住密码。', ['双 Tab 登录方式', 'banner 左文右表单', '虚空远征品牌替换'], gameCap(6), 'admin'),
  mkGame('运营概览', '统计卡 · 远征记录 · 玩家排行', '登录后首页：七项统计（注册玩家、累计远征、通关、进行中存档、武将 / 卡牌 / 事件数），左栏最近远征记录表，右栏玩家排行（按远征次数）与素材配置摘要。白底数据看板，替代原若依更新日志页。', ['游戏运营指标', '远征记录 / 排行', '素材配置一览'], gameCap(7), 'admin'),
  mkGame('运营数据', '玩家统计 · 远征记录 · 存档', '运营数据页：顶部四卡汇总，Tab 切换玩家统计 / 远征记录 / 进行中存档。存档 Tab 按用户搜索，列表展示武将、章节、JSON 存档摘要（heroClass / gold / deck）与更新时间，支持查看与清除。', ['三 Tab 数据视图', '云端存档 JSON', '查看 / 清除操作'], gameCap(8), 'admin'),
  mkGame('武将配置', '列表 + 表单 · 初始牌组', '武将配置：左侧列表 6 位武将（赛拉斯、伊莲、薇拉、雷恩、莉娅等），右侧 Tab 编辑基础属性（标识、称号、头像、体力 / 能量、技能名与描述）与初始牌组、预览。', ['六将属性维护', '技能描述编辑', '初始牌组 Tab'], gameCap(9), 'admin'),
  mkGame('卡牌配置', '46 张 · 结构化 JSON', '卡牌库三栏：左筛选（类型 / 稀有度），中表 46 张牌（杀闪桃、雷杀火杀等），右编辑结构化属性（费用、伤害、护甲、特效 fx）与 JSON 预览，顶部分类统计 16 基本 / 22 锦囊 / 8 卷轴。', ['三栏卡牌 CRUD', '结构化 + JSON 双编辑', '稀有度色标'], gameCap(10), 'admin'),
  mkGame('遗物配置', '卡片网格 · 稀有度 Tag', '遗物列表卡片网格：燃烧之血、金刚杵、锚、准备背包、咖啡杯、金神像、枯枝、冻结之蛋、虚空王冠等，每张含稀有度（普通 / 罕见 / 稀有 / BOSS）、效果描述与标识 slug，点击卡片进入编辑。', ['卡片式遗物浏览', '四级稀有度 Tag', '效果文案维护'], gameCap(11), 'admin'),
  mkGame('随机事件', '主从编辑 · 选项 JSON', '事件列表 + 编辑面板：堕落祭坛、流浪商人、虚空陷阱、治愈之泉四条事件。编辑区含标题、描述、状态，下方选项表维护选项文案与效果 JSON（relic / heal / gold / damage / card）。', ['事件主从结构', '选项效果 JSON', '献祭 / 离开等分支'], gameCap(12), 'admin'),
  mkGame('节点样式', '七类节点 · 图标预览', '地图节点样式配置：战斗、精英、营火、商店、事件、宝箱、Boss 七张卡片，每张展示圆形图标、中英文标识（monster / elite / rest 等）与启用状态，用于地图渲染素材绑定。', ['七类节点图标', '标识 slug 维护', '地图视觉配置'], gameCap(13), 'admin'),
  mkGame('新手指引配置', '六步教程 · 后台维护', '新手指引后台：时间线列表六步（welcome / pick_hero / map / combat / save / win），每步含标识 Tag、状态与完整说明文案，与 H5 端新手指引页一一对应，支持新增 / 编辑 / 删除。', ['六步教程 CRUD', '与 C 端文案同步', '标识 slug 管理'], gameCap(14), 'admin'),
]

const dieCap = (n: number) => asset(`assets/games-die/${n}.png`)
const toolCap = (n: number) => asset(`assets/tools/${n}.png`)

function mkTool(
  n: number,
  title: string,
  caption: string,
  detail: string,
  highlights: string[],
): CaptureSlide {
  return { image: toolCap(n), title, caption, detail, highlights, client: 'app' }
}

const tickOffCaptures: CaptureSlide[] = [
  mkTool(
    1,
    '倒计时首页',
    '昼夜天空 · 狐狸 mascot · 三种模式',
    '首页「下钟」：顶部 Tab 切换上班 / 上课 / 发工资，右侧日 / 月切换昼夜天空。狐狸 mascot 探出卡片，大号倒计时 227:09:35，下方心情文案与目标时间行，四宫格快捷入口与「生成打卡海报」主按钮，底部悬浮圆角 Tab。',
    ['上班 / 上课 / 发工资三模式', '昼夜天空主题切换', '狐狸 mascot + 实时倒计时'],
  ),
  mkTool(
    2,
    '海报弹层',
    '保存分享 · 风景背景 · 打工人文案',
    '从首页一键生成打卡海报：半屏弹层预览海报，背景为湖景照片，叠加倒计时、发薪日与 #打工人自嘲 标签，底部「保存到手机 / 分享好友」，支持长按图片保存。',
    ['一键生成分享图', '倒计时 + 心情文案', '保存 / 分享双 CTA'],
  ),
  mkTool(
    3,
    '打卡海报',
    '样式配置 · 文案标签 · 实时预览',
    '海报 Tab：居中标题「打卡海报」，上方实时预览 TickPosterCanvas，下方配置倒计时类型（上班 / 上课 / 发工资）、海报样式（简约白卡 / 风景背景）、文案标签与随机换一句，一键生成可分享图。',
    ['类型 / 样式 Segmented 切换', '文案标签 + 随机换句', 'Canvas 实时预览'],
  ),
  mkTool(
    4,
    '打卡日记',
    'GitHub 热力图 · 连续打卡 · 时间线',
    '日记 Tab：2026 年 GitHub 风格打卡热力图，连续打卡 1 天与超越用户百分比统计。下方按月份展示打卡时间线，卡片含模式 Tag、文案与配图，形成「看一眼就知道这一年怎么熬过来的」记录。',
    ['年度热力图', '连续打卡统计', '按月时间线 + 配图'],
  ),
  mkTool(
    5,
    '设置',
    '目标时间 · 昼夜 · 提醒 · 背景',
    '设置 Tab：目标时间区配置上班 09:00、上课 08:30、发薪日每月 15 号；外观区切换首页天空（自动 / 白天 / 黑夜）与默认海报背景四选一；提醒区上班前 10 分钟推送开关，以及清除缓存 / 导出配置。',
    ['三类目标时间', '昼夜天空 + 海报背景', '提醒与数据管理'],
  ),
]

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
    tagline: '408 题库 · Agent · 三端同源',
    summary:
      '码述平台实机界面：移动端 16 屏、PC 站 7 屏、Vben 管理端 20 屏。含 Agent 知识库 / 集成配置、AI 考试建议、统一极光背景与学习助手；切换 Tab 可只看某一端，截图与说明一一对应。',
    clients: [
      { key: 'app', name: 'code-verse-uniapp', desc: 'H5 · 16 屏' },
      { key: 'user', name: 'code-verse-user', desc: 'PC · 7 屏' },
      { key: 'admin', name: 'code-verse-admin-vben', desc: 'Admin · 20 屏' },
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
    cover: gameCap(3),
    tagline: 'H5 游戏 · 运营后台 · 选将地图战斗 · 全链路配置',
    summary:
      'H5 游戏端 5 屏 + 运营后台 9 屏，共 14 屏实机截图。游戏侧覆盖登录、新手指引、四将选将、8 层分支地图与杀闪出牌战斗；后台侧覆盖登录、运营概览、武将 / 卡牌 / 遗物 / 事件 / 节点 / 教程配置与存档数据。',
    clients: [
      { key: 'app', name: 'h5-ai-games', desc: 'H5 · 5 屏', label: 'H5 游戏端' },
      { key: 'admin', name: 'h5-ai-games-admin', desc: 'Admin · 9 屏', label: '运营后台' },
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
  {
    id: 'tick-off',
    index: '04',
    title: 'Tick Off',
    subtitle: '下钟 · 打工人倒计时与打卡海报',
    year: '2026',
    cover: toolCap(1),
    tagline: '昼夜主题 · 海报分享 · 打卡日记 · UniApp',
    summary:
      '面向打工人的轻量倒计时工具：UniApp 单端 5 屏实机截图。覆盖首页三种倒计时（上班 / 上课 / 发工资）、昼夜天空与狐狸 mascot、打卡海报生成与分享、GitHub 风格打卡日记，以及目标时间与提醒设置。',
    clients: [
      { key: 'app', name: 'count-app', desc: 'UniApp · 5 屏', label: '移动端' },
    ],
    captures: tickOffCaptures,
    status: 'published',
  },
]

export function getPublishedWorks() {
  return portfolioWorks.filter(w => w.status === 'published')
}
