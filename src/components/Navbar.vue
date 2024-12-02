<template>
    <nav>
      <div class="nav-items">
        <h2>Tidsresor</h2>
        <button class="hamburger" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="nav-links" :class="{ open: isMenuOpen }">
        <router-link
          class="nav-link"
          to="/"
          exact-active-class="active-link"
          @click="closeMenu"
        >
          Hem
        </router-link>
        <router-link
          class="nav-link"
          to="/booking"
          exact-active-class="active-link"
          @click="closeMenu"
        >
          Boka Upplevelse
        </router-link>
        <router-link
          class="nav-link"
          to="/packages"
          exact-active-class="active-link"
          @click="closeMenu"
        >
          Paket Erbjudanden
        </router-link>
      </div>
    </nav>
</template>  

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import '../style/components/navbar.css';

export default defineComponent({
  name: "Navbar",
  setup() {
    const route = useRoute();
    const isMenuOpen = ref(false);

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const closeMenu = () => {
      isMenuOpen.value = false;
    };

    return { route, isMenuOpen, toggleMenu, closeMenu };
  },
});
</script>