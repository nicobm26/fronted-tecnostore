<template>
    <div class="register-container">
        <i class="fas fa-users-cog fa-4x mb-10px color-icon"></i>
        <h2>Registro de usuario</h2>
        <div class="mb-20px">
            <div class="p-float-label">
                <InputText class="w-100" id="username" type="text" v-model="username"/>
                <label for="username">Nombre de usuario</label>
            </div>
        </div>
        <div class="mb-20px">
            <div class="p-float-label">
                <InputText class="w-100" id="firstName" type="text" v-model="firstName"/>
                <label for="firstName">Nombres</label>
            </div>
        </div>
        <div class="mb-20px">
            <div class="p-float-label">
                <InputText class="w-100" id="lastName" type="text" v-model="lastName"/>
                <label for="lastName">Apellidos</label>
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
            lastName: '',
            firstName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    },
    methods: {
        validateEmail: function(email) {
            // Expresiones regulares nombre@dominio.co
            const regex = /\S+@\S+\.\S+/
            return regex.test(email);
        },
        registrarme: function(){
            if(!this.username || !this.lastName || !this.firstName || !this.email || !this.password || !this.confirmPassword) {
                alert('Todos los campos son obligatorios')
            } else if(!this.validateEmail(this.email)){
                alert('Correo no valido')
            } else if(this.password !== this.confirmPassword) {
                alert('Las contraseñas no coinciden')
            } else {
                const user = {
                    username: this.username,
                    last_name: this.lastName,
                    first_name: this.firstName,
                    email: this.email,
                    password: this.password,
                    balance: 0
                };
                this.$apollo.mutate({
                    mutation: gql`
                        mutation crearUsuario($data: CreateUserInput!) {
                            createUser(userInput: $data) {
                                id
                                username
                            }
                        }
                    `,
                    variables: {
                        data: user
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
.register-container {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    width: 600px;
    margin-top: 150px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 6px 5px 6px 0px rgba(0,0,0,0.22);
    text-align: center;
}
</style>