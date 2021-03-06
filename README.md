<img src="https://cailborg.github.io/stylever.png" alt="logo"/>

## Stylever

> A starter kit for building sharable React UI libraries

### Commands

`yarn build` Build bundled packages

`yarn test:watch` Run tests in development

`yarn test` Run tests on CI platforms

`yarn storybook` Run storybook locally

`yarn storybook:export` Build a static instance of storybook to deploy somewhere

`yarn figma:tokens` Grab tokens from our [Figma Design System](https://www.figma.com/file/ait851TSV6ycrxpUjERutH/Stylever?node-id=8%3A3)

`yarn figma:icons` Grab icons from our [Figma Design System](https://www.figma.com/file/ait851TSV6ycrxpUjERutH/Stylever?node-id=37%3A44) and use them in our `<icon>` component

### How to use

### Notes

- New components need to be added to `index.ts` manually as a safeguard from accidentally bundling unfinished code
- Theme file follows the [Theme UI Spec](https://theme-ui.com/theme-spec/#theme-scales)
