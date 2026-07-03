# ai-show · 全栈作品集

独立产品案例展示站。首页为作品集索引，每个项目提供 **全屏幻灯片（PPT）详览**，素材来自 `public/assets/captures/` 三端实机截图。

## 开发

```bash
pnpm install
pnpm dev      # http://localhost:5180
```

## 截图采集

三端需先启动并联调登录，再执行：

```bash
pnpm capture
```

输出目录：`public/assets/captures/{app,user,admin}/`

## 结构

- `/` — 作品集首页（轮播 + 作品列表）
- `/works/code-verse` — Code-Verse 全屏幻灯片（← → 切换，Esc 返回）

## 作品数据

编辑 `src/data/portfolio.ts` 增加新项目或更新截图说明。
