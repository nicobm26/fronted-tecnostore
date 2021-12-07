<template>
  <router-view v-on:completeLogin="completeLogin">
  </router-view>
</template>

<script>


export default {
  name: 'App',
  methods: {
    completeLogin: function(args) {
      const {
        access,
        refresh
      } = args;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      this.$router.push({
        name:"Home"
      });
    }
  }
}

/**
 * Directivas de Vue
 * if -> v-if
 * for -> v-for
 */

/**
 * Eventos/Listeners
 */

/**
 * binding de la información
 */

/**
 * vincular información
 * v-model
 */

/**
 * SPA -> Single Page Application
 */
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
