<template>
  <nav class="nav-wrapper">
    <div class="nav-items">
      <router-link to="/" class="logo">
        <img src="/FRITTE.png" alt="Tidsresor Logo" title="Hem" />
      </router-link>
      <button class="hamburger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="search-input">
        <input
          type="text"
          v-if="route.path === '/'"
          v-on:keyup.enter="emitSearch"
          v-model="searchQuery"
          placeholder="Search..."
        />
      </div>
    </div>
    <div class="search-overlay" v-if="isSearchOpen">
      <div class="search-container">
        <Search @close="closeSearch" />
      </div>
    </div>
    <div class="nav-links" :class="{ open: isMenuOpen }">
      <i
        v-if="route.path === '/'"
        @click="openSearch"
        class="fa-brands fa-searchengin search-icon"
        title="Välj resa"
      ></i>
      <router-link
        class="nav-link"
        to="/"
        exact-active-class="active-link"
        @click="closeMenu"
        title="Hem"
        >Hem</router-link
      >
      <router-link
        class="nav-link"
        to="/packages"
        exact-active-class="active-link"
        @click="closeMenu"
        title="Paket"
        >Paket</router-link
      >
      <i
        @click="openCartWidget"
        title="Din resväska"
        class="fa-solid fa-suitcase-rolling bag-icon"
      ></i>
    </div>
    <CartWidget v-if="isCartOpen" @close="closeCartWidget" />
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import CartWidget from "./CartWidget.vue";
import Search from "./Search.vue";

export default defineComponent({
  name: "Navbar",
  components: {
    CartWidget,
    Search,
  },
  props: {
    onSearch: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const searchQuery = ref("");
    const route = useRoute();
    const isMenuOpen = ref(false);
    const isCartOpen = ref(false);
    const isSearchOpen = ref(false);

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const closeMenu = () => {
      isMenuOpen.value = false;
    };

    const emitSearch = () => {
      props.onSearch(searchQuery.value);
    };

    const openCartWidget = () => {
      isCartOpen.value = true;
    };
    const openSearch = () => {
      isSearchOpen.value = true;
    };

    const closeCartWidget = () => {
      isCartOpen.value = false;
    };
    const closeSearch = () => {
      isSearchOpen.value = false;
    };

    return {
      route,
      isMenuOpen,
      toggleMenu,
      closeMenu,
      emitSearch,
      searchQuery,
      isCartOpen,
      openCartWidget,
      closeCartWidget,
      openSearch,
      closeSearch,
      isSearchOpen,
    };
  },
});
</script>

<style scoped>
nav {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #def2f6;
  color: white;
  padding: 0;
  border-bottom: 2px solid #e6d7d8;
  position: fixed;
  z-index: 9999;
}

.nav-items {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1001;
}
.search-container {
  margin-top: 10rem;
  padding: 0 1rem;
  animation: slideDown 0.3s ease-in-out;
}

.nav-links {
  width: auto;
  margin-left: 50%;
  margin-right: 5rem;
  margin-top: 2.5rem;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2rem;
  font-weight: 700;
}
.search-icon {
  color: black;
}

.search-input {
  margin-left: -28rem; /* Adjusted to move the search field to the left */
  margin-top: 2.6rem;
}
.search-input input {
  height: 2rem;
  width: 20rem;
  border-radius: 6px;
  border: 1px solid #e2e5e7;
  padding-left: 0.5rem;
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

.search-icon {
  font-size: 24px;
  color: rgb(37, 36, 36);
  cursor: pointer;
}
.nav-link {
  text-decoration: none;
  color: rgb(37, 36, 36);
}

.nav-link:hover,
.active-link {
  text-decoration: underline;
}
.logo img {
  margin: 0 1rem;
  width: 40%;
  overflow: hidden;
  max-height: 20%;
}
.bag-icon {
  font-size: 32px;
  color: rgb(37, 36, 36);
  cursor: pointer;
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
