import { defineStore } from 'pinia';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  days: number;
  passengers: {
    adults: number;
    children: number;
  };
  discount?: string;
  departureDate?: string;
  extras?: {
    insurance: boolean;
    guide: boolean;
    equipment: boolean;
  };
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),

  getters: {
    totalPrice: (state) => {
      return state.items.reduce((total, item) => total + item.price, 0);
    },
    
    itemCount: (state) => {
      return state.items.reduce((count, item) => 
        count + item.passengers.adults + (item.passengers.children || 0), 0
      );
    }
  },

  actions: {
    addToCart(item: CartItem) {
      const existingItem = this.items.find(i => 
        i.id === item.id && 
        i.departureDate === item.departureDate &&
        i.days === item.days &&
        JSON.stringify(i.extras) === JSON.stringify(item.extras) &&
        JSON.stringify(i.passengers) === JSON.stringify(item.passengers)
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
        existingItem.price += item.price;
      } else {
        this.items.push(item);
      }
    },

    removeFromCart(itemId: number) {
      const index = this.items.findIndex(item => item.id === itemId);
      if (index > -1) {
        this.items.splice(index, 1);
      }
    },

    updateQuantity(itemId: number, quantity: number) {
      const item = this.items.find(item => item.id === itemId);
      if (item) {
        const pricePerUnit = item.price / item.quantity;
        item.quantity = quantity;
        item.price = pricePerUnit * quantity;
      }
    },

    clearCart() {
      this.items = [];
    }
  }
});
