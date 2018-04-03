// console.log('hello');
import Vue from 'vue'
import App from './app.vue'
// import './style.css'
// document.getElementById('app').innerHTML = 'hello webpack';
new Vue({
    el: '#app',
    render: h => h(App)
})
