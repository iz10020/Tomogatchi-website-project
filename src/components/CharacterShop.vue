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
    
    <!-- Display the name of the selected character -->
    <p v-if="store.selectedCharacter" class="selected-character-text">
      You have selected: {{ store.selectedCharacter }}
    </p>

    <!-- Text "Return to Tamagotchi" with a button underneath -->
    <p v-if="store.selectedCharacter" class="return-text">
      Return to Tamagotchi
    </p>
    <img
      v-if="store.selectedCharacter"
      src="@/assets/backbutton.png"
      alt="Return Button"
      class="return-button"
      @click="goToTamagotchiDisplay"
    />
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
  background-image: url('@/assets/shoppage.png');  /* Replace with your background image */
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

/* Style for the selected character's text */
.selected-character-text {
  margin-top: 20px;
  font-size: 2vh;
  color: white;  /* White text to contrast with the background */
  font-weight: bold;
}

/* Style for the return text */
.return-text {
  margin-top: 20px;
  font-size: 2vh;
  color: white;  /* White text to contrast with the background */
}

/* Style for the return image button */
.return-button {
  margin-top: 10px;
  width: 150px;
  cursor: pointer;
}

.return-button:hover {
  transform: scale(1.1);
}
</style>
