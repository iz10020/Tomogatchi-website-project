<template>
    <div>
      <form @submit.prevent="saveData">
        <input v-model="dataField" type="text" placeholder="Enter some data" />
        <button type="submit">Save</button>
      </form>
    </div>
  </template>
  
  <script>
  import { db, collection, setDoc, doc } from '@/firebase.js';  // Import your Firestore instance
  
  export default {
    data() {
      return {
        dataField: "",  // Bind to the input
      };
    },
    methods: {
      async saveData() {
        try {
          // Add data to Firestore (you can specify your collection name)
          const docRef = doc(collection(db, 'testCollection')); // Genereer een nieuw document
          await setDoc(docRef, {
            // id: newDoc.value.id,
            test: this.dataField
          });
          console.log('Data saved successfully!');
          this.dataField = ""; // Clear input after saving
        } catch (error) {
          console.error('Error saving data: ', error);
        }
      }
    }
  };
  </script>
  