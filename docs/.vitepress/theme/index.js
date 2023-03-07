import DefaultTheme from 'vitepress/theme'
import SandboxEmbedder from '../../components/SandboxEmbedder.vue'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('CodeExample', SandboxEmbedder)
  },
}
