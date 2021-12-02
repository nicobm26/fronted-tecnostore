<template>
  <h1>{{msg}}</h1>
  <div>
  <i class="fas fa-circle-notch fa-4x fa-spin"></i>
  </div>
  <div>
    En construncción...
  </div>

  <button v-on:click="send">
    Enviar información
  </button>

</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    send: function() {
      alert('Enviar información');
      this.$emit('enviar', {
        mensaje: `Hola: ${this.msg}`
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
