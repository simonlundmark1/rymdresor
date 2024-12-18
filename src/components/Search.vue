<template>
  <div class="booking-form-container">
    <form @submit.prevent="submitBooking" class="booking-form">
      <button class="close-btn" @click="closeSearch" title="Stäng">x</button>
      <div v-for="(label, key) in formFields" :key="key" class="input-column">
        <label :for="key">{{ label }}</label>
        <select :id="key" v-model="formData[key]" class="combined-select">
          <option
            v-for="option in options[key]"
            :key="option.value"
            :value="option.value"
            :disabled="option.disabled"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? "Laddar..." : "Visa resultat" }}
      </button>
    </form>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

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

const formData = reactive({
  destination: "",
  days: "",
  adults: "",
  children: "",
});

const formFields = {
  destination: "Destination",
  days: "Resedagar:",
  adults: "Antal Vuxna:",
  children: "Antal Barn:",
};

const options: Options = {
  destination: [
    { value: "", text: "Välj Destination", disabled: true },
    { value: "Renässansen", text: "Renässansen" },
    { value: "Vikingatiden", text: "Vikingatiden" },
    { value: "Franska", text: "Franska revolutionen" },
    { value: "Juraperioden", text: "Juraperioden" },
    { value: "Egypten", text: "Antikens Egypten" },
    { value: "Gävle", text: "Bränn Gävlebocken" },
    { value: "9/11", text: "9/11" },
    { value: "Neo", text: "Neo-Utopia" },
    { value: "2006", text: "Jul 2006" },
    { value: "Strutskriget", text: "Strutskriget" },
  ],
  days: [
    { value: "", text: "Välj dagar", disabled: true },
    { value: "5", text: "5 dagar" },
    { value: "7", text: "7 dagar" },
    { value: "10", text: "10 dagar" },
    { value: "11", text: "11 dagar" },
    { value: "12", text: "12 dagar" },
    { value: "14", text: "14 dagar" },
    { value: "21", text: "21 dagar" },
  ],
  adults: [
    { value: "", text: "Välj vuxna", disabled: true },
    { value: "1", text: "1 vuxen" },
    { value: "2", text: "2 vuxna" },
    { value: "3", text: "3 vuxna" },
    { value: "4", text: "4 vuxna" },
  ],
  children: [
    { value: "", text: "Välj barn", disabled: true },
    { value: "0", text: "Inga barn" },
    { value: "1", text: "1 barn" },
    { value: "2", text: "2 barn" },
    { value: "3", text: "3 barn" },
    { value: "4", text: "4 barn" },
  ],
};

const results = ref<any[]>([]);
const loading = ref(false);
const errorMessage = ref("");
const submitted = ref(false);

const submitBooking = async () => {
  loading.value = true;
  const { destination, days, adults, children } = formData;

  if (destination && days && adults && children) {
    try {
      // Navigera till secondBookingPage med query params
      router.push({
        name: "secondBookingPage", // eller en route som du har definierat
        query: {
          destination,
          days,
          adults,
          children,
        },
      });
    } catch (error) {
      console.error("Failed to navigate:", error);
    }
  } else {
    alert("Fyll i alla fält innan du går vidare!");
  }
};

const emit = defineEmits<{
  (e: "close"): void;
}>();

const closeSearch = () => {
  emit("close");
};
</script>

<style scoped>
.combined-select {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 0.5rem;
}

.booking-form-container {
  padding: 0.5rem;
  background-color: rgb(222, 242, 246);
  border-radius: 1rem;
  color: black;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  z-index: 1000;
}

.booking-form {
  display: flex;
  /* flex-wrap: wrap; */
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

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}
</style>
