import Componente from "@/components/Componente";
import PageNotFound from "@/components/PageNotFound";
import LogIn from "@/components/LogIn";
import Registro from "@/components/Registro";
import Transaccion from "@/components/Transaccion";
import Home from "@/components/Home";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: "/",
        name: "logIn",
        component: LogIn
    },
    {
        path: "/registro",
        name: "Registro",
        component: Registro
    },
    {
        path: "/transaccion",
        name: "Transaccion",
        component: Transaccion
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
        meta: {
            roles: ['admin']
        }
    },
    {
        path: "/form",
        name: "Forms",
        component: Componente
    },
    {
        path: "/:catchAll(.*)",
        component: PageNotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;
