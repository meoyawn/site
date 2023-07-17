import hljs from "highlight.js"
import { marked } from "marked"
import { gfmHeadingId } from "marked-gfm-heading-id"
import { markedHighlight } from "marked-highlight"

marked.use(
  gfmHeadingId(),
  markedHighlight({
    langPrefix: "hljs language-",
    highlight: (code: string, lang: string) => {
      const language = hljs.getLanguage(lang) ? lang : "plaintext"
      return hljs.highlight(code, { language }).value
    },
  }),
)

const opts: marked.MarkedOptions = { mangle: false }

export const markedHTML = (s: string): string => marked(s, opts)
