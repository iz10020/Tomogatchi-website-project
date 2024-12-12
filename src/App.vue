<template>
  <!-- Verwijder de Vue logo afbeelding -->
  <router-view />
</template>

<script>
// Importeer de TamagotchiDisplay component met de juiste naam
// import TamagotchiDisplay from './components/TamagotchiDisplay.vue';  

export default {
  name: 'App',
  components: {
    // TamagotchiDisplay  // Voeg de component toe aan de components sectie
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
