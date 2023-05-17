export interface Org {
  readonly name: string
  readonly url: string
  readonly logoURL?: string
}

export const orgs = {
  agape: {
    name: "Agape Labs",
    url: "https://adel.lol",
  },
  wheely: {
    name: "Wheely",
    url: "https://wheely.com",
    logoURL:
      "https://cd.wheely.com/site/public/images/favicon/favicon-32x32.png",
  },
  infotech: {
    name: "Infotech Group",
    url: "https://infotech.group",
  },
  yandex: {
    name: "Yandex",
    url: "https://yandex.com",
  },
  flatstack: {
    name: "Flatstack",
    url: "https://www.flatstack.com",
  },
  ksu: {
    name: "Kazan State University",
    url: "https://eng.kpfu.ru",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/commons/d/d2/Kazan_federal_university_emblem.png",
  },
  telegram: {
    name: "Telegram",
    url: "https://telegram.org",
  },
  acm: {
    name: "ACM",
    url: "https://www.acm.org",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/commons/8/8e/Association_for_Computing_Machinery_%28ACM%29_logo.svg",
  },
} as const

export type OrgID = keyof typeof orgs
