<template>
 <h1>Mi titulo</h1>
  <form>
  <label for="username">Ingrese el nombre de usuario: </label>
  <input id="username" 
         v-model="username"
         type="text">
  <div>
    <input type="email">
  </div>
  <div>
  <input type="password">
  </div>
  <div>
  <input type="number">
  </div>
  <div>
  <input type="date">
  </div>
  <div>
  <input type="checkbox">
  </div>

  <div>
  <textarea></textarea>
  </div>

  <div>
    Opción selecionada: {{seleccionado}}
    <select v-model="seleccionado">
      <option v-for="i in items" 
            v-bind:key="i"
            :value="i">
        {{i.name}}
      </option>
      
    </select>
  </div>
  </form>


  <div>{{username}}</div>




  <HelloWorld msg="Mi primera app con Vue.js"/>
  <div v-if="flag">
    <HelloWorld msg="Componente2" />
  </div>
  <HelloWorld msg="Componente 3"/>
  <button v-on:click="mostrarComponente">
    {{mensaje}}
  </button>
  <div>
  Lista no organizada
  <ul> <!-- ul: unsorted list, li: list item -->
    <li v-for="i in items" v-bind:key="i">
      {{i}}
    </li>
  </ul>
  </div> 
  <!-- ol: ordered list, li: list item -->
  <ol>
    <li v-for="i in items" v-bind:key="i">
      {{i}}
    </li>
  </ol>
  <h2 v-for="i in items" v-bind:key="i">{{i}}</h2>
  <div v-for="datos in items" v-bind:key="datos">
    <p>{{datos}}</p>
    <HelloWorld :msg="datos.name"
                v-on:enviar="recibirInformacion"/>
  </div>

</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Componente',
  props: {
    msg: String
  },
  components:{
      HelloWorld
  },
  data: function(){
    // Los atributos de mi componente
    return {
      flag: false,
      seleccionado: null,
      username: null,
      mensaje: "Activar mi componente 2",
      usuario: null,
      items: [
        {
        name: "elemento 1",
        flag: false
        },
        {
        name: "elemento 2",
        flag: false
        },
        {
        name: "elemento 3",
        flag: false
        }]
    }
  },
  methods: {
    mostrarComponente: function(){
      if(this.flag){
        this.flag = false;
        this.mensaje = "Activar mi componente 2";
      } else {
        this.flag = true;
        this.mensaje = "Ocultar mi componente 2";
      }
      for(let i=0; i<5; i++){
        console.log(i);
      }
    },
    recibirInformacion: function(args) {
      const {mensaje} = args;
      this.items.push({
        name: mensaje,
        flag: false
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
