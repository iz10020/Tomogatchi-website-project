<template>
  <div class="tamagotchi">
    <h1>Your Tamagotchi</h1>
    <img :src="petImage" alt="Tamagotchi" class="pet-image" v-if="isAlive"/>

    <div class="stats" v-if="isAlive">
      <p class="stat-item">Happiness: {{ stats.happiness }}%</p>
      <p class="stat-item">Health: {{ computedHealth }}%</p>
      <p class="stat-item">Hunger: {{ stats.hunger }}%</p>
      <p class="stat-item">Cleanliness: {{ stats.cleanliness }}%</p>
    </div>

    <div class="buttons" v-if="isAlive">
      <button @click="feedPet">Feed</button>
      <button @click="playGame">Play Game</button>
      <button @click="cleanPet">Clean</button>
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
        cleanliness: 100,
      },
      isAlive: true,
    };
  },

  computed: {
    computedHealth() {
      // Adjust health based on the new weights
      const happinessFactor = this.stats.happiness * 0.3;  // 30% of happiness contributes to health
      const hungerFactor = (100 - this.stats.hunger) * 0.4; // 40% of hunger (lower hunger = higher health)
      const cleanlinessFactor = this.stats.cleanliness * 0.3; // 30% of cleanliness contributes to health (no inversion)

      // Sum up the factors without dividing by 3
      let health = happinessFactor + hungerFactor + cleanlinessFactor;

      // Return health as a rounded value, ensuring it stays between 0 and 100
      return Math.max(0, Math.min(100, health)).toFixed(1);
    },
  },

  watch: {
    computedHealth(newHealth) {
      if (newHealth <= 0) {
        this.isAlive = false; // Tamagotchi dies when health reaches 0
      }
    },
  },

  methods: {
    feedPet() {
      if (this.isAlive) {
        this.stats.hunger = Math.max(this.stats.hunger - 3, 0); // Feeding reduces hunger
      }
    },

    playGame() {
      if (this.isAlive) {
        this.stats.happiness = Math.min(this.stats.happiness + 10, 100); // Playing increases happiness
      }
    },

    cleanPet() {
      if (this.isAlive) {
        this.stats.cleanliness = Math.min(this.stats.cleanliness + 20, 100); // Cleaning restores cleanliness
      }
    },

    restartGame() {
      // Reset stats to their initial values
      this.stats.happiness = 100;
      this.stats.hunger = 0;
      this.stats.cleanliness = 100; // Reset cleanliness to 100
      this.isAlive = true;
    },
  },

  mounted() {
    // Simulate the passage of time (every 5 seconds)
    setInterval(() => {
      if (this.isAlive) {
        // Increment hunger, decrease happiness, and cleanliness over time
        if (this.stats.hunger < 100) this.stats.hunger += 5;
        if (this.stats.happiness > 0) this.stats.happiness -= 1;
        if (this.stats.cleanliness > 0) this.stats.cleanliness -= 2;
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
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  background-color: #f0f0f0; /* Light background */
  width: 100%;
}

.tamagotchi {
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center the content vertically */
  align-items: center; /* Center the content horizontally */
  text-align: center;
  height: 80vh; /* 80% of the viewport height */
  width: 100%;
  max-width: 600px; /* Limit the width on large screens */
  padding: 20px;
  box-sizing: border-box;
}

.pet-image {
  width: 150px;
  height: auto;
  max-width: 100%;
}

.stats {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap;
}

.stat-item {
  margin: 0 15px;
  font-size: 18px;
  min-width: 120px;
}

.buttons {
  margin-top: 20px;
}

button {
  margin-top: 10px;
  padding: 12px 24px;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #555;
}

button:focus {
  outline: none;
}

/* Media queries for responsiveness */

/* Mobile devices */
@media (max-width: 480px) {
  .pet-image {
    width: 120px;
  }

  .stat-item {
    font-size: 14px;
  }

  button {
    padding: 8px 16px;
    font-size: 14px;
  }

  h1 {
    font-size: 20px;
  }
}

/* Tablets */
@media (max-width: 768px) {
  .pet-image {
    width: 140px;
  }

  .stat-item {
    font-size: 16px;
  }

  button {
    padding: 10px 18px;
    font-size: 15px;
  }

  h1 {
    font-size: 24px;
  }
}

/* Laptops and desktops */
@media (min-width: 769px) {
  /* For large laptops (1920px) */
  @media (min-width: 1920px) {
    .tamagotchi {
      max-width: 100%;
      padding: 20px;
    }

    .pet-image {
      width: 180px;
    }

    .stat-item {
      font-size: 20px;
    }

    button {
      padding: 12px 24px;
      font-size: 18px;
    }

    h1 {
      font-size: 36px;
    }
  }

  /* For general large screens */
  @media (min-width: 1200px) {
    .tamagotchi {
      max-width: 100%;
    }

    .pet-image {
      width: 160px;
    }

    .stat-item {
      font-size: 18px;
    }

    button {
      padding: 12px 22px;
      font-size: 16px;
    }

    h1 {
      font-size: 32px;
    }
  }
}
</style>
