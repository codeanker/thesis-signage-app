export const ssrReloadHandler = (duration: number) => {
  return `<script>setTimeout(() => location.reload(), ${duration})</script>`
}
