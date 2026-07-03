export interface SkillCategory {
  id: string
  index: string
  label: string
  en: string
  note: string
  items: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    index: '01',
    label: '前端开发',
    en: 'Frontend',
    note: 'Vue 生态 · 跨端 · 可视化',
    items: [
      'Vue 3',
      'Vue 2',
      'TypeScript',
      'ECharts',
      'Element UI',
      'Ant Design',
      'Wot Design',
      'UniApp',
    ],
  },
  {
    id: 'backend',
    index: '02',
    label: '后端 & Java',
    en: 'Backend',
    note: 'JavaEE · Spring 体系 · 设计模式',
    items: [
      'Java EE',
      '多线程',
      '异常处理',
      'Spring Boot',
      'MyBatis',
      'MyBatis-Plus',
      'Spring Security',
      'MVC',
      '适配器 / 策略模式',
      'PDM 建模',
    ],
  },
  {
    id: 'micro',
    index: '03',
    label: '微服务',
    en: 'Microservices',
    note: '注册发现 · 链路 · 分布式事务',
    items: [
      'Nacos',
      'Gateway',
      'OpenFeign',
      'SkyWalking',
      'Seata',
      'RocketMQ',
      'ElasticSearch',
      'Quartz',
    ],
  },
  {
    id: 'data',
    index: '04',
    label: '数据存储',
    en: 'Data',
    note: '关系型 · 缓存 · 分库分表 · 同步',
    items: [
      'MySQL',
      '达梦 DM',
      'Redis',
      'ShardingSphere',
      'Canal',
      'DataX',
      'MinIO',
      '阿里云 OSS',
    ],
  },
  {
    id: 'devops',
    index: '05',
    label: '运维 & 工具',
    en: 'DevOps',
    note: '部署 · CI/CD · 开源脚手架',
    items: [
      'CentOS',
      'Nginx',
      'Docker',
      'Jenkins',
      'Git',
      'Maven',
      'Apifox',
      '宝塔',
      '禅道',
      '短信 / OCR',
      'RuoYi-Vue',
      'RuoYi-Cloud',
      '芋道 Cloud',
      'Cursor',
    ],
  },
]

export const skillTotal = skillCategories.reduce((n, c) => n + c.items.length, 0)

export interface SkillTreeNode {
  name: string
  id?: string
  catId?: string
  collapsed?: boolean
  children?: SkillTreeNode[]
}

export interface SkillTreeOptions {
  /** true = 全部分类折叠；数组 = 仅列出 id 的分类展开 */
  expandedCatIds?: string[] | 'all'
}

/** ECharts tree 径向思维导图数据 */
export function buildSkillTreeData(opts: SkillTreeOptions = {}): SkillTreeNode {
  const { expandedCatIds = 'all' } = opts
  const expandAll = expandedCatIds === 'all'

  return {
    name: '全栈',
    id: 'root',
    children: skillCategories.map(cat => ({
      name: cat.label,
      id: cat.id,
      catId: cat.id,
      collapsed: expandAll ? false : !expandedCatIds.includes(cat.id),
      children: cat.items.map(item => ({
        name: item,
        catId: cat.id,
        id: `${cat.id}--${item}`,
      })),
    })),
  }
}

export function findCategory(id: string | undefined) {
  return skillCategories.find(c => c.id === id) ?? skillCategories[0]
}

/** 从 ECharts 节点解析所属分类 id */
export function resolveCategoryId(data: SkillTreeNode | undefined, nodeName?: string): string | null {
  if (data?.catId) return data.catId
  if (data?.id && data.id !== 'root') return data.id

  const name = nodeName ?? data?.name
  if (!name) return null

  const byLabel = skillCategories.find(c => c.label === name)
  if (byLabel) return byLabel.id

  for (const cat of skillCategories) {
    if (cat.items.includes(name)) return cat.id
  }
  return null
}
