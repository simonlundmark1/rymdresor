<template>
  <div class="package-hero">
    <Navbar/>
    <h2>Paket Erbjudanden</h2>
    <div v-for="pkg in pkgs" :key="pkg.id" class="pkg-card">
      <h3>{{ pkg.title }}</h3>
      <p>{{ pkg.description }}</p>
      <button @click="bookPkg(pkg.id)">Boka</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '../components/Navbar.vue';

export default defineComponent({
  name: 'PackagePage',
  components: {
    Navbar
  },
  data() {
    return {
      pkgs: [
        {
          id: 1,
          title: 'Månresa Deluxe',
          description: 'Inkluderar månpromenad och lyxigt boende på månstationen.'
        },
        {
          id: 2,
          title: 'Mars Expedition',
          description: 'Utforska Mars yta med vårt specialteam av astronauter.'
        },
        {
          id: 3,
          title: 'Omloppsäventyr',
          description: 'Upplev viktlöshet och fantastisk utsikt över jorden.'
        }
      ]
    };
  },
  methods: {
    bookPkg(id: number) {
      // Här kan du lägga till logik för bokning
      this.$router.push('/booking');
    }
  }
});
</script>

<style scoped>
.package-hero{
  background-image: url('/john-towner-7rlIPXTR6OI-unsplash.jpg');
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}
.pkg-card {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
}
</style>
