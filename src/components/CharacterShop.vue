<template>
    <div class="shop-container">
      <h2>Select Your Tamagotchi Character</h2>
      <div class="character-options">
        <div 
          v-for="(image, index) in characterImages" 
          :key="index" 
          class="character-option"
          @click="selectCharacter(image)"
        >
          <img :src="image" alt="Tamagotchi Character" class="character-image" />
        </div>
      </div>
      <button @click="closeShop" class="close-shop">Close Shop</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentCharacter: String,
    },
    data() {
      return {
        characterImages: [
          require('@/assets/kirbyidle.gif'),
          require('@/assets/pengiunidle.gif'),
          require('@/assets/catidle.gif'),
          // Add more characters here
        ],
      };
    },
    methods: {
  selectCharacter(image) {
    this.$emit('character-selected', image);
  },
  closeShop() {
    // Navigate to the desired route when the shop is closed
    this.$router.push({ name: 'Home' }); // Replace 'home' with the route name you want to navigate to
  },
},
  };
  </script>
  
  <style scoped>
  .shop-container {
    text-align: center;
    padding: 20px;
  }
  
  .character-options {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  .character-option {
    cursor: pointer;
  }
  
  .character-image {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    transition: transform 0.2s;
  }
  
  .character-image:hover {
    transform: scale(1.1);
  }
  
  .close-shop {
    margin-top: 10px;
    padding: 10px;
    background-color: #333;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>
  