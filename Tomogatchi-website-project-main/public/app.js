const { createApp } = Vue;

createApp({
  data() {
    return {
      happiness: 100,
      hunger: 0,
      energy: 100,
      time: 0,
      currentPet: 'pet1', // Default pet
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
      timeInterval: null, // To store the setInterval reference
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
    },
  },
  methods: {
    updateStats() {
      // Updates the time and stats display
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
    },
  },
  mounted() {
    // Start the time update when the app is mounted
    this.timeInterval = setInterval(this.updateStats, 1000);
  },
  beforeUnmount() {
    // Clear the interval when the component is unmounted
    clearInterval(this.timeInterval);
  }
}).mount("#app");
