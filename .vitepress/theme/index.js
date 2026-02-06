import DefaultTheme from 'vitepress/theme'
import './custom.css'

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
    // 以后如果你有自定义组件或全局插件，可以在这里添加
  }
}