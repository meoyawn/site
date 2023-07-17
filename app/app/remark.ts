import rehypeExternalLinks from "rehype-external-links"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"

const pipeline = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeExternalLinks, { target: "_blank", rel: "noreferrer" })
  .use(rehypeStringify)
  .freeze()

export const remarkHTML = (md: string): string =>
  pipeline.processSync(md).toString()
