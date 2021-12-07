<template>
    <MainLayout>
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
                        label="Crear Transacción"/>

                <Button class="p-button-secondary ml-5px" 
                        icon="pi pi-sign-out"
                        label="Cerrar Sesión"/>
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
    </MainLayout>
</template>
<script>
import MainLayout from '@/layout/MainLayout.vue'
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
export default {
    name: "Home",
    components: {
        MainLayout,
        Button,
        InputText
    },
    data: function() {
        return {
            user: {
                first_name: 'Pedro',
                last_name: 'Perez',
                email: 'pperez@domain.co',
                balance: 1000,
            },
            transacciones: [
                {
                    id: "asdfasdf",
                    originAccount: "cuenta1",
                    destinyAccount: "cuenta2",
                    value: 533,
                    date: "11/12/2021",
                },
                {
                    id: "asdfasdf",
                    originAccount: "cuenta1",
                    destinyAccount: "cuenta2",
                    value: 533,
                    date: "11/12/2021",
                },
                {
                    id: "asdfasdf",
                    originAccount: "cuenta1",
                    destinyAccount: "cuenta2",
                    value: 533,
                    date: "11/12/2021",
                }
            ]
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