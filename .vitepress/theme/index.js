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

    // SPA pageviews are handled automatically by GA4 enhanced measurement
    // ("Page changes based on browser history events"). No manual gtag('config')
    // call is needed here — it would double-count and uses the deprecated
    // page_path parameter instead of page_location.
    //
    // If GA4 enhanced measurement is ever disabled, replace with:
    //   router.onAfterRouteChanged = (to) => {
    //     if (typeof window.gtag === 'function') {
    //       window.gtag('event', 'page_view', {
    //         page_location: window.location.href,
    //         page_title: document.title,
    //         page_referrer: document.referrer
    //       })
    //     }
    //   }
  }
}
