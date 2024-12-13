<template>
  <div
       v-for="(experience, index) in combinedList"
    :key="experience.id"
    :data-ref="'experience-' + index"
    class="experience-card"
    :style="getBackgroundStyle(experience.image)"
      >
      <h2>{{ experience.title }}</h2>
      <p>{{ experience.description }}</p>
      <button @click="bookPkg(experience.id)">Utforska</button>
  </div>
</template>



<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SpaceExperienceList',
  props: {
  combinedList: {
  type: Array as () => Array<{ id: number; title: string; description: string; image: string | string[]; price: number }>,
  required: true,
}

  },
  methods: {
    bookPkg(id: number) {
      this.$router.push({ name: "booking", params: { id } });
    },
    viewDetails(id: number) {
      this.$router.push(`/experience/${id}`);
    },
getBackgroundStyle(image: string | string[] | null) {
  let imageUrl = null;

  // Check if the image is an array and has elements
  if (Array.isArray(image) && image.length > 0) {
    imageUrl = image[0]; // Use the first image in the array
  } else if (typeof image === 'string') {
    imageUrl = image; // Use the image directly if it's a string
  }

  if (imageUrl) {
    return {
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }
  return {
    height: '200px', // Default height if no image is available
    backgroundColor: '#f0f0f0', // Default background color
    borderRadius: '8px',
  };
}

  },
});
</script>

<style scoped>
.experience-card {
  position: relative;
  padding: 20px; /* Add some padding for better spacing */
  margin: 0;
  height: 90vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  z-index: 10;
  color: white; /* Default text color */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); /* Text shadow for better visibility */
}

.experience-card h2,
.experience-card p {
  z-index: 20; /* Ensure text stays above other elements */
  text-align: center; /* Center the text */
}

.experience-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent dark overlay */
  z-index: 0; /* Place below the button and text */
  border-radius: 8px;
}

p{
  font-size: 30px;
}
  h2{
    font-size: 60px;
  }
 button {
  position: relative; /* Ensure it appears above the overlay */
  color: white; /* Text color */
  padding: 12px 30px; /* Adjust padding */
  font-size: 18px; /* Increase font size for readability */
  background: linear-gradient(45deg, #4CAF50, #2E7D32); /* Modern gradient background */
  border: none; /* Remove default border */
  border-radius: 50px; /* Circular shape for a sleek look */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); /* Add a soft shadow */
  transition: all 0.3s ease; /* Smooth hover animations */
  cursor: pointer; /* Pointer cursor on hover */
  text-transform: uppercase; /* Modern text styling */
  font-weight: bold; /* Emphasize text */
}

button:hover {
  background: linear-gradient(45deg, #2E7D32, #4CAF50); /* Reverse gradient on hover */
  transform: translateY(-3px); /* Lift effect on hover */
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.3); /* Enhanced shadow on hover */
}

button:focus {
  outline: none; /* Remove focus outline */
  box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.5); /* Add a focus ring */
}

button:active {
  transform: translateY(1px); /* Pressed-down effect */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Reduced shadow on click */
}


</style>
