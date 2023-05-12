export type HttpPath = `/${string}` | ""
export type HttpURL = `http${"s" | ""}://${string}${HttpPath}`

const makeURL = (req: Request, path?: HttpPath): HttpURL => {
  const host = req.headers.get("host") || "127.0.0.1:3000"

  const proto =
    host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https"

  return `${proto}://${host}${path ?? ""}`
}

export const relativeFetch = (
  req: Request,
  path?: HttpPath,
  init?: RequestInit,
): Promise<Response> => fetch(makeURL(req, path), init)
