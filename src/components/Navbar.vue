<template>
    <nav>
        <div class="nav-items">
            <h2>Rymdresor</h2>
        </div>
        <div class="nav-items">
            <router-link
                class="nav-link"
                to="/"
                exact-active-class="active-link"
            >
                Hem
            </router-link>
            <router-link
                class="nav-link"
                to="/booking"
                exact-active-class="active-link"
            >
                Boka Upplevelse
            </router-link>
            <router-link
                class="nav-link"
                to="/packages"
                exact-active-class="active-link"
            >
                Paket Erbjudanden
            </router-link>
        </div>
    </nav>

</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'Navbar',
    setup() {
        const route = useRoute();
        return { route };
    }
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
}
.nav-items {
    padding: 0 2rem;
    display: flex;
    justify-content: space-evenly;
    gap: 1rem;
}

.nav-link {
    text-decoration: none;
    color: white;
}
.nav-link:hover{
    text-decoration: underline;
}
.active-link {
    text-decoration: underline;
    color: white;
}
</style>