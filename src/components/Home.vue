<template>
    <MainLayout>
        <div v-if="!loading">
            <div class="user-info mb-20px">
                <div>
                    <h3>Información de Usuario</h3>
                    <div class="mb-20px">
                        <div class="p-float-label">
                            <InputText class="w-100" id="username" type="text" readonly v-model="user.first_name"/>
                            <label for="username">Nombres</label>
                        </div>
                    </div>
                    <div class="mb-20px">
                        <div class="p-float-label">
                            <InputText class="w-100" id="username" type="text" readonly v-model="user.last_name"/>
                            <label for="username">Apellidos</label>
                        </div>
                    </div>
                    <div class="mb-20px">
                        <div class="p-float-label">
                            <InputText class="w-100" id="username" type="text" readonly v-model="user.email"/>
                            <label for="username">Correo</label>
                        </div>
                    </div>
                    <div class="mb-20px">
                        <div class="p-float-label">
                            <InputText class="w-100" id="username" type="text" readonly v-model="user.balance"/>
                            <label for="username">Saldo</label>
                        </div>
                    </div>
                </div>
                <div>
                    <Button class="p-button-info" 
                            icon="pi pi-credit-card"
                            label="Crear Transacción"
                            @click="createTransaction"/>

                    <Button class="p-button-secondary ml-5px" 
                            icon="pi pi-sign-out"
                            label="Cerrar Sesión"
                            @click="logOut"/>
                </div>
            </div>
            <div>
                <h3>Transacciones</h3>
                <table class="tabla-transacciones">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cuenta de Origen</th>
                            <th>Cuenta de Destino</th>
                            <th>Valor</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="t in transacciones" v-bind:key="t.id">
                            <td>{{t.id}}</td>
                            <td>{{t.originAccount}}</td>
                            <td>{{t.destinyAccount}}</td>
                            <td>{{t.value}}</td>
                            <td>{{t.date}}</td>
                        </tr>
                    </tbody>
                </table>    
            </div>
        </div>
        <div v-else>
            Consultando Información...
        </div>
    </MainLayout>
</template>
<script>
import MainLayout from '@/layout/MainLayout.vue'
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import gql from 'graphql-tag';
export default {
    name: "Home",
    components: {
        MainLayout,
        Button,
        InputText
    },
    data: function() {
        return {
            user: null,
            transacciones: [],
            loading: true
        }
    },
    mounted:function(){
        this.getData();
    },
    methods: {
        getData: function() {
            this.loading = true;
            this.$apollo.query({
                query: gql`
                    query getData {
                        userDetailById {
                            id,
                            first_name,
                            last_name,
                            email
                        },
                        getAccountByUsername {
                            balance
                        },
                        getTransactions {
                            id,
                            originAccount,
                            destinyAccount,
                            value,
                            date
                        }
                    }
                `,
                fetchPolicy: 'no-cache'
            }).then((response)=>{
                this.user = {
                    ...response.data.userDetailById,
                    balance: response.data.getAccountByUsername.balance
                };
                this.transacciones = response.data.getTransactions.sort((a,b)=>{
                    return a.date.localeCompare(b.date);
                });
                this.loading = false;
            }).catch(()=>{
                alert('se presento un error');
            });
        },
        logOut: function() {
            this.$emit('logOut');
        },
        createTransaction: function(){
            this.$router.push({
                name: 'Transaccion'
            });
        }
    }
}
</script>
<!--
scoped: Van a ser estilos que solamente aplican a este componnete
-->
<style scoped>
.user-info {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-column-gap: 5px;
}

.tabla-transacciones {
    width: 100%;
}
</style>