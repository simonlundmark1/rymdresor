<template>
  <nav>
    <div class="nav-items">
      <router-link to="/" class="logo">
        <img src="/public/FRITTE.png" alt="Tidsresor Logo" />
      </router-link>
      <button class="hamburger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="search-input">
        <input
          type="text"
          v-on:keyup.enter="searchForExperience"
          v-model="searchQuery"
          placeholder="Sök resa..."
        />
      </div>
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
        to="/packages"
        exact-active-class="active-link"
        @click="closeMenu"
      >
        Paket
      </router-link>
      <p @click="openCartWidget" class="cart-link">Cart</p>
    </div>
    <CartWidget v-if="isCartOpen" />
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import CartWidget from "./CartWidget.vue";

export default defineComponent({
  name: "Navbar",
  props: {
    onSearch: {
      type: Function,
      required: true,
    },
  },
  components: {
    CartWidget,
  },
  setup(props) {
    const searchQuery = ref("");
    const route = useRoute();
    const isMenuOpen = ref(false);
    let isCartOpen = ref(false);

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
      isCartOpen.value = !isCartOpen.value;
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
    };
  },
});
</script>

<style scoped>
nav {
    width: 100%;
    display: flex;
    align-items: center;
    background-color:#DEF2F6;
    color: white;
    animation: fadeIn 1s ease-in-out;
    padding: 0,5rem;
    border-bottom: 2px solid #E6D7D8;
  }
  
  .nav-items {
    display: flex;
    align-items: center;
    
  }
  
  .nav-links {
    width: auto;
    margin-left: 50%;
    margin-top: 2.5rem;
    display: flex;
    flex-direction: row;
  gap: 2rem;
  }
  
  .search-input {
    margin-left: -28rem; /* Adjusted to move the search field to the left */
    margin-top: 2.6rem;
  }
  .search-input input {
  height: 2rem;
  width: 20rem;
  border-radius: 6px;
  border: 1px solid #E2E5E7;
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
  
  .nav-link {
    text-decoration: none;
    color: rgb(0, 0, 0);
  }
  
  .nav-link:hover,
  .active-link {
    text-decoration: underline;
  }
  .logo img {
    margin-left: 1rem;
    width: 40%;
    overflow: hidden;
    max-height: 20%;
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
  

.cart-link {
  cursor: pointer;
}
</style>
