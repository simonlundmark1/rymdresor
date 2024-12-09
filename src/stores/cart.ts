import { defineStore } from 'pinia';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    totalQuantity: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0),
  },
  actions: {
    addToCart(item: CartItem) {
      const existingItem = this.items.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        this.items.push(item);
      }
    },
    removeFromCart(itemId: number) {
      this.items = this.items.filter((item) => item.id !== itemId);
    },
    clearCart() {
      this.items = [];
    },
  },
  persist: true, // Enable persistence
});

// Enable the plugin
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
