<template>
    <MainLayout v-on:mievento="capturarEvento">
        <div v-if="!loading" class="transaction-container">
            <h3 class="mb-20px"> <i class="fa fa-list"></i> Crear Transacción</h3>
            <div class="mb-20px">
                    <Dropdown v-model="destinyAccount"
                                id="dropdown"
                                class="w-100" 
                                :options="accounts" 
                                optionLabel="username" 
                                filter
                                placeholder="Seleccione una cuenta" />
                
            </div>
            <div class="mb-20px">
                <div class="p-float-label">
                    <InputNumber class="w-100"
                    v-model="value"
                    :min="1"
                    :max="balance" 
                    id="password2" 
                    mode="currency" 
                    currency="USD" 
                    locale="en-US"/>
                    <label for="password2">Ingrese el valor</label>
                </div>
            </div>
             <div class="mb-20px">
                <Button label="Enviar la transacción"
                        class="p-button-success"
                        @click="createTransaction"
                        icon="pi pi-send"/>
            </div>
            <div>
                <Button label="Cancelar"
                        icon="pi pi-arrow-left"
                        @click="cancel"
                        class="p-button-link" />
            </div>
        </div>
        <div v-else>
            Consultando Información...
        </div>
    </MainLayout>
</template>
<script>
import MainLayout from '@/layout/MainLayout.vue'
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import gql from 'graphql-tag';

export default {
    name: "Transaction",
    components: {
        MainLayout,
        Dropdown,
        InputNumber,
        Button
    },
    data: function() {
        return {
            loading: true,
            accounts: [],
            balance: 0,
            value: 0,
            destinyAccount: null,
            originAccount: null
        }
    },
    mounted:function(){
        this.getData()
    },
    methods: {
        cancel: function(){
            this.$router.push({
                name: 'Home'
            });
        },
        getData: function() {
            this.originAccount = localStorage.getItem('username');
            this.loading = true;
            this.$apollo.query({
                query: gql`
                    query getData {
                        getAllAccounts {
                            username
                        },
                        getAccountByUsername {
                            balance
                        }
                    }
                `
            }).then((response)=>{
                this.accounts = response.data.getAllAccounts.filter((a)=>{
                    console.log(a.username, this.originAccount, a.username !== this.originAccount)
                    return a.username !== this.originAccount;
                });
                this.balance = response.data.getAccountByUsername.balance;
                this.loading = false;
            }).catch(()=>{
                alert('Se presento un error');
            })
        },
        createTransaction: function(){
            if(!this.originAccount || !this.destinyAccount || !this.value) {
                alert('todos los campos son obligatorios');
            } else if(this.originAccount === this.destinyAccount.username) {
                alert('no puede crear una transacción a su misma cuenta')
            } else {
                this.$apollo.mutate({
                mutation: gql`
                    mutation create($tran: CreateTransaction!) {
                        createTransaction(transaction: $tran) {
                            id
                        }
                    }
                `,
                variables: {
                    tran: {
                        originAccount: this.originAccount,
                        destinyAccount: this.destinyAccount.username,
                        value: this.value
                    }
                }
            }).then(()=>{
                alert('Se creo la transacción');
                this.$router.push({
                    name: 'Home'
                });
            }).catch(()=>{
                alert('Se genero un error');
            });
            }
        },
        capturarEvento: function() {
            this.$emit('otroevento')
        }
    }
}
</script>
<style scoped>
.transaction-container {
    width: 600px;
}
</style>