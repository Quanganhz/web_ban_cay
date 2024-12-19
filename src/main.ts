import './assets/base.css'; // Load base styles
import 'animate.css'; // Animation library

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue'; // Main component
import router from './router'; // Vue Router setup

const app = createApp(App); // Create Vue app

// Use Pinia for state management
app.use(createPinia()); 

// Use Vue Router for routing
app.use(router);

// Mount the app to the DOM
app.mount('#app');
