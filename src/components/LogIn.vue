<template>
    <div class="login-container">
        <i class="fas fa-university fa-4x mb-20px color-icon"></i>
        <div class="mb-20px">
            <div class="p-float-label">
                <InputText class="w-100" id="username" type="text" v-model="username"/>
                <label for="username">Username</label>
            </div>
        </div>
        <div class="mb-20px">
            <div class="p-float-label">
                <InputText class="w-100" id="password" type="password" v-model="password"/>
                <label for="password">Contraseña</label>
            </div>
        </div>
        <div class="mb-20px">
            <Button label="Ingresar" 
                    icon="pi pi-sign-in"
                    @click="logIn" />
        </div>
        <div>
            <Button label="Registrarme"
                    v-on:click="registrarme" 
                    class="p-button-link" />
        </div>
    </div>
</template>
<script>
import gql from 'graphql-tag';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
export default {
    name: "LogIn",
    components:{
        InputText,
        Button
    },
    data: function(){
        return {
            username: 'pperez',
            password: 'pass1234'
        }
    },
    methods: {
        registrarme: function(){
            // como se maneja el router de forma programatica
            this.$router.push({
                name: "Registro"
            });
        },
        logIn: function(){
            // ir al servicio de apollo(api gateway)
            alert(`username: ${this.username}, password: ${this.password}`);
            this.$apollo.mutate({
                mutation: gql`
                    mutation logIn($c: CredentialsInput!){
                        logIn(credentials: $c) {
                            access
                            refresh
                        }
                    }
                `,
                variables: {
                    c: {
                        username: this.username,
                        password: this.password
                    }
                }
            }).then((response)=>{
                const {
                    access,
                    refresh
                } = response.data.logIn;
                this.$emit('completeLogin', {
                    access, 
                    refresh
                });
            }).catch(() => {
                // mande un usuario que no existe
                // mande la contraseña mal
                alert('se presento un error');
            });
        }
    }
}
</script>
<style scoped>
.mb-10px {
    margin-bottom: 10px;
}

.mb-20px {
    margin-bottom: 20px;
}

.login-container {
    border: 1px solid gray;
    padding: 20px;
    text-align: center;
    border-radius: 10px;
    box-shadow: 6px 5px 6px 0px rgba(0,0,0,0.22);
    width: 500px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 300px;
}

.w-100 {
    width: 100%
}
.color-icon {
    color: #3F51B5
}
</style>
