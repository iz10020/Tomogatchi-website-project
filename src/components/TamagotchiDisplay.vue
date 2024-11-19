<template>
  <div class="tamagotchi">
    <h1>Your Tamagotchi</h1>
    <img :src="petImage" alt="Tamagotchi" class="pet-image" v-if="isAlive"/>
    
    <div class="stats" v-if="isAlive">
      <p>Happiness: {{ stats.happiness }}%</p>
      <p>Health: {{ computedHealth }}%</p>
      <p>Hunger: {{ stats.hunger }}%</p>
      <button @click="feedPet">Feed</button>
      <button @click="playGame">Play Game</button>
    </div>

    <div v-else>
      <p>Your Tamagotchi has passed away. 😢</p>
      <button @click="restartGame">Restart</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TamagotchiDisplay',

  data() {
    return {
      petImage: require('../assets/kirby star.gif'),
      stats: {
        happiness: 100,
        hunger: 0,
      },
      isAlive: true,
    };
  },

  computed: {
    computedHealth() {
      const happinessFactor = this.stats.happiness * 0.7;
      const hungerFactor = (100 - this.stats.hunger) * 0.3;
      return Math.round(happinessFactor + hungerFactor);
    },
  },

  watch: {
    computedHealth(newHealth) {
      // Set isAlive to false if health is 0 or below
      if (newHealth <= 0) {
        this.isAlive = false;
      }
    },
  },

  methods: {
    feedPet() {
      if (this.isAlive) {
        this.stats.hunger = Math.max(this.stats.hunger - 3, 0);
      }
    },

    playGame() {
      if (this.isAlive) {
        this.stats.happiness = Math.min(this.stats.happiness + 10, 100);
      }
    },

    restartGame() {
      // Reset the stats and restart the game
      this.stats.happiness = 100;
      this.stats.hunger = 0;
      this.isAlive = true;
    },
  },

  mounted() {
    setInterval(() => {
      if (this.isAlive) {
        if (this.stats.hunger < 100) this.stats.hunger += 5;
        if (this.stats.happiness > 0) this.stats.happiness -= 1;
      }
    }, 5000);
  },
};
</script>

<style scoped>
@font-face {
  font-family: 'Minecraft';
  src: url('@/assets/fonts/Minecraft.ttf') format('truetype');
}

* {
  font-family: 'Minecraft', sans-serif;
}

.tamagotchi {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;  /* Centers text inside each element */
}

.pet-image {
  width: 150px;
  height: auto;
}

.stats {
  margin-top: 20px;
}
</style>
