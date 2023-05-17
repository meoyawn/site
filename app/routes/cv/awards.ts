import { type OrgID } from "./orgs"
import { type ProductID } from "./products"

export interface AwardProps {
  readonly org: OrgID
  readonly what: string
  readonly when: string
  readonly products: ReadonlyArray<ProductID>
  readonly url: string
}

export const awards: ReadonlyArray<AwardProps> = [
  {
    org: "telegram",
    url: "https://vk.com/wall1_1108590",
    what: "Winner of Telegram Android Challenge 2016",
    when: "Jul 2016",
    products: [],
  },
  {
    org: "acm",
    url: "https://neerc.ifmo.ru/archive/2011/southern/standings.html",
    what: "55th in 2011 ACM ICPC Quarterfinals",
    when: "Oct 2011",
    products: [],
  },
]
