<template>
  <div class="custom-select">
    <select
      v-model="selectedOption"
      @change="$emit('update:modelValue', selectedOption.value)"
      class="select-input"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Option {
  value: string;
  text: string;
}

interface CustomSelectProps {
  options: Option[];
  modelValue: string;
  placeholder?: string;
}

export default defineComponent<CustomSelectProps>({ // Use defineComponent with the interface
  props: {
    options: {
      type: Array as () => Option[], // Use correct type assertion
      required: true,
    },
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'], // Explicitly define emitted events
  data() {
    return {
      selectedOption: this.options.find((option) => option.value === this.modelValue) || this.options[0],
    };
  },
  watch: {
    modelValue(newValue) {
        this.selectedOption = this.options.find(option => option.value == newValue) || this.options[0]
    }
  }
});
</script>
  
  <style scoped>
  .custom-select {
    position: relative;
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc; 
    appearance: none; /* Remove default arrow */
    background-color: white; /* Set background color */
    color: black; /* Set text color */
  }
  
  .select-input {
    width: 100%;
    padding: 0.5rem;
    border: none; 
    background-color: transparent; 
    -webkit-appearance: none; /* For Chrome and Safari */
    -moz-appearance: none; /* For Firefox */
    appearance: none; 
  }
  </style>