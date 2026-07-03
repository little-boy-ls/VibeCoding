/**
 * 截取三端运行界面（需先登录），输出到 public/assets/captures/
 * 用法: pnpm capture
 * 需先启动: boot :48080, uniapp :9000, user :5667, admin :5666
 */
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '../public/assets/captures')

const CREDS = {
  username: process.env.CV_CAPTURE_USER || 'admin',
  password: process.env.CV_CAPTURE_PASS || 'admin123',
}

const UNIAPP_JOBS = [
  { file: 'uniapp-home.png', url: 'http://localhost:9000/#/pages/index/index' },
  { file: 'uniapp-content.png', url: 'http://localhost:9000/#/pages/content/index' },
  { file: 'uniapp-course.png', url: 'http://localhost:9000/#/pages/course/index' },
  { file: 'uniapp-exam.png', url: 'http://localhost:9000/#/pages/exam/index' },
  { file: 'uniapp-user.png', url: 'http://localhost:9000/#/pages/user/index' },
  { file: 'uniapp-qa.png', url: 'http://localhost:9000/#/pages-cverse/qa/index' },
]

const USER_JOBS = [
  { file: 'user-home.png', url: 'http://localhost:5667/home' },
  { file: 'user-exam.png', url: 'http://localhost:5667/exam' },
]

const ADMIN_JOBS = [
  { file: 'admin-workspace.png', url: 'http://localhost:5666/workspace' },
  { file: 'admin-cverse.png', url: 'http://localhost:5666/cverse/ai-model' },
]

async function shot(page, job, viewport) {
  await page.setViewportSize(viewport)
  try {
    await page.goto(job.url, { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(2500)
    await page.screenshot({ path: path.join(OUT, job.file), fullPage: false })
    console.log('OK', job.file)
    return true
  } catch (e) {
    console.warn('SKIP', job.file, String(e).slice(0, 120))
    return false
  }
}

/** uniapp H5：账号密码登录 */
async function loginUniapp(page) {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('http://localhost:9000/#/pages-core/auth/login', {
    waitUntil: 'networkidle',
    timeout: 30000,
  })
  await page.waitForTimeout(1500)

  const userInput = page.locator('input').first()
  const passInput = page.locator('input').nth(1)
  await userInput.fill(CREDS.username)
  await passInput.fill(CREDS.password)
  await page.getByRole('button', { name: '登录' }).click()

  await page.waitForURL(/#\/pages(?!-core\/auth)/, { timeout: 20000 }).catch(() => {})
  await page.waitForTimeout(2000)

  const url = page.url()
  if (url.includes('/pages-core/auth/login')) {
    throw new Error('uniapp 登录失败，仍在登录页')
  }
  console.log('uniapp logged in ->', url)
}

/** PC 用户站：弹窗登录 */
async function loginUser(page) {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('http://localhost:5667/exam', { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(1000)

  const modal = page.locator('.login-modal-root')
  await modal.waitFor({ state: 'visible', timeout: 10000 })

  await page.getByPlaceholder('用户名 / 手机号').fill(CREDS.username)
  await page.getByPlaceholder('请输入密码').fill(CREDS.password)
  await page.getByRole('button', { name: '进入 CodeVerse' }).click()

  await modal.waitFor({ state: 'hidden', timeout: 20000 })
  await page.waitForTimeout(1500)
  console.log('user logged in')
}

/** 管理后台：先截登录页，再登录后截业务页 */
async function loginAdmin(page) {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('http://localhost:5666/auth/login', {
    waitUntil: 'networkidle',
    timeout: 30000,
  })
  await page.waitForTimeout(1500)
  await page.screenshot({ path: path.join(OUT, 'admin-login.png'), fullPage: false })
  console.log('OK admin-login.png')

  const username = page.locator('input').filter({ hasNot: page.locator('[type="password"]') }).first()
  const password = page.locator('input[type="password"]').first()
  await username.fill(CREDS.username)
  await password.fill(CREDS.password)
  await page.locator('button[aria-label="login"]').click()

  await page.waitForURL(/\/(workspace|dashboard|analytics)/, { timeout: 25000 }).catch(async () => {
    await page.waitForTimeout(3000)
  })
  await page.waitForTimeout(2000)

  if (page.url().includes('/auth/login')) {
    throw new Error('admin 登录失败，仍在登录页')
  }
  console.log('admin logged in ->', page.url())
}

async function captureGroup(browser, name, loginFn, jobs, viewport) {
  const context = await browser.newContext()
  const page = await context.newPage()
  let ok = 0
  try {
    await loginFn(page)
    for (const job of jobs) {
      if (await shot(page, job, viewport)) ok++
    }
    if (name === 'admin') ok++ // admin-login.png captured inside loginAdmin
  } catch (e) {
    console.warn(`FAIL ${name}:`, String(e).slice(0, 150))
  } finally {
    await context.close()
  }
  return ok
}

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch({ headless: true })

let total = 0
let ok = 0

total += UNIAPP_JOBS.length
ok += await captureGroup(browser, 'uniapp', loginUniapp, UNIAPP_JOBS, { width: 390, height: 844 })

total += USER_JOBS.length
ok += await captureGroup(browser, 'user', loginUser, USER_JOBS, { width: 1280, height: 800 })

total += ADMIN_JOBS.length + 1 // +1 for admin-login.png
ok += await captureGroup(browser, 'admin', loginAdmin, ADMIN_JOBS, { width: 1280, height: 800 })

await browser.close()
console.log(`Done: ${ok}/${total}`)
