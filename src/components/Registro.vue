<template>
    <div class="mb-20px">
        <div class="p-float-label">
            <InputText class="w-100" id="username" type="text" v-model="username"/>
            <label for="username">Nombre de usuario</label>
        </div>
    </div>
    <div class="mb-20px">
        <div class="p-float-label">
            <InputText class="w-100" id="name" type="text" v-model="name"/>
            <label for="name">Nombre completo</label>
        </div>
    </div>
    <div class="mb-20px">
        <div class="p-float-label">
            <InputText class="w-100" id="email" type="email" v-model="email"/>
            <label for="email">Correo Electronico</label>
        </div>
    </div>
    <div class="mb-20px">
        <div class="p-float-label">
            <InputText class="w-100" id="phone" type="number" v-model="phone"/>
            <label for="phone">Numero de celular</label>
        </div>
    </div>    
    <div class="mb-20px">
        <div class="p-float-label">
            <InputText class="w-100" id="password" type="password" v-model="password"/>
            <label for="password">Contraseña</label>
        </div>
    </div>
    <div class="mb-20px">
        <div class="p-float-label">
            <InputText class="w-100" id="password2" type="password" v-model="confirmPassword"/>
            <label for="password2">Confirmar Contraseña</label>
        </div>
    </div>
    <div class="mb-20px">
        <Button label="Registrarme"
                @click="registrarme" 
                icon="pi pi-sign-in"/>
    </div>
    <div>
        <Button label="Ya estoy registrado"
                @click="regresar"
                class="p-button-link" />
    </div>
        
</template>
<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import gql from 'graphql-tag';
export default {
    name: "Registro",
    components: {
        InputText,
        Button
    },
    data: function() {
        return {
            username: '',
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        }
    },
    methods: {
        registrarme: function(){
            if(!this.username || !this.name || !this.email || !this.phone || !this.password || !this.confirmPassword) {
                alert('Todos los campos son obligatorios')
            } else if(this.password !== this.confirmPassword) {
                alert('Las contraseñas no coinciden')
            } else {
                const user = {
                    username: this.username,
                    name : this.name,
                    email: this.email,
                    phone: this.phone,                    
                    password: this.password
                };
                console.log(user)
                this.$apollo.mutate({
                    mutation: gql`
                        mutation createUser($info: CreateUserInput!) {
                            createUser(info: $info) {
                                id,
                                username
                            }
                        }
                    `,
                    variables: {
                        info: user
                    }
                }).then((response)=>{
                    console.log(response.data.createUser);
                    alert('Usuario creado con exito');
                    this.regresar();
                }).catch((error)=>{
                    alert('Se presento un error, vuelva a intentarlo');
                    console.error(error);
                })
            }
        },
        regresar: function() {
            this.$router.push({
                name:"logIn"
            });
        }
    }
}
</script>
<style scoped>
</style>