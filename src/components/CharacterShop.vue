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
    <!-- Replace the button with clickable text -->
    <p
      v-if="store.selectedCharacter"
      @click="goToTamagotchiDisplay"
      class="return-link"
    >
      Return to Tamagotchi
    </p>
  </div>
</template>

<script>
import { useCharacterStore } from "../stores/useCharacterStore";
import { useRouter } from 'vue-router';

export default {
  name: "CharacterShop",
  setup() {
    const store = useCharacterStore();
    const router = useRouter();

    const characters = [
      { name: "kirby", image: require("@/assets/kirbyidle.gif") },
      { name: "pengiun", image: require("@/assets/pengiunidle.gif") },
      { name: "cat", image: require("@/assets/catidle.gif") },
    ];

    function selectCharacter(name) {
      store.selectedCharacter = name;
    }

    function goToTamagotchiDisplay() {
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

.character-shop {
  text-align: center;
  background-image: url('@/assets/grassland.png');
  background-size: cover;
  background-position: center center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h2 {
  font-size: 3.5vh;
  font-weight: bold;
  color: black;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 2vh;
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

.return-link {
  margin-top: 20px;
  font-size: 2vh;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}

.return-link:hover {
  color: darkblue;
}
</style>
