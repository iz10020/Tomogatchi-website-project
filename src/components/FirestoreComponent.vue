<template>
    <div>
      <h1>Documents from Firestore</h1>
  
      <!-- Lijst met documenten -->
      <ul v-if="docs.length">
        <li v-for="doc in docs" :key="doc.id">
          {{ doc.data().id }} - {{ doc.data().test }}
        </li>
      </ul>
      <p v-else>No documents found.</p>
  
      <!-- Formulier om nieuwe documenten toe te voegen -->
      <div>
        <input
          v-model="newDoc.id"
          type="text"
          placeholder="Enter ID"
        />
        <input
          v-model="newDoc.test"
          type="text"
          placeholder="Enter test value"
        />
        <button @click="addDoc">Add Document</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { db, getDocs, collection, setDoc, doc } from '../firebase';
  
  export default {
    name: 'FirestoreComponent',
    setup() {
      const docs = ref([]); // Voor het opslaan van de documenten
      const newDoc = ref({ id: '', test: '' }); // Voor het toevoegen van nieuwe documenten
  
      // Haal documenten op wanneer de component geladen wordt
      const getDocsFromFirestore = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'testCollection')); // Vervang 'testCollection' door je collectie
          docs.value = querySnapshot.docs;
        } catch (error) {
          console.error("Error getting documents: ", error);
        }
      };
  
      // Voeg een nieuw document toe aan Firestore
      const addDoc = async () => {
        if (newDoc.value.id && newDoc.value.test) {
          try {
            const docRef = doc(collection(db, 'testCollection')); // Genereer een nieuw document
            await setDoc(docRef, {
              id: newDoc.value.id,
              test: newDoc.value.test
            });
            // Herlaad de documenten na toevoegen
            getDocsFromFirestore();
            // Reset het formulier
            newDoc.value.id = '';
            newDoc.value.test = '';
          } catch (error) {
            console.error("Error adding document: ", error);
          }
        } else {
          alert("Both fields are required!");
        }
      };
  
      onMounted(() => {
        getDocsFromFirestore();
      });
  
      return { docs, newDoc, addDoc };
    }
  };
  </script>
  
  <style scoped>
  /* Voeg hier je eigen stijlen toe */
  input {
    margin-right: 10px;
    padding: 5px;
  }
  button {
    padding: 5px 10px;
    cursor: pointer;
  }
  </style>
  