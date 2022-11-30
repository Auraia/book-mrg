import { createRouter, createWebHashHistory } from "vue-router";


const routes = [{
        path: '/auth',
        name: 'Auth',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Auth/index.vue'),
    },
    {
        path: '/',
        name: 'BasicLayout',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../layout/BasicLoyout/index.vue'),
        children: [{
            path: 'books',
            name: 'Books',
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/Books/index.vue'),

        }]
    },

];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;