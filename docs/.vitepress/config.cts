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
    socialLinks: [
      { icon: 'github', link: 'https://github.com/dbssman/vue-form-handler' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Dennis R. Bosmans',
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get started', link: '/get-started/introduction' },
    ],
    sidebar: [
      {
        text: 'Get started', items: [
          { text: 'Introduction', link: '/get-started/introduction' },
          { text: 'Quick Start', link: '/get-started/quick-start' },
        ]
      },
      {
        text: 'Guides', collapsible: true, items: [
          { text: 'Custom components', link: '/guides/custom-components' },
          { text: 'Material libraries', link: '/guides/material-libraries' },
          { text: 'Native support', link: '/guides/native-support' },
          { text: 'Typescript', link: '/guides/typescript' },
          { text: 'Validation', link: '/guides/validation' },
        ]
      },
      {
        text: 'Examples', collapsible: true, items: [
          { text: 'Async submission', link: '/examples/async-submission' },
          { text: 'Async validations', link: '/examples/async-validations' },
          { text: 'Basic', link: '/examples/basic' },
          { text: 'Dependent fields', link: '/examples/dependent-fields' },
          { text: 'Interceptor', link: '/examples/interceptor' },
          { text: 'More examples', link: '/examples/more-examples' },
          { text: 'Typescript', link: '/examples/typescript' },
        ]
      },
      {
        text: 'API Reference', collapsible: true, items: [
          {
            text: 'useFormHandler', link: '/api/use-form-handler/',
            items: [
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
    ],
  }
})