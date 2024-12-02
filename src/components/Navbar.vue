<template>
    <nav>
      <div class="nav-items">
        <h2>Tidsresor</h2>
        <!-- Hamburger Icon -->
        <button class="hamburger" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <!-- Mobile Menu -->
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


<style scoped>
nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  color: white;
  animation: fadeIn 1s ease-in-out;
  position: relative;
}

.nav-items {
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 100;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background-color: white;
}

.nav-links.open {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: rgba(0, 0, 0, 0.9);
  padding: 1rem;
  width: 200px;
  border-radius: 0.5rem;
  animation: fadeIn 0.3s ease-in-out;
}

.nav-link {
  text-decoration: none;
  color: white;
}

.nav-link:hover {
  text-decoration: underline;
}

.active-link {
  text-decoration: underline;
  color: white;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-links {
    display: none;
  }
}

</style>