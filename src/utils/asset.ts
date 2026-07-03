/** 拼接 public 资源路径，兼容 GitHub Pages 子路径 base */
export function asset(path: string): string {
  const normalized = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${normalized}`
}
