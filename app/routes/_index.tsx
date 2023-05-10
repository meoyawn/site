import type { V2_MetaFunction } from "@remix-run/cloudflare"

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }]
}

export default function Index() {
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>
}
