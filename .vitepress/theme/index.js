import DefaultTheme from 'vitepress/theme'
import { injectSpeedInsights } from '@vercel/speed-insights'
import './custom.css'

if (typeof window !== 'undefined') {
  injectSpeedInsights();
}

export default DefaultTheme