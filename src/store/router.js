// router.js

import Vue from 'vue';
import VueRouter from 'vue-router';

// COMPONENTS
import Home from '../components/Home';
import Contact from '../components/Contact'

Vue.use(VueRouter);

const routes = [{
	path: '/',
	name: 'home',
  component: Home
  }, {
    path: '/portfolio',
    name: 'portfolio'
    // Portfolio
  }, {
    path: '/skills',
    name: 'skills'
    // SKills & Experience
  }, {
    path: '/contact',
    name: 'contact',
    component: Contact
  }];

export default new VueRouter({
	routes
});
