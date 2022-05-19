import { createApp } from 'vue'
import App from './App.vue'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style.js'

import router from './route/index'

createApp(App).use(Varlet).use(router).mount('#app')