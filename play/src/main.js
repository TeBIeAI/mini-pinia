import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia1 } from '@pinia/core'
import { createPinia } from 'pinia'

const store = createPinia()
const store1 = createPinia1()
console.log('main createPinia', store)
const app = createApp(App)
app.use(store)
app.use(store1)

app.mount('#app')
