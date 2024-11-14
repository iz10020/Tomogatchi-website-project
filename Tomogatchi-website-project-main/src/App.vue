<template>
  <div class="container">
    <h1>Tamagotchi</h1>

    <!-- Pet Selector -->
    <div class="pet-selector">
      <label for="pet-select">Choose a pet:</label>
      <select id="pet-select" @change="changePet">
        <option value="pet1">Pet 1</option>
        <option value="pet2">Pet 2</option>
        <option value="pet3">Pet 3</option>
      </select>
    </div>

    <!-- Display Tamagotchi Pet -->
    <div class="tamagotchi">
      <img :src="petImage" alt="Tamagotchi" />
    </div>

    <!-- Status Panel -->
    <div class="status">
      <p>Happiness: <span>{{ happiness }}</span></p>
      <p>Hunger: <span>{{ hunger }}</span></p>
      <p>Energy: <span>{{ energy }}</span></p>
    </div>

    <!-- Interaction Buttons -->
    <div class="buttons">
      <button @click="feedPet">Feed</button>
      <button @click="playWithPet">Play</button>
      <button @click="sleepPet">Sleep</button>
    </div>

    <!-- Time and updates -->
    <p id="time">Time: {{ time }}s</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      happiness: 100,
      hunger: 0,
      energy: 100,
      time: 0,
      currentPet: 'pet1',
      pets: {
        pet1: {
          name: "Pet 1",
          happyImage: "bunnyhappy.gif",
          sadImage: "bunnysad.gif",
          initialHappiness: 100,
          initialHunger: 0,
          initialEnergy: 100
        },
        pet2: {
          name: "Pet 2",
          happyImage: "pengiunhappy.gif",
          sadImage: "pengiunsad.gif",
          initialHappiness: 90,
          initialHunger: 10,
          initialEnergy: 80
        },
        pet3: {
          name: "Pet 3",
          happyImage: "cathappy.gif",
          sadImage: "catsad.gif",
          initialHappiness: 80,
          initialHunger: 20,
          initialEnergy: 90
        }
      },
      timeInterval: null
    };
  },
  computed: {
    petImage() {
      const pet = this.pets[this.currentPet];
      if (this.happiness < 30 || this.hunger > 70 || this.energy < 50) {
        return pet.sadImage;
      } else {
        return pet.happyImage;
      }
    }
  },
  methods: {
    updateStats() {
      this.time++;
      this.happiness = Math.max(this.happiness - 1, 0);
      this.hunger = Math.min(this.hunger + 1, 100);
      this.energy = Math.max(this.energy - 1, 0);
    },
    feedPet() {
      this.hunger = Math.max(this.hunger - 20, 0);
      this.energy = Math.min(this.energy + 10, 100);
    },
    playWithPet() {
      this.happiness = Math.min(this.happiness + 20, 100);
      this.hunger = Math.min(this.hunger + 20, 100);
      this.energy = Math.max(this.energy - 10, 0);
    },
    sleepPet() {
      this.energy = Math.min(this.energy + 40, 100);
      this.hunger = Math.min(this.hunger + 10, 100);
    },
    changePet(event) {
      const selectedPet = this.pets[event.target.value];
      this.currentPet = event.target.value;
      this.happiness = selectedPet.initialHappiness;
      this.hunger = selectedPet.initialHunger;
      this.energy = selectedPet.initialEnergy;
    }
  },
  mounted() {
    this.timeInterval = setInterval(this.updateStats, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timeInterval);
  }
};
</script>
