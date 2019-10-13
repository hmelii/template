import './js/common'
import './assets/css/app.css'
import './assets/scss/app.scss'

import Vue from 'vue';
import store from './store';

//window.Vue = require('vue') // Внимание Тут используется алиас из настроек webpack.base Там указан путь к vue 

Vue.component('example-component', require('./components/Example.vue').default);

const app = new Vue({
    store,
    el: '#app'
})