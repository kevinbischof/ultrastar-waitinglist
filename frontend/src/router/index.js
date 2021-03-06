import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../auth/Login";
import Songs from "../components/Songs";
import Singer from "../components/Singer";
import Waitinglist from "../components/Waitinglist";
import Events from "../components/Events";
import EventForm from "../components/EventForm";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/songs',
      name: 'Songs',
      component: Songs
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer
    },
    {
      path: '/waitinglist',
      name: 'Waitinglist',
      component: Waitinglist
    },
    {
      path: '/events',
      name: 'Events',
      component: Events
    }
    ,
    {
      path: '/event/add',
      name: 'EventForm',
      component: EventForm
    }
]

const router = new VueRouter({
  routes
})

export default router
