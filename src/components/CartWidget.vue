<script setup lang="ts">
    import { ref } from 'vue';

    interface CartItem {
        id: number;
        name: string;
        price: number;
        quantity: number;
    }

    const cartItems = ref<CartItem[]>([]);

    const removeFromCart = (id: number) => {
        cartItems.value = cartItems.value.filter(item => item.id !== id);
    }

    const addToCart = (id: number) => {
        const item = cartItems.value.find(item => item.id === id);
        if (item) {
            item.quantity++;
        }
    }

    const clearCart = () => {
        cartItems.value = [];
    }

    const CheckoutCart = () => {
        console.log('Checkout', cartItems.value);
    }

</script>

<template>
    <section class="cartWrapper">
        <h1>Cart</h1>
        <ul>
            <!-- <li v-for="item in cartItems" :key="item.id">
                <span>{{ item.name }}</span>
                <span>{{ item.price }}</span>
                <span>{{ item.quantity }}</span>
                <button @click="removeFromCart(item.id)">-</button>
                <button @click="addToCart(item.id)">+</button>
            </li> -->
        </ul>
        <button @click="clearCart">Clear Cart</button>

        <button @click="CheckoutCart">Checkout</button>
    </section>
</template>

<style scoped>
    .cartWrapper {
        height: 500px;
        width: 300px;
        background-color: red;
        position: absolute;
        top: 100px;
        right: 100px;
    }
</style>