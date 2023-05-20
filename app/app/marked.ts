import hljs from "highlight.js"
import { marked } from "marked"
// @ts-ignore types not posted
import { gfmHeadingId } from "marked-gfm-heading-id"
import { markedHighlight } from "marked-highlight"

marked.use(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  gfmHeadingId() as marked.MarkedExtension,
  markedHighlight({
    langPrefix: "hljs language-",
    highlight: (code: string, lang: string) => {
      const language = hljs.getLanguage(lang) ? lang : "plaintext"
      return hljs.highlight(code, { language }).value
    },
  }) as marked.MarkedExtension,
)

const opts: marked.MarkedOptions = { mangle: false }

export const md2html = (s: string): string => marked(s, opts)
