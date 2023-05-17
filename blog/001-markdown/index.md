---
title: Static Markdown for websites
description: Learn how to optimize content organization and enhance load times on your Next.js or Remix websites with the `organize-md` script
date: 2023-05-15
image: unsplash.jpg
---

While working with static markdown for websites, there are several difficulties.

1. **WYSIWYG images.** You either work with something like `![alt](/images/path/to/image.png)` that does not render in
   your
   editor and makes it hard to add and delete images. Or with `![alt](image.png)` which compiles
   into `<img src="image.png" alt="alt" />` and forces you to keep everything flat in `public/` or something.
2. **Image caching.** `image.png` should be cached on CDN. Changing its contents should bust the cache.
3. **Image speed.** Ideally `image.png` should be compiled to `webp` as well, leveraging modern browsers.

To fix these I made a small script.

## Meet `organize-md`

You can add it to your project with:

```sh
yarn add organize-md -D
```

Next, create a `config.yml` for it:

```yml
contentDir: blog/
mdOutDir: public/blog/
imgOutDir: public/images/blog/
imgURLPrefix: /images/blog/
```

```sh
yarn organize-md config.yml --watch
```

With this setup, each Markdown document should be placed in its own folder. Following this organization,

```md
some text ![alt](image.png)
```

will be transformed into:

```md
some text ![alt](/images/blog/slug/image-6g6f6f.png)
```

This new format allows your images to be cacheable. In the future, the package will also support compilation to `webp`.

### A Note on Image Caching

For your `imgURLPrefix`, be sure to add a `Cache-Control` header. For instance, if you're using Cloudflare Pages, add
the following to your `public/_headers` file:

```txt
/images/*
  Cache-Control: public, max-age=31536000, immutable
```

For Next.js, add this to your `next.config.js` `headers()` array:

```js
;[
  {
    source: "/images/*",
    headers: [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable",
      },
    ],
  },
]
```

You'll find that most frameworks support this functionality.

## Wrapping Up

By streamlining Markdown content management and making your site faster, `organize-md` allows you to focus on what
truly matters — content itself.
