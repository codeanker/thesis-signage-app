export const ssrTemplateWrapper = (content: string) => {
  return `<html><head><meta charset="utf-8"></head>${content}</html>`
}
