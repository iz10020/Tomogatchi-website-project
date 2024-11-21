<template>
  <div class="tamagotchi">
    <h1>Your Tamagotchi</h1>
    <img :src="petImage" alt="Tamagotchi" class="pet-image" v-if="isAlive" />

    <div class="stats-and-buttons" v-if="isAlive">
      <div class="stat-group">
        <p :class="getStatClass(stats.happiness, false)" class="stat-item">
          Happiness: {{ stats.happiness }}%
        </p>
        <button @click="playGame" class="image-button">
          <img src="@/assets/gamebutton.gif" alt="Play Game Button" />
        </button>
      </div>

      <div class="stat-group health-stat">
        <p :class="getStatClass(computedHealth, false)" class="stat-item">
          Health: {{ computedHealth }}%
        </p>
        <img :src="healthImage" alt="Health Status" class="health-image" />
      </div>

      <div class="stat-group">
        <p :class="getStatClass(stats.hunger, true)" class="stat-item">
          Hunger: {{ stats.hunger }}%
        </p>
        <button @click="feedPet" class="image-button">
          <img src="@/assets/feedbutton.png" alt="Feed Button" />
        </button>
      </div>

      <div class="stat-group">
        <p :class="getStatClass(stats.cleanliness, false)" class="stat-item">
          Cleanliness: {{ stats.cleanliness }}%
        </p>
        <button @click="cleanPet" class="image-button">
          <img src="@/assets/cleanbutton.png" alt="Clean Button" />
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
      },
      isAlive: true,
    };
  },

  computed: {
    computedHealth() {
      const happinessFactor = this.stats.happiness * 0.3;
      const hungerFactor = (100 - this.stats.hunger) * 0.4;
      const cleanlinessFactor = this.stats.cleanliness * 0.3;

      let health = happinessFactor + hungerFactor + cleanlinessFactor;

      return Math.max(0, Math.min(100, health)).toFixed(1);
    },

    healthImage() {
      if (!this.isAlive) {
        return require("@/assets/healthstat6.png");
      }

      const health = parseFloat(this.computedHealth);

      if (health >= 90) {
        return require("@/assets/healthstat.png");
      } else if (health >= 80) {
        return require("@/assets/healthstat2.png");
      } else if (health >= 60) {
        return require("@/assets/healthstat3.png");
      } else if (health >= 50) {
        return require("@/assets/healthstat4.png");
      } else if (health >= 30) {
        return require("@/assets/healthstat4.png");
      } else {
        return require("@/assets/healthstat5.png");
      }
    },
  },

  watch: {
    computedHealth(newHealth) {
      if (newHealth <= 0) {
        this.isAlive = false;
      }
    },
  },

  methods: {
    getStatClass(statValue, isHunger) {
      let value = parseFloat(statValue);
      if (isHunger) {
        if (value >= 80) return "text-red";
        if (value >= 60) return "text-orange";
        if (value >= 50) return "text-yellow";
        if (value >= 30) return "text-light-green";
        return "text-dark-green";
      } else {
        if (value >= 90) return "text-dark-green"; // Health-specific addition for 90+
        if (value >= 80) return "text-dark-green";
        if (value >= 60) return "text-light-green";
        if (value >= 50) return "text-yellow";
        if (value >= 30) return "text-orange";
        return "text-red";
      }
    },

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

    cleanPet() {
      if (this.isAlive) {
        this.stats.cleanliness = Math.min(this.stats.cleanliness + 20, 100);
      }
    },

    restartGame() {
      this.stats.happiness = 100;
      this.stats.hunger = 0;
      this.stats.cleanliness = 100;
      this.isAlive = true;
    },
  },

  mounted() {
    setInterval(() => {
      if (this.isAlive) {
        this.stats.hunger = Math.min(this.stats.hunger + 5, 100);
        this.stats.happiness = Math.max(this.stats.happiness - 1, 0);
        this.stats.cleanliness = Math.max(this.stats.cleanliness - 2, 0);
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
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  width: 100%;
}

.tamagotchi {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 80vh;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  box-sizing: border-box;
}

.pet-image {
  width: 150px;
  height: auto;
  max-width: 100%;
}

.stats-and-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.stat-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-item {
  font-size: 18px;
  margin-bottom: 10px;
  text-align: center;
}

.health-image {
  width: 80px;
  height: auto;
  margin-top: 10px;
}

/* Dynamic Colors */
.text-dark-green {
  color: darkgreen;
}

.text-light-green {
  color: lightgreen;
}

.text-yellow {
  color: yellow;
}

.text-orange {
  color: orange;
}

.text-red {
  color: red;
}

.image-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.image-button img {
  width: 80px;
  height: auto;
  display: block;
  transition: transform 0.2s ease;
}

.image-button img:hover {
  transform: scale(1.1);
}

.restart-button {
  margin-top: 10px;
  padding: 12px 24px;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.restart-button:hover {
  background-color: #555;
}

.restart-button:focus {
  outline: none;
}

@media (max-width: 480px) {
  .pet-image {
    width: 120px;
  }

  .stat-item {
    font-size: 14px;
  }

  .image-button img,
  .health-image {
    width: 60px;
  }

  h1 {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .pet-image {
    width: 140px;
  }

  .stat-item {
    font-size: 16px;
  }

  .image-button img,
  .health-image {
    width: 70px;
  }

  h1 {
    font-size: 24px;
  }
}

@media (min-width: 769px) {
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

    .image-button img,
    .health-image {
      width: 100px;
    }

    h1 {
      font-size: 36px;
    }
  }

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

    .image-button img,
    .health-image {
      width: 90px;
    }

    h1 {
      font-size: 32px;
    }
  }
}
</style>
