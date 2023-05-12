---
title: Organizing Markdown for Next.js and Remix Websites with `organize-md`
description: Notes on organizing Markdown content
date: 2023-05-11
---

As a developer, I'm always looking for ways to streamline my workflow. Whether it's building a personal project or
working on a large-scale application, efficiency is key. For my personal blog and some smaller projects, I use Markdown
heavily. It's a simple and efficient way to write content, especially when combined with static site generators like
Next.js or Remix.

However, managing and organizing Markdown files for these platforms can sometimes be a bit cumbersome, especially when
we want to optimize assets for better loading performance. That's why I created a script that takes care of this entire
process for me.

## Introducing `organize-md`

I recently developed a script called `organize-md`. It's a powerful tool that processes my Markdown files and images,
and outputs the modified Markdown files and images to specified output directories. The script also generates
a `meta.json` file containing metadata about the processed Markdown files.

The goal of this script is to prepare my Markdown files and associated assets (like images) for deployment, making it
easier to manage and maintain my content.

## How `organize-md` works

The script reads the contents of a specified directory and processes all Markdown files and images. It also assigns a
unique hash to each image based on its content, which is added to the image filename. This feature is especially useful
for cache-busting when the image content changes.

The processed files are then outputted to specified directories, and a `meta.json` file is generated containing metadata
about the processed Markdown files.

### Example Usage

For instance, consider this initial folder structure:

```
content
├── android
│ ├── googleplay.svg
│ ├── index.md
│ └── share.jpg
├── ios
│ ├── appstore.svg
│ ├── gallery.jpeg
│ ├── index.md
│ ├── settings.jpeg
│ └── share.jpg
├── publishing
│ ├── index.md
│ ├── itunes.png
│ ├── rsscopy.png
│ └── spotify.png
└── tutorial
└── index.md
```

By providing a JSON configuration file like this:

```json
{
  "contentDir": "content/",
  "mdOutDir": "public/guides/",
  "imgOutDir": "public/images/guides/",
  "imgURLPrefix": "/images/guides/"
}
```

And running `organize-md` with the configuration file:

```sh
yarn add organize-md
yarn organize-md config.json
```

We get the following output structure:

```
public/guides
├── android.md
├── ios.md
├── meta.json
├── publishing.md
└── tutorial.md

public/images/guides
├── android
│ ├── googleplay-b761f3.svg
│ └── share-58f774.jpg
├── ios
│ ├── appstore-b60244.svg
│ ├── gallery-aca28c.jpeg
│ ├── settings-f10556.jpeg
│ └── share-60e923.jpg
└── publishing
├── itunes-f1bf0c.png
├── rsscopy-0f6e3f.png
└── spotify-ba1398.png
```

## Framework Configuration for Optimized Image Loading

With the image files now having unique hashes, we can add immutable caching rules for these files in our website
configuration. Immutable caching allows these files to be stored in the browser's cache indefinitely, improving load
times and reducing bandwidth usage. Here's how to do it in Next.js and Remix:

### Next.js

In `next.config.js` `headers()` array, add the following:

```js
;[
  {
    source: "/images/:path*",
    headers: [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable",
      },
    ],
  },
]
```

Where `"/images/:path*"` is the `imgURLPrefix` value from the config file. More about this feature can be found in
the [Next.js headers documentation](https://nextjs.org/docs/pages/api-reference/next-config-js/headers).

### Remix

If you're deploying to Cloudflare Pages, in the `public/_headers` file, add this:

```
/images/*
    Cache-Control: public, max-age=31536000, immutable
```

Where `"/images/*"` is the `imgURLPrefix` value from the config file. More about this feature can be found in
the [Cloudflare Pages headers documentation](https://developers.cloudflare.com/pages/platform/headers/).

## Wrapping up

By utilizing `organize-md`, we can streamline the way we handle Markdown files and images in our Next.js and Remix
websites. This tool not only organizes our files, but it also helps us optimize our site's loading speed by providing a
way to implement efficient caching strategies.

Whether you're running a personal blog or managing a larger project, give `organize-md` a try and see how it can help to
improve your workflow.
