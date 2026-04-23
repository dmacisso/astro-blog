# Tutorial from Traversy Media

## Astro Quick Start Course | Build an SSR Blog

[Link to Tutorial](https://www.youtube.com/watch?v=XoIHKO6AkoM&t=114s)
[Link to Source Code](https://github.com/bradtraversy/astro-blog/tree/main)

npm create astro@latest

chose a directory to create the project

chose empty install

install dependencies

initialize git

npx astro add tailwind

**Note:** action required You must import your Tailwind stylesheet, e.g. in a shared layout:

        ╭ src/layouts/Layout.astro ─────────╮
        │ ---                               │
        │ import './src/styles/global.css'  │
        │ ---                               │
        ╰───────────────────────────────────╯

### TimeStamp 17:26 Images Component

[From the official doc...](https://docs.astro.build/en/guides/images/#where-to-store-images)
Where to store images
src/ vs public/
We recommend that local images are kept in src/ when possible so that Astro can transform, optimize and bundle them. We can use the image component to optimize the images

Issue is: you have to import the the component file and use that as the source.

Files in the /public directory are always served or copied into the build folder as-is, with no processing. Just put in the path.

Your local images stored in src/ can be used by all files in your project: .astro, .md, .mdx, .mdoc, and other UI frameworks. Images can be stored in any folder, including alongside your content.

Store your images in the public/ folder if you want to avoid any processing or to have a direct public link to them.

In this project.
Website images like "logo" and "about" will go into /src
The article images will go in public, so we can use the path.

## Any Importing or Server side JS in astro documents needs to be wrapped in a code fence, a component script, which is three hyphens Ex

        ---
        import './src/styles/global.css';
        import { Image } from 'astro:assets';
        import logo from '../images/logo.png';
        ---

Imported images are Image components and are rendered thusly

        <Image
            src={logo}
            class="h-14"
            alt="TechPeople Logo"
            height={55}
            width={55}
          />

Whereas the path to static images in the public folder are preceded with a "/" Example:

        <img
          src="/images/image1.png"
          alt="Article Image"
          class="w-full h-auto rounded-2xl"
        />

### Timestamp 24:58 The Component Script

[From the official doc...](https://docs.astro.build/en/basics/astro-components/#the-component-script)

#### The Component Script

Astro uses a code fence (---) to identify the component script in your Astro component. If you’ve ever written Markdown before, you may already be familiar with a similar concept called frontmatter. Astro’s idea of a component script was directly inspired by this concept.

You can use the component script to write any JavaScript code that you need to render your template. This can include:

- importing other Astro components
- importing other framework components, like React
- importing data, like a JSON file
- fetching content from an API or database
- creating variables that you will reference in your template

**Note:** Whatever you write in the code fence is on the "Server", It is not going to spill into your client. So you can safely fetch data from a database using some kind of ORM. Example Astro Collections.

Demo with a test page at timestamp 26:20

### Timestamp 29.06 Layout and Slots

[From the official doc...](https://docs.astro.build/en/basics/layouts/)

Layouts are Astro components used to provide a reusable UI structure, such as a page template.

We conventionally use the term “layout” for Astro components that provide common UI elements shared across pages such as headers, navigation bars, and footers. A typical Astro layout component provides Astro, Markdown or MDX pages with:

a page shell (<html\>, <head\> and <body\> tags)
a <slot /\> to specify where individual page content should be "injected".

### Timestamp 36:45 - Component Props

[From the official doc...](https://docs.astro.build/en/basics/astro-components/#component-props)

Basically you pass in props like an html attribute,
You can destructure from Astro.props object

    1. Here we pass in a title prop
       <MainLayout title="Articles, Stories, & Tutorials for Tech People">

    2. Here we destructure and render the prop

    const { title } = Astro.props;
    <title>{title}</title>

1. Here we set the default title, when you don't pass props.
   const { title = 'Articles, Stories, & Tutorials for Tech People' } = Astro.props;

## Timestamp 39:21 Using Constants

create a /src/constants.ts file
use the constants in for "site title" and 'site description" in the MaineLayout.astro file

## Timestamp 42:52 - Navbar & Footer Components

1. For ui component, create a folder /src/components

Clean up the MainLayout file:

1. remove contents of the navbar tag and paste it in /src/components/Navbar.astro
2. Remove the Image and logo import from the layout and place them into the Navbar component, wrapping them in a 'code fence'
3. Import <Navbar \> from ../components/Navbar.astro
4. Do the same with the Footer.

Setup typescript for props for our components.

        interface Props {
                title?: string;
        }

In order for this to work we need to setup the astro types, run the following command.

        $ npx astro sync
        15:47:00 [vite] Re-optimizing dependencies because vite config has changed
        15:47:01 [content] Syncing content
        15:47:01 [content] Synced content
        15:47:01 [types] Generated 752ms

### Timestamp 46:51 - Custom 404 Page

1. Create a /src/pages/404.astro file
2. import the MainLayout and Image component.
3. import the error image from ../images/error-404.jpg
   [Finished Page](/src/pages/404.astro)

### Timestamp 51:18 - Collections & Markdown

Collections are a way to manage content within astro.
You can use different types of file, markdown, json, yaml
We will use markdown which contains 'front matter' which is a way to metadata or fields to your content, placed in a source folder called 'content'

1. Create a /src/content/blog. This contains a bunch of files generated using chatGPT.
2. Create a config file to define the collections.

    1. In the content folder, create a file called config.ts with the following content:

                 import { defineCollection } from 'astro:content';
                 const blogCollection = defineCollection({}); //* pass in an empty object

                 export const collections = {
                 blog: blogCollection,
                 };

### Timestamp 55:27 - Collection Schema

Schema: a blueprint of the collection data, enforces the front matter (fields).
Zod: is a validation library, bring it in with z and use as z.data etc...

        import { defineCollection, z } from 'astro:content';

        //* define the schema object
        const blogCollection = defineCollection({
                type: 'content',
                schema: z.object({
                title: z.string(),
                pubDate: z.date(),
                author: z.string(),
                image: z.string(),
                tags: z.array(z.string()),
                }),
        });

        export const collections = {
                blog: blogCollection,
        };

### Timestamp 58:17 - Querying Collections

We have a schema and we have markdown files.
We can query our collection and bring it into our blog
Can be done with a couple functions that are available.

Accessing referenced data
[Link to documentation](https://docs.astro.build/en/guides/content-collections/#accessing-referenced-data)

Any references defined in your schema must be queried separately after first querying your collection entry. Since the reference() function transforms a reference to an object with collection and id as keys, you can use the getEntry() function to return a single referenced item, or getEntries() to retrieve multiple referenced entries from the returned data object.

[Link to index.astor](/src/pages/articles/index.astro)
