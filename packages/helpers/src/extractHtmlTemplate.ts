export const extractHtmlTemplate = (rawTemplate: string) => {
  const template = rawTemplate.match(/<main>(.*?)<\/main>/g)?.[0]
  const style = rawTemplate.match(/<style scoped>(.*?)<\/style>/g)?.[0]

  if (template == undefined) return ''

  return template + style
}
