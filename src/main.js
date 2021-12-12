import { createApp } from 'vue'
import App from './App.vue'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
//import { setContext } from 'apollo-link-context';

// Estilos para los iconos
import '@fortawesome/fontawesome-free/css/all.css';

import PrimeVue from 'primevue/config';
// Estilos para usar primevue
import 'primevue/resources/primevue.min.css';

// Tema de primevue
import 'primevue/resources/themes/md-light-indigo/theme.css'
//import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'

import 'primeicons/primeicons.css';

// Agregar nuestros estilos personalizados
import '@/assets/css/styles.css';

import router from '@/router';

// import {setContext} from '@apollo/client/link/context';


const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
})


// const authLink = setContext((_, { headers }) => {
//     const token = localStorage.getItem('access_token');
//     if (token) {
//         return {
//             headers: {
//                 ...headers,
//                 "Authorization": `Bearer ${token}`
//             }
//         }
//     } else {
//         return headers
//     }
// });

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

const apolloProvider = new createApolloProvider({
    defaultClient: apolloClient
})

const app = createApp(App);

app.use(apolloProvider);
app.use(router);
app.use(PrimeVue);

app.mount('#app');