import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import HomePage from './pages/HomePage.vue'
import FavoritesPage from './pages/FavoritesPage.vue'

const app = createApp(App)

const routes = [
	{ path: '/', name: 'Home', component: HomePage },
	{ path: '/favorites', name: 'Favorites', component: FavoritesPage }
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

app.use(autoAnimatePlugin)
app.use(router)

app.mount('#app')
