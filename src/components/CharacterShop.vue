<template>
  <div class="character-shop">
    <h2>Select Your Character</h2>
    <div class="characters">
      <img
        v-for="character in characters"
        :key="character.name"
        :src="character.image"
        :alt="character.name"
        class="character-image"
        @click="selectCharacter(character.name)"
      />
    </div>
    <!-- Add a button to go to TamagotchiDisplay -->
    <button
      v-if="store.selectedCharacter"
      @click="goToTamagotchiDisplay"
      class="select-button"
    >
      Go Back to Tamagotchi
    </button>
  </div>
</template>

<script>
import { useCharacterStore } from "../stores/useCharacterStore";
import { useRouter } from 'vue-router';  // Import useRouter

export default {
  name: "CharacterShop",
  setup() {
    const store = useCharacterStore();
    const router = useRouter();  // Initialize router

    const characters = [
      { name: "kirby", image: require("@/assets/kirbyidle.gif") },
      { name: "pengiun", image: require("@/assets/pengiunidle.gif") },
      { name: "cat", image: require("@/assets/catidle.gif") },
    ];

    function selectCharacter(name) {
      store.selectedCharacter = name; // Update shared state with selected character
    }

    function goToTamagotchiDisplay() {
      // Use router.push to navigate to the TamagotchiDisplay
      router.push({ name: "Home" });
    }

    return {
      characters,
      selectCharacter,
      store,
      goToTamagotchiDisplay,
    };
  },
};
</script>

<style scoped>
.character-shop {
  text-align: center;
}
.characters {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.character-image {
  width: 100px;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.character-image:hover {
  transform: scale(1.1);
}
.select-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.select-button:hover {
  background-color: #45a049;
}
</style>
