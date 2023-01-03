import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from '@pinia/core'
// import { createPinia } from 'pinia'

const store = createPinia()
console.log('main createPinia', store)
const app = createApp(App)
app.use(store)

app.mount('#app')
