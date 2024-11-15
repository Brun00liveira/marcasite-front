import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/paleta.css';
import axios from 'axios';
import VueApexCharts from "vue3-apexcharts";

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$axios = axios;
app.use(createPinia())
app.use(router)
app.use(VueApexCharts);

app.mount('#app')
