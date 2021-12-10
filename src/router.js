import Componente from "@/components/Componente";
import PageNotFound from "@/components/PageNotFound";
import LogIn from "@/components/LogIn";
import Registro from "@/components/Registro";
import Transaccion from "@/components/Transaccion";
import Home from "@/components/Home";
import {createRouter, createWebHistory} from "vue-router";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import gql from 'graphql-tag';
import jwt_decode from "jwt-decode";

const routes = [
    {
        path: "/",
        name: "logIn",
        component: LogIn,
        meta: {
            requireAuth: false
        }
    },
    {
        path: "/registro",
        name: "Registro",
        component: Registro,
        meta: {
            requireAuth: false
        }
    },
    {
        path: "/transaccion",
        name: "Transaccion",
        component: Transaccion,
        meta: {
            requireAuth: true
        }
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
        meta: {
            requireAuth: true
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

const apolloClient = new ApolloClient({
    link: createHttpLink({
        uri: 'https://gateway-g71.herokuapp.com',
    }),
    cache: new InMemoryCache()
})

async function isAuth() {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    if(access_token === null || refresh_token === null) {
        return false;
    }
    // Necesito consultar al api gateway
    try {
        const decoded = jwt_decode(access_token);
        const exp = new Date(decoded.exp * 1000);
        const now = new Date();
        if(now < exp) {
            return true;
        } else {
            const response = await apolloClient.mutate({
                mutation: gql`
                    mutation refresh($t: String!) {
                        refreshToken(refresh: $t) {
                            access
                        }
                    }
                `,
                variables: {
                    t: refresh_token
                }
            });
            localStorage.setItem('access_token', response.data.refreshToken.access)
        }
        return true;
    } catch(e) {
        // Se ejecuta si se presenta algun error
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('username');
        alert('Su sesión expiro');
        return false;
    }    
}

router.beforeEach(async (to) => {
    if(to.meta.requireAuth){
        if(await isAuth()) {
            return true;
        } else {
            return {
                name: 'logIn'
            };
        }
    } else {
        return true;
    }
});

export default router;
