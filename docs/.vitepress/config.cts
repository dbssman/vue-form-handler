import { defineConfig } from "vitepress"

export default defineConfig({
  title: 'VueFormHandler',
  description: 'Discover the easy way of handling your vue forms',
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/favicon-32x32.png', type: 'image/png' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: 'Dennis R. Bosmans' }],
    ['meta', { property: 'og:title', content: 'VueFormHandler' }],
    ['meta', { property: 'og:image', content: 'https://vue-form-handler.com/favicon.png' }],
    ['meta', { property: 'og:description', content: 'The only handler you\'ll need to easily work with forms in vue' }],
  ],
  themeConfig: {
    logo: '/favicon.svg',
    editLink: {
      pattern: 'https://github.com/dbssman/vue-form-handler/edit/master/docs/:path',
      text: 'Edit this page on GitHub',
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get started', link: '/get-started' },
    ],
    sidebar: [
      {
        text: 'Documentation', items: [
          { text: 'Get started', link: '/get-started' },
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
          {
            text: 'useFormHandler', link: '/api/use-form-handler/index', items: [
              { text: 'clearError', link: '/api/use-form-handler/clear-error' },
              { text: 'clearField', link: '/api/use-form-handler/clear-field' },
              { text: 'formState', link: '/api/use-form-handler/form-state' },
              { text: 'handleSubmit', link: '/api/use-form-handler/handle-submit' },
              { text: 'modifiedValues', link: '/api/use-form-handler/modified-values' },
              { text: 'register', link: '/api/use-form-handler/register' },
              { text: 'resetField', link: '/api/use-form-handler/reset-field' },
              { text: 'resetForm', link: '/api/use-form-handler/reset-form' },
              { text: 'setError', link: '/api/use-form-handler/set-error' },
              { text: 'setValue', link: '/api/use-form-handler/set-value' },
              { text: 'triggerValidation', link: '/api/use-form-handler/trigger-validation' },
              { text: 'unregister', link: '/api/use-form-handler/unregister' },
              { text: 'values', link: '/api/use-form-handler/values' },
            ]
          },
          { text: `FormHandler`, link: '/api/form-handler' }
        ]
      }
    ]
  }
})