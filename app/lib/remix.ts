export type HttpPath = `/${string}` | ""
export type HttpURL = `http${"s" | ""}://${string}${HttpPath}`

export const hostURL = (host: string, path?: HttpPath): HttpURL => {
  const proto =
    host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https"

  return `${proto}://${host}${path ?? ""}`
}

const absURL = (req: Request, path?: HttpPath): HttpURL =>
  hostURL(req.headers.get("host") || "127.0.0.1:3000", path)

export const relativeFetch = (
  req: Request,
  path?: HttpPath,
  init?: RequestInit,
): Promise<Response> => fetch(absURL(req, path), init)
