export interface Product {
  name: string
  url: string
  archiveImgURL?: string
}

export const products = {
  vibes: {
    name: "VK Vibes",
    url: "https://web.archive.org/web/20140829110945/https://play.google.com/store/apps/details?id=com.stiggpwnz.vibes",
    archiveImgURL:
      "https://web.archive.org/web/20221010221523im_/https://lh3.ggpht.com/iykRcs70ukktRV3JaA7akqNhrWB3o3DcFYBz3BsTie55BWYUn7yLf_QjQGEqw54JrRxX=w300",
  },
  schedule: {
    name: "KSU Schedule",
    url: "https://play.google.com/store/apps/details?id=com.stiggpwnz.schedule",
  },
  meloman: {
    name: "Meloman",
    url: "https://web.archive.org/web/20141003050637/https://play.google.com/store/apps/details?id=com.flatsoft.meloman",
    archiveImgURL:
      "https://web.archive.org/web/20141003050637im_/https://lh6.ggpht.com/LEHezD8Eqfpr46bBfGeDqOAd2j6lNLa-4nUzBc4fMZULoo5xisrWkrF4GVs318YFFFs=w300",
  },
  arrowbox: {
    name: "Arrowbox",
    url: "https://arrowbox.co",
  },
  listenbox: {
    name: "Listenbox",
    url: "https://listenbox.app",
  },
  roadtrippers: {
    name: "Roadtrippers",
    url: "https://play.google.com/store/apps/details?id=com.roadtrippers",
  },
  "wheely-passenger": {
    name: "Wheely",
    url: "https://play.google.com/store/apps/details?id=com.wheely.wheely",
  },
  "wheely-driver": {
    name: "Wheely for Chauffeurs",
    url: "https://play.google.com/store/apps/details?id=com.wheely.groundio",
  },
  "breaking-news": {
    name: "BreakingNews.ie",
    url: "https://play.google.com/store/apps/details?id=ie.breakingnews.mobile",
  },
  "irish-examiner": {
    name: "Irish Examiner",
    url: "https://play.google.com/store/apps/details?id=ie.irishexaminer.mobile",
  },
  "acl-grc": {
    name: "Diligent HighBond",
    url: "https://play.google.com/store/apps/details?id=com.aclgrc.android",
  },
  yandex: {
    name: "Yandex Start",
    url: "https://play.google.com/store/apps/details?id=ru.yandex.searchplugin",
  },
  oek: {
    name: "Районные Электросети",
    url: "https://play.google.com/store/apps/details?id=com.infotechcorp.moscowlamps",
  },
  gorenie: {
    name: "Служба Горения",
    url: "https://play.google.com/store/apps/details?id=group.infotech.gorenie",
  },
  "android-drawable-dsl": {
    name: "Android Drawable Kotlin DSL",
    url: "https://github.com/infotech-group/android-drawable-dsl",
  },
  responsible: {
    name: "Responsible",
    url: "https://responsibleapi.com",
  },
  "organize-md": {
    name: "organize-md",
    url: "https://github.com/meoyawn/organize-md",
  },
  muscovy: {
    name: "Muscovy",
    url: "https://moscow-cancer.vercel.app",
  },
} as const

export type ProductID = keyof typeof products
