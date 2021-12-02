import HelloWorld from "@/components/HelloWorld";
import Componente from "@/components/Componente";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: "/home",
        name: "Inicio",
        component: HelloWorld,
        meta: {
            roles: ['admin']
        }
    },
    {
        path: "/form",
        name: "Forms",
        component: Componente
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;
