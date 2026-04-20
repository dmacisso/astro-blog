# Astro Quick Start Course | Build an SSR Blog

## Install Astro

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
# layout html
  <slot />
```

## Images

[Images Documentation](https://docs.astro.build/en/guides/images/)

- If you put it in src/, it needs to be imported into the page.
- If you put it in public, you just provide the path.
  
## The Component Script

[The Component Script Docs](https://docs.astro.build/en/basics/astro-components/#component-structure)

## Layouts

[Layout Docs](https://docs.astro.build/en/basics/layouts/)

## Component Props

[Component props](https://docs.astro.build/en/basics/astro-components/#component-props)

## Using Site-Wide Constants
