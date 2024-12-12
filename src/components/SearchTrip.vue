<template>
        <div class="booking-form-container">
          <form @submit.prevent="submitBooking" class="booking-form">
            <div v-for="(label, key) in formFields" :key="key" class="input-column">
              <label :for="key">{{ label }}</label>
              <select :id="key" v-model="formData[key]" class="combined-select">
                <option v-for="option in options[key]" :key="option.value" :value="option.value" :disabled="option.disabled">{{ option.text }}</option>
              </select>
            </div>
            <button type="submit" :disabled="loading">
              {{ loading ? "Laddar..." : "Visa resultat" }}
            </button>
          </form>
          <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        </div>
        <div v-if="results.length">
          <h3>Resultat:</h3>
          <ul>
            <li v-for="result in results" :key="result.date">
              Datum: {{ result.date }} - Pris: {{ result.price }} SEK
            </li>
          </ul>
        </div>
        <div v-else-if="!loading && submitted">
          <p>Inga resultat hittades. Vänligen justera din sökning.</p>
        </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  interface Option {
    value: string;
    text: string;
    disabled?: boolean;
  }
  
  interface Options {
    destination: Option[];
    days: Option[];
    adults: Option[];
    children: Option[];
  }
  
  export default defineComponent({
    name: 'SearchTrip',
    data() {
      return {
        formData: {
          destination: '',
          days: '',
          adults: '',
          children: '',
        },
        results: [] as any[],
        searchTerm: '',
        formFields: {
          destination: 'Destination',
          days: 'Resedagar:',
          adults: 'Antal Vuxna:',
          children: 'Antal Barn:',
        },
        options: {
          destination: [
            { value: '', text: 'Välj Destination', disabled: true },
            { value: '1', text: 'Bränn Gävlebocken' },
            { value: '2', text: '9/11' },
            { value: '3', text: 'Neo-Utopia' },
            { value: '4', text: 'Jul 2006' },
            { value: '5', text: 'Ölsvämning i London' },
            { value: '6', text: 'Strutskriget' },
            { value: '7', text: 'Renässansen' },
          ],
          days: [
            { value: '', text: 'Välj dagar', disabled: true },
            { value: '5', text: '5 dagar' },
            { value: '7', text: '7 dagar' },
            { value: '10', text: '10 dagar' },
            { value: '11', text: '11 dagar' },
            { value: '12', text: '12 dagar' },
            { value: '14', text: '14 dagar' },
            { value: '21', text: '21 dagar' },
          ],
          adults: [
            { value: '', text: 'Välj vuxna', disabled: true },
            { value: '1', text: '1 vuxen' },
            { value: '2', text: '2 vuxna' },
            { value: '3', text: '3 vuxna' },
            { value: '4', text: '4 vuxna' },
          ],
          children: [
            { value: '', text: 'Välj barn', disabled: true },
            { value: '0', text: 'Inga barn' },
            { value: '1', text: '1 barn' },
            { value: '2', text: '2 barn' },
            { value: '3', text: '3 barn' },
            { value: '4', text: '4 barn' },
          ],
        } as Options,
        loading: false, // Add missing property
        errorMessage: '', // Add missing property
        submitted: false, // Add missing property
      };
    },
    methods: {
      async submitBooking() {
        this.loading = true; // Example usage
        const { destination, days, adults, children } = this.formData;
        if (destination && days && adults && children) {
          try {
            const res = await fetch('/src/data/data.json');
            const data = await res.json();
            this.results = data.experiences.flatMap((exp: any) =>
              exp.availableTrips.filter((trip: any) => {
                return (
                  trip.durationDays === parseInt(days) &&
                  trip.adults >= parseInt(adults) &&
                  trip.children >= parseInt(children)
                );
              })
            );
            this.submitted = true;
          } catch (error) {
            this.errorMessage = 'Failed to fetch booking data';
            console.error(error);
          } finally {
            this.loading = false;
          }
        }
      },
      handleSearch(searchTerm: string) {
        this.searchTerm = searchTerm;
        console.log('Searching for:', searchTerm);
      },
    },
  });
  </script>
  
  
  <style scoped>
  
  .combined-select {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    border-radius: 0.5rem;
  }
  
  .booking-form-container {
    padding: 1rem;
    background-color: rgb(222, 242, 246);
    border-radius: 1rem;
    color: black;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    z-index: 1000;
    width: 80rem;
  }
  
  .booking-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    width: 100%;
  }
  
  .input-column {
    flex: 1;
    min-width: 10rem;
  }
  
  select {
    background-color: white;
    color: black;
  }
  
  button {
    height: 3rem;
    padding: 0 1.6rem;
    border-radius: 2rem;
    background: none;
    border: none;
    background-color: red;
    font-size: large;
    color: white;
    cursor: pointer;
  }
  
  button:hover {
    background-color: darkred;
  }
  </style>
  