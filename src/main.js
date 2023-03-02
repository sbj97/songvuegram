import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
let emitter = mitt();
let app = createApp(App)
app.config.globalProperties.emitter = emitter; // app.config.globalProperties 글로벌한 장바구니같은느낌

import store from './store';

app.use(store).mount('#app')


app.mount('#app')


