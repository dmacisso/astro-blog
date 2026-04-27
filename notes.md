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

## 01:37:12 - SSR Config & Single Article

- For SSR
  - Need to change configuration, because it is static by default.
  - Paths are created automatically because it is server rendered.
  - astro.config.mjs

```javascript
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'server',
});
```

Now it is server rendered.

## 01:47:30 - Tags Component

## 01:53:18 - Tag Page

## 01:59:34 - Footer Tags

## **Code Explanation**

This code extracts and flattens all tags from blog articles:

```javascript
const tags: string[] = allBlogArticles.flatMap(
  (article: any) => article.data.tags,
);
```

**Breaking it down:**

- **`allBlogArticles.flatMap()`**: Iterates over each article and transforms it, then flattens the result into a single array
- **`(article: any) => article.data.tags`**: Arrow function that extracts the `tags` array from each article's front matter data
- **`flatMap()` vs `map()`**: Key difference is that `flatMap()` flattens nested arrays. If each article has multiple tags like `['tech', 'gadgets']`, `flatMap()` combines them into one flat array instead of creating an array of arrays

**Example:**

```javascript
// If you have:
allBlogArticles = [
  { data: { tags: ['tech', 'gadgets'] } },
  { data: { tags: ['drone', 'gadgets'] } },
];

// Result:
tags = ['tech', 'gadgets', 'drone', 'gadgets'];
```

The `: string[]` type annotation tells TypeScript that `tags` is an array of strings.

This flattened array is then passed to `new Set()` on line 13 to remove duplicates and create `uniqueTags`.

## **This Code Explanation**

This line removes duplicate tags and converts the result back to an array:

```javascript
const uniqueTags: string[] = [...new Set(tags)];
```

**Breaking it down:**

- **`new Set(tags)`**: Creates a Set object from the `tags` array. Sets automatically remove duplicates because they only store unique values
- **`[...]`**: Spread operator that converts the Set back into a regular array (Sets aren't arrays, so we need to spread them to array syntax)
- **`const uniqueTags: string[]`**: TypeScript type annotation declaring this variable is an array of strings

**Example:**

```javascript
// Input:
tags = ['tech', 'gadgets', 'drone', 'gadgets', 'tech']

// Step 1 - new Set(tags):
Set { 'tech', 'gadgets', 'drone' }  // duplicates removed

// Step 2 - [...Set]:
uniqueTags = ['tech', 'gadgets', 'drone']  // converted back to array
```

**Why this pattern?** Sets are perfect for deduplication but need to be converted back to arrays for use in templates. The three-step process (`new Set()` → remove dupes → `[...]` → convert back to array) is a common JavaScript pattern for getting unique values.

## 02:04:29 - Search Page

## **Purpose of `query!`**

The `!` is TypeScript's **non-null assertion operator**. It tells the compiler: "I know this value might be `null`, but I'm asserting it's definitely not `null` right now."

**Context:**

Line 7 declares `query` with a type that includes `null`:

```typescript
const query: string | null = Astro.url.searchParams.get('query');
```

But on line 17 (and lines 21, 25), the code uses `query!`:

```typescript
.includes(query!.toLocaleLowerCase());
```

**Why?** TypeScript is being strict. Since `query` could be `null`, you can't call `.toLocaleLowerCase()` on it directly — that would cause an error. The `!` says "trust me, it's not null" and bypasses that safety check.

**The issue:** This isn't actually safe! If someone visits the search page without a `?query=` parameter, `query` will be `null`, and the code will crash. A safer approach would be:

```typescript
const searchResult = query ? allBlogArticles.filter((article) => {
  // search logic only runs if query exists
}) : [];
```

Or check if `query` is null before using it.
