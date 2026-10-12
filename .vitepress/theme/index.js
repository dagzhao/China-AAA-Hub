import DefaultTheme from 'vitepress/theme'
import './custom.css'
import MythQuiz from './components/MythQuiz.vue'
import GlossaryTool from './components/GlossaryTool.vue'

// 仅在浏览器环境下执行
if (typeof window !== 'undefined') {
  // 导入并执行 Analytics
  import('@vercel/analytics').then(({ inject }) => inject());

  // 导入并执行 Speed Insights
  import('@vercel/speed-insights').then(({ injectSpeedInsights }) => injectSpeedInsights());
}

export default {
  ...DefaultTheme, // 使用扩展语法继承默认主题
  enhanceApp({ app, router, siteData }) {
    // 全局注册交互式小工具，供三语页面直接以 <MythQuiz /> / <GlossaryTool /> 引用
    app.component('MythQuiz', MythQuiz)
    app.component('GlossaryTool', GlossaryTool)
  }
}
