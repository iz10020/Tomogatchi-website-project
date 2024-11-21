<template>
  <div class="tamagotchi">
    <h1>Your Tamagotchi</h1>
    <img :src="petImage" alt="Tamagotchi" class="pet-image" v-if="isAlive" />

    <div class="stats-and-buttons" v-if="isAlive">
      <!-- Happiness -->
      <div class="stat-group">
        <p :class="getStatClass(stats.happiness)" class="stat-item">
          Happiness: {{ stats.happiness }}%
        </p>
        <button @click="playGame" class="image-button">
          <img src="@/assets/gamebutton.gif" alt="Play Game Button" />
        </button>
      </div>

      <!-- Health -->
      <div class="stat-group health-stat">
        <p :class="getStatClass(computedHealth)" class="stat-item">
          Health: {{ computedHealth }}%
        </p>
        <img :src="healthImage" alt="Health Status" class="health-image" />
      </div>

      <!-- Hunger -->
      <div class="stat-group">
        <p :class="getStatClass(stats.hunger, true)" class="stat-item">
          Hunger: {{ stats.hunger }}%
        </p>
        <button @click="feedPet" class="image-button">
          <img src="@/assets/feedbutton.png" alt="Feed Button" />
        </button>
      </div>

      <!-- Cleanliness -->
      <div class="stat-group">
        <p :class="getStatClass(stats.cleanliness)" class="stat-item">
          Cleanliness: {{ stats.cleanliness }}%
        </p>
        <button @click="cleanPet" class="image-button">
          <img src="@/assets/cleanbutton.png" alt="Clean Button" />
        </button>
      </div>

      <!-- Energy -->
      <div class="stat-group">
        <p :class="getStatClass(stats.energy)" class="stat-item">
          Energy: {{ stats.energy }}%
        </p>
        <button @click="putToSleep" class="image-button">
          <img src="@/assets/sleepbutton.png" alt="Sleep Button" />
        </button>
      </div>
    </div>

    <div v-else>
      <p>Your Tamagotchi has passed away. 😢</p>
      <button @click="restartGame" class="restart-button">Restart</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TamagotchiDisplay",

  data() {
    return {
      petImage: require("../assets/kirby star.gif"),
      stats: {
        happiness: 100,
        hunger: 0,
        cleanliness: 100,
        energy: 100,
      },
      isAlive: true,
    };
  },

  computed: {
    computedHealth() {
      const happinessFactor = this.stats.happiness * 0.25;
      const hungerFactor = (100 - this.stats.hunger) * 0.25;
      const cleanlinessFactor = this.stats.cleanliness * 0.25;
      const energyFactor = this.stats.energy * 0.25;

      let health = happinessFactor + hungerFactor + cleanlinessFactor + energyFactor;
      return Math.max(0, Math.min(100, health)).toFixed(1);
    },

    healthImage() {
      const health = parseFloat(this.computedHealth);

      if (health >= 90) return require("@/assets/healthstat.png");
      if (health >= 80) return require("@/assets/healthstat2.png");
      if (health >= 60) return require("@/assets/healthstat3.png");
      if (health >= 30) return require("@/assets/healthstat4.png");
      return require("@/assets/healthstat5.png");
    },
  },

  methods: {
    getStatClass(value, isHunger = false) {
      if (isHunger) {
        // For hunger, lower values are better
        if (value <= 10) return "text-dark-green";
        if (value <= 30) return "text-light-green";
        if (value <= 50) return "text-yellow";
        if (value <= 70) return "text-orange";
        return "text-red";
      } else {
        // For other stats, higher values are better
        if (value >= 90) return "text-dark-green";
        if (value >= 60) return "text-light-green";
        if (value >= 30) return "text-yellow";
        if (value >= 10) return "text-orange";
        return "text-red";
      }
    },

    feedPet() {
      if (this.isAlive) this.stats.hunger = Math.max(this.stats.hunger - 3, 0);
    },

    playGame() {
      if (this.isAlive) {
        this.stats.happiness = Math.min(this.stats.happiness + 10, 100);
      }
    },

    cleanPet() {
      if (this.isAlive) this.stats.cleanliness = Math.min(this.stats.cleanliness + 20, 100);
    },

    putToSleep() {
      if (this.isAlive) {
        this.stats.energy = Math.min(this.stats.energy + 1.5, 100);
      }
    },

    restartGame() {
      this.stats.happiness = 100;
      this.stats.hunger = 0;
      this.stats.cleanliness = 100;
      this.stats.energy = 100;
      this.isAlive = true;
    },
  },

  mounted() {
    setInterval(() => {
      if (this.isAlive) {
        this.stats.hunger = Math.min(this.stats.hunger + 5, 100);
        this.stats.happiness = Math.max(this.stats.happiness - 1, 0);
        this.stats.cleanliness = Math.max(this.stats.cleanliness - 2, 0);
        this.stats.energy = Math.max(this.stats.energy - 2, 0);
      }
    }, 5000);
  },
};
</script>

<style scoped>
@font-face {
  font-family: "Minecraft";
  src: url("@/assets/fonts/Minecraft.ttf") format("truetype");
}

* {
  font-family: "Minecraft", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  overflow: hidden;
}

.tamagotchi {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  height: 100vh;
  width: 100vw;
  padding: 2vh 2vw;
  box-sizing: border-box;
}

h1 {
  font-size: 3vh;
  margin-bottom: 1vh;
}

.pet-image {
  width: 20vh;
  height: auto;
  max-width: 100%;
  margin-bottom: 1vh;
}

.stats-and-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1vh 2vw;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}

.stat-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 18%;
  min-width: 120px;
}

.stat-item {
  font-size: 2vh;
  margin-bottom: 0.5vh;
  text-align: center;
}

.image-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.image-button img {
  width: 10vh;
  height: auto;
  transition: transform 0.2s ease;
}

.image-button img:hover {
  transform: scale(1.1);
}

.health-image {
  width: 10vh;
  height: auto;
  margin-top: 0.5vh;
}

.text-dark-green { color: darkgreen; }
.text-light-green { color: lightgreen; }
.text-yellow { color: yellow; }
.text-orange { color: orange; }
.text-red { color: red; }

.restart-button {
  margin-top: 1vh;
  padding: 1vh 2vw;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 2vh;
  transition: background-color 0.3s;
}

.restart-button:hover {
  background-color: #555;
}

/* Ensure stats are in a single line */
@media (min-width: 1920px) {
  .stats-and-buttons {
    flex-wrap: nowrap;
    justify-content: center;
    align-items: flex-start;
    gap: 2vw;
  }

  .stat-group {
    width: auto;
    min-width: 0;
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.5vh;
  }

  .pet-image {
    width: 15vh;
  }

  .stat-item {
    font-size: 1.8vh;
  }

  .image-button img,
  .health-image {
    width: 8vh;
  }
}
</style>