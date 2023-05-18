import { orgs } from "./orgs"
import { products } from "./products"
import { test } from "bun:test"
import { writeFile } from "fs/promises"
import { parse } from "node-html-parser"
import { join as pathJoin } from "path"

const ogImage = async (url: string): Promise<string> => {
  const res = await fetch(url, { redirect: "follow" })
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`)
  }
  if (!res.headers.get("content-type")?.startsWith("text/html")) {
    throw new Error(`Not HTML at ${url}`)
  }

  const document = parse(await res.text())

  const imgURL =
    document
      .querySelector("meta[property='og:image'], meta[name='og:image']")
      ?.getAttribute("content") ??
    document.querySelector("img")?.getAttribute("src")
  if (!imgURL) throw new Error(`No og:image or img at ${url}`)

  return imgURL.startsWith("http")
    ? imgURL
    : new URL(imgURL, new URL(url).origin).toString()
}

test("write images", async () => {
  const pairs = await Promise.all(
    [
      ...Object.values(orgs).map(x => x.url),
      ...Object.values(products).map(x => x.url),
      "https://github.com/meoyawn",
    ].map(url => ogImage(url).then(og => [url, og])),
  )
  const path = pathJoin(import.meta.dir, "ogimages.json")
  await writeFile(path, JSON.stringify(Object.fromEntries(pairs), null, 2))
})
