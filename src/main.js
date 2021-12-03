import { createApp } from 'vue'
import App from './App.vue'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
//import { setContext } from 'apollo-link-context';

// Estilos para los iconos
import '@fortawesome/fontawesome-free/css/all.css';
// Estilos para usar primevue
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/md-light-indigo/theme.css'
import 'primeicons/primeicons.css';

// Agregar nuestros estilos personalizados
import '@/assets/css/styles.css';

import router from '@/router';

const httpLink = createHttpLink({
    uri: 'https://gateway-g71.herokuapp.com',
})

/*
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            "Authorization": ""
        }
    }
})*/

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

app.mount('#app');