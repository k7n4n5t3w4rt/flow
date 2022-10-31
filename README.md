# GoodThing

Preact static website generator boilerplate.

  - No WebPack
  - No compiling during development
  - Global, Redux-like state store with `useReducer` and `Context`
  - Cypress

## Getting Started

[1] Clone the repo

```
git clone git@github.com:k7n4n5t3w4rt/goodthing.git mysite
```

[2] Remove `/.git`

```
cd mysite && rm -rf .git
```

[3] Install NodeJS modules

```
npm i
```

[4] Update the ES modules in the `/web_modules` directory

```
npm run esinstall
```

[5] Preview your site dynamically at <http://localhost:4000> during development

```
npm start
```

NOTE: Ctrl+C will stop the NodeJS server.

[6] Test


Start the server:

```
npm start
````

Then:

```
npm run test
```

NOTE: Install Cypress with:

```
npx cypress install
```

[7] Code (or don't if you're just trying it out)

```
...
```

[8] Generate your static site in the `/public` folder for GitHub pages, S3, etc.

With the server running:

```
npm run generate
```

[9] Test it locally on port :3000 with Browsersync (I hardly ever do this)

```
npm run browsersync
```

[10] `git init` etc. and push your code up to GitHub or somewhere with great, free hosting for static sites.

For [GitHub Pages](https://pages.github.com/), duplicate the `public` directory as `docs`:

```
npm run github-pages
```

[11] Clean up your static files

```
npm run generate:clear
```

## `htm` - "JSX-like syntax in plain JavaScript - no transpiler necessary"

```
import htm from '../web_modules/htm.js'
```

## To Do

  2. The "Testy" test runner needs an "only" option
