# Astro Quick Start Course | Build an SSR Blog

## 7:35 - Install & Setup

```bash
dmacisso@LT-DMACISSO MINGW64 ~/projects/traversy-astro/astro-blog
$ npm create astro@latest

> npx
> create-astro


 astro   Launch sequence initiated.

   dir   Where should we create your new project?
         .

  tmpl   How would you like to start your new project?
         Use minimal (empty) template

  deps   Install dependencies?
         Yes

   git   Initialize a new git repository?
         Yes

 ██████  Project initializing...
         ■ Template copied
         ▶ Dependencies installing with npm...
         □ Git

```

## Add Tailwind

```bash
dmacisso@LT-DMACISSO MINGW64 ~/projects/traversy-astro/astro-blog (master)
$ npx astro add tailwind
◇  Resolved packages.

  Astro will run the following command:
  If you skip this step, you can always run it yourself later
╭──────────────────────────────────────────────────────╮
│  npm i @tailwindcss/vite@^4.2.2 tailwindcss@^4.2.2   │
╰──────────────────────────────────────────────────────╯
  To run this command without prompts, pass the --yes flag

◇  Continue?
Yes
◇  Dependencies installed.

  Astro will scaffold ./src/styles/global.css.

◇  Continue?
Yes

  Astro will make the following changes to your config file:
╭─astro.config.mjs───────────────────────────────╮
│  // @ts-check                                  │
│  import { defineConfig } from 'astro/config';  │
│                                                │
│  import tailwindcss from '@tailwindcss/vite';  │
│                                                │
│  // https://astro.build/config                 │
│  export default defineConfig({                 │
│    vite: {                                     │
│      plugins: [tailwindcss()]                  │
│    }                                           │
│  });                                           │
╰────────────────────────────────────────────────╯
◇  Continue?
Yes

   success  Added the following integration to your project:
  - tailwind

   action required  You must import your Tailwind stylesheet, e.g. in a shared layout:

╭─src/layouts/Layout.astro─────────╮
│  ---                             │
│  import '../styles/global.css'   │
│  ---                             │
╰──────────────────────────────────╯
```

- Now create a /src/layouts/BasicLayout.astro file
- And import "../styles/global.css" into the Front Matter
- Create a '<slot /'> placeholder for component content.

```html
# layout html <slot />
```

## 17:26 - Image Component

[Images Documentation](https://docs.astro.build/en/guides/images/)

- If you put it in src/, it needs to be imported into the page.
- If you put it in public, you just provide the path.

## 24:58 - Component Script

[The Component Script Docs](https://docs.astro.build/en/basics/astro-components/#component-structure)

## 29:06 - Layout & Slots

[Layout Docs](https://docs.astro.build/en/basics/layouts/)

## 36:45 - Component Props

[Component props](https://docs.astro.build/en/basics/astro-components/#component-props)

## 39:31 - Using Constants

## 42:52 - Navbar & Footer Components

## Typescript for props

```html
interface Props { title?: string;
<!-- title is optional -->
}
```

```bash
# this sets up our type
npx astro sync
```

## 46:51 - Custom 404 Page

[Custom 404 error page](https://docs.astro.build/en/basics/astro-pages/#custom-404-error-page)

## 51:18 - Collections & Markdown

[Content Collections](https://docs.astro.build/en/guides/content-collections/)

- Content collections are the best way to manage sets of content in any Astro project: blog posts, product descriptions, character profiles, recipes, or any structured content. Collections help to organize and query your documents, enable Intellisense and type checking in your editor, and provide automatic TypeScript type-safety for all of your content.

## Content Collections API Reference

[Content Collections AP!](https://docs.astro.build/en/reference/modules/astro-content/)

## 55:27 - Collection Schema

[Collection Schema](https://docs.astro.build/en/guides/content-collections/#defining-the-collection-schema)

[Define datatypes with ZOD](https://docs.astro.build/en/guides/content-collections/#defining-datatypes-with-zod)

[Accessing referenced data](https://docs.astro.build/en/guides/content-collections/#accessing-referenced-data)

```javascript
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

const allBlogArticles: CollectionEntry<'blog'>[] = await getCollection('blog');

// CollectionEntry<'blog'>[]
// A TypeScript type that says: "this is an array ([]) of blog collection entries." CollectionEntry is a generic type provided by Astro that gives you type safety and autocompletion for the specific shape of your blog entries — including their frontmatter fields as defined in your content schema.
```

NOTE: Astro6 the file is called "src/content.config.ts" and is configured as below

```javascript
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogCollection = defineCollection({
  loader: glob({ base: 'src/content/blog', pattern: '*.md' }),

  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    author: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    slug: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
```

## 01:07:02 - Format Date & Sort By Date

## 01:12:36 - Article Card Component

## 01:15:52 - Homepage Articles

## 01:25:08 - Most Recent Article

## 01:31:11 - Slug & getStaticPaths

[getStaticPath](https://docs.astro.build/en/reference/routing-reference/#getstaticpaths)

- Static Website Vs SSR website
- For Static website
  - need to generate path, because they are created at build time
  - Need to generate a function to achieve that, getStaticPath()

```javascript
/src/pages/articles/[...slug].astro
---
import MainLayout from '../../layouts/MainLayout.astro';

import { getCollection } from 'astro:content';

import type { CollectionEntry } from 'astro:content';

export async function getStaticPaths() {
  const allBlogArticles: CollectionEntry<'blog'>[] =
    await getCollection('blog');
  // To get the path we need to return a specific object containing a params object and props that we want to pass in.
  return allBlogArticles.map((entry) => ({
    params: {
      slug: entry.data.slug,
    },
    props: { entry },
  }));
}

const { entry } = Astro.props;
---

<MainLayout>
  <h1>{entry.data.title}</h1>
</MainLayout>
```

- For SSR
  - Need to change configuration, because it is static by default.