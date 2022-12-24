import { defineConfig } from "vitepress"

export default defineConfig({
  title: 'Vue form handler',
  description: 'Discover the easy way of handling your vue forms',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get started', link: '/getting-started' },
    ],
    sidebar: [
      {
        text: 'Documentation', items: [
          { text: 'Get started', link: '/getting-started' },
          { text: 'Tutorial', link: '/tutorial' },
          {
            text: 'Guides', items: [
              { text: 'Validation', link: '/guides/validation' },
              { text: 'Typescript', link: '/guides/typescript' },
              { text: 'Form submission', link: '/guides/form-submission' },
              { text: 'Custom components', link: '/guides/custom-components' },
              { text: 'Native support', link: '/guides/native-support' },
            ]
          },
          {
            text: 'Examples', items: [
              { text: 'Basic', link: '/examples/basic' },
              { text: 'Async validations', link: '/examples/async-validations' },
              { text: 'Typescript', link: '/examples/typescript' },
              { text: 'Interceptor', link: '/examples/interceptor' },
              { text: 'Dependent fields', link: '/examples/dependent-fields' },
              { text: 'More examples', link: '/examples/more-examples' }
            ]
          },
        ]
      },
      {
        text: 'API Reference', items: [
          { text: 'useFormHandler()', link: '/api/use-form-handler' },
          { text: `FormHandler`, link: '/api/form-handler' }
        ]
      }
    ]
  }
})