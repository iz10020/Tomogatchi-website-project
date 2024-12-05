import { reactive } from "vue";

const state = reactive({
  selectedCharacter: "kirby", // Default character
});

export function useCharacterStore() {
  return state;
}
