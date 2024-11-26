<template>
  <div class="tamagotchi">
    <h1>Your Tamagotchi</h1>
    <!-- Display the primary pet image -->
    <img :src="petImage" alt="Tamagotchi" class="pet-image" v-if="isAlive" />

    <!-- Display additional images (e.g., rain or shower effect) -->
    <div v-if="additionalImages.length > 0" class="additional-images-container">
      <img v-for="(img, index) in additionalImages" :key="index" :src="img" alt="Additional image" class="additional-image" />
    </div>

    <div v-if="isAlive" class="main-container">
      <!-- Health Image and Stat Centered -->
      <div class="health-image-container">
        <img :src="healthImage" alt="Health Status" class="health-image" />
        <p :class="getStatClass(computedHealth)" class="health-stat">
          Health: {{ computedHealth }}%
        </p>
      </div>

      <!-- Buttons in a Horizontal Row -->
      <div class="buttons-row">
        <div class="stat-group">
          <button @click="playGame" class="image-button">
            <img src="@/assets/gamebutton.gif" alt="Play Game Button" />
          </button>
          <p :class="getStatClass(stats.happiness)" class="stat-item">
            Happiness: {{ stats.happiness }}%
          </p>
        </div>

        <div class="stat-group">
          <button @click="feedPet" class="image-button">
            <img src="@/assets/feedbutton.png" alt="Feed Button" />
          </button>
          <p :class="getStatClass(stats.hunger, true)" class="stat-item">
            Hunger: {{ stats.hunger }}%
          </p>
        </div>

        <div class="stat-group">
          <button @click="cleanPet" class="image-button">
            <img src="@/assets/cleanbutton.png" alt="Clean Button" />
          </button>
          <p :class="getStatClass(stats.cleanliness)" class="stat-item">
            Cleanliness: {{ stats.cleanliness }}%
          </p>
        </div>

        <div class="stat-group">
          <button @click="putToSleep" class="image-button">
            <img src="@/assets/sleepbutton.png" alt="Sleep Button" />
          </button>
          <p :class="getStatClass(stats.energy)" class="stat-item">
            Energy: {{ stats.energy }}%
          </p>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Your Tamagotchi has passed away. 😢</p>
      <button @click="restartGame" class="restart-button">Restart</button>
    </div>
  </div>
</template>

<script>
import backgroundImage from "@/assets/grassland.png"; // Import background image

export default {
  name: "TamagotchiDisplay",

  data() {
    return {
      petImage: require("../assets/kirbyidle.gif"), // Default idle image
      stats: {
        happiness: 100,
        hunger: 0,
        cleanliness: 100,
        energy: 100,
      },
      isAlive: true,
      backgroundImage, // Store background image for later use
      additionalImages: [], // Store the additional images to be displayed (like rain or shower)
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
        if (value <= 10) return "text-dark-green";
        if (value <= 30) return "text-light-green";
        if (value <= 50) return "text-yellow";
        if (value <= 70) return "text-orange";
        return "text-red";
      } else {
        if (value >= 90) return "text-dark-green";
        if (value >= 60) return "text-light-green";
        if (value >= 30) return "text-yellow";
        if (value >= 10) return "text-orange";
        return "text-red";
      }
    },

    feedPet() {
      if (this.isAlive) {
        this.stats.hunger = Math.max(this.stats.hunger - 3, 0);
        this.changePetImage("kirbyeating.gif");
      }
    },

    playGame() {
      if (this.isAlive) {
        this.stats.happiness = Math.min(this.stats.happiness + 10, 100);
        this.changePetImage("kirby star.gif");
      }
    },

    cleanPet() {
      if (this.isAlive) {
        this.stats.cleanliness = Math.min(this.stats.cleanliness + 20, 100);
        this.changePetImage(["kirbyshower.gif", "showerrain2.gif"]);
      }
    },

    putToSleep() {
      if (this.isAlive) {
        this.stats.energy = Math.min(this.stats.energy + 1.5, 100);
        this.changePetImage("kirbysleep.gif");
      }
    },

    restartGame() {
      this.stats.happiness = 100;
      this.stats.hunger = 0;
      this.stats.cleanliness = 100;
      this.stats.energy = 100;
      this.isAlive = true;
      this.additionalImages = [];
      this.petImage = require("../assets/kirbyidle.gif");
    },

    // This method updates the pet image and resets it after 3 seconds
    changePetImage(imageNames) {
      if (typeof imageNames === 'string') {
        this.petImage = require(`@/assets/${imageNames}`);
        this.additionalImages = []; // Clear additional images
      } else {
        this.petImage = require(`@/assets/${imageNames[0]}`);
        this.additionalImages = imageNames.slice(1); // Set additional images for cleanliness (like the rain)
      }

      setTimeout(() => {
        this.petImage = require("../assets/kirbyidle.gif");
        this.additionalImages = [];
      }, 3000); // Reset the image after 3 seconds
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
  height: 100%; /* Ensure the body takes full height */
  width: 100%; /* Ensure the body takes full width */
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/grassland.png'); /* Background image */
  background-size: cover;
  background-position: center center;
  overflow: hidden;
}

.tamagotchi {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2vh;
  width: 100%;
  max-width: 600px; /* Limit for larger screens */
  margin: 0 auto; /* Make sure the content is centered horizontally */
  min-height: 60vh; /* Ensure content fills at least 60% of the viewport height */
}

h1 {
  font-size: 3.5vh;
  font-weight: bold;
  color: black; /* Set text color to black */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Optional shadow for visibility */
  margin-bottom: 2vh;
}

.pet-image {
  width: 30vh;
  margin-bottom: 2vh;
}

.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.health-image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 3vh;
}

.health-image {
  width: 15vh;
  margin-bottom: 1vh;
}

.health-stat {
  font-size: 2.5vh;
  font-weight: bold;
}

.buttons-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2vw;
  flex-wrap: wrap;
}

.stat-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.stat-item {
  font-size: 1.8vh;
  margin-top: 0.5vh;
  text-align: center;
}

.image-button {
  background: none;
  border: none;
  cursor: pointer;
}

.image-button img {
  width: 10vh;
  max-width: 80px;
  transition: transform 0.2s ease;
}

.image-button img:hover {
  transform: scale(1.2);
}

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

.restart-button {
  margin-top: 2vh;
  padding: 1vh 2vw;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 2vh;
  align-self: center; /* Centers the button */
}

.restart-button:hover {
  background-color: #555;
}
</style>
