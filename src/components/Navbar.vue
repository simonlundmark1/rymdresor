<template>
    <nav>
      <div class="nav-items">
        <h2>Tidsresor</h2>
        <button class="hamburger" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <input type="text">
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
          Boka
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
      <CartWidget  v-if="isCartOpen" />
    </nav>
</template>  

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { useRoute } from "vue-router";
  import CartWidget from './CartWidget.vue';
  import '../style/components/Navbar.css';

  export default defineComponent({
    name: "Navbar",
    components: {
      CartWidget,
    },
    setup() {
      const route = useRoute();
      const isMenuOpen = ref(false);
      let isCartOpen = ref(false);

      const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;
      };

      const closeMenu = () => {
        isMenuOpen.value = false;
      };

      const openCartWidget = () => {
        isCartOpen.value = !isCartOpen.value;
      };

      return { route, isMenuOpen, toggleMenu, closeMenu, isCartOpen, openCartWidget, };
    },
  });





</script>


<style scoped>
  .cart-link {
    cursor: pointer;
  }

</style>