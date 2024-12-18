<template>
  <section class="cart-wrapper" v-if="cartStore.items.length > 0">
    <div class="cart-header">
      <h2>Din resväska</h2>
      <button class="close-btn" @click="closeCart" title="Stäng">x</button>
    </div>
    
    <div class="cart-items">
      <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
        <div class="item-header">
          <h3>{{ item.name }}</h3>
          <button class="remove-btn" @click="cartStore.removeFromCart(item.id)" title="Ta bort">Ta bort</button>
        </div>
        
        <div class="item-details">
          <p class="departure-date">Avresa: {{ item.departureDate ? formatDate(item.departureDate) : 'Datum ej tillgängligt' }}</p>
          <p>Antal dagar: {{ item.days }}</p>
          <div class="passengers-info">
            <p>Resenärer:</p>
            <ul class="passenger">
              <li>{{ item.passengers.adults }} vuxna</li>
              <li v-if="item.passengers.children">{{ item.passengers.children }} barn</li>
            </ul>
          </div>
          
          <div v-if="item.extras" class="extras">
            <p class="extras-title">Tillägg:</p>
            <ul>
              <li v-if="item.extras.insurance">Tidsreseförsäkring</li>
              <li v-if="item.extras.guide">Personlig tidsguide</li>
              <li v-if="item.extras.equipment">Tidsenlig utrustning</li>
            </ul>
          </div>

          <div class="price-info">
            <div v-if="item.discount" class="price-details">
              <p class="original-price">Ordinarie: {{ formatPrice(calculateOriginalPrice(item)) }}</p>
              <p class="discount-badge">{{ item.discount }}</p>
              <p class="final-price">Nu: {{ formatPrice(item.price) }}</p>
            </div>
            <div v-else>
              <p class="item-price">{{ formatPrice(item.price) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="cart-footer">
      <div class="total">
        <span>Totalt:</span>
        <span class="total-price">{{ formatPrice(cartStore.totalPrice) }}</span>
      </div>
      
      <div class="cart-actions">
        <button class="clear-btn" @click="cartStore.clearCart" title="Töm resväska">Töm resväskan</button>
        <RouterLink to="/checkout" class="checkout-btn" @click="$emit('close')" title="Gå till kassan">
          Gå till kassan
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart';
import { RouterLink } from 'vue-router'

const cartStore = useCartStore();

const formatPrice = (price: number) => {
  return `${price.toLocaleString()} kr`;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const calculateOriginalPrice = (item: any) => {
  if (!item.discount) return item.price;
  const discountPercent = Number(item.discount.match(/(\d+)%/)[1]);
  return Math.round(item.price / (1 - discountPercent / 100));
};

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const closeCart = () => {
  emit('close');
};
</script>

<style scoped>
.cart-wrapper {
  position: fixed;
  top: 80px;
  right: 20px;
  width: 400px;
  max-height: calc(100vh - 100px);
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: #333;
  display: flex;
  flex-direction: column;
  z-index: 1000;
}

.cart-header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.cart-items {
  padding: 1rem;
  overflow-y: auto;
  flex-grow: 1;
}

.cart-item {
  background: #f9f9f9;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.item-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.remove-btn {
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  font-size: 0.9rem;
}

.item-details {
  font-size: 0.9rem;
}

.departure-date {
  color: #666;
  margin-bottom: 0.5rem;
}

.passenger {
  list-style: none;
}

.extras {
  margin: 0.5rem 0;
}

.extras-title {
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.extras ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.extras li {
  color: #666;
  font-size: 0.85rem;
}

.price-info {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.price-details {
  text-align: right;
}

.original-price {
  color: #666;
  text-decoration: line-through;
  margin: 0;
  font-size: 0.85rem;
}

.discount-badge {
  background: #e82e11;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: bold;
  margin: 0.25rem 0;
  display: inline-block;
}

.final-price {
  color: #07700e;
  font-weight: bold;
  margin: 0;
}

.item-price {
  text-align: right;
  font-weight: bold;
  margin: 0;
}

.cart-footer {
  padding: 1rem;
  border-top: 1px solid #eee;
  background: #f9f9f9;
  border-radius: 0 0 8px 8px;
}

.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: bold;
}

.total-price {
  font-size: 1.2rem;
  color: #4CAF50;
}

.cart-actions {
  display: flex;
  gap: 1rem;
}

.clear-btn,
.checkout-btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.2s;
}

.clear-btn {
  background: #f0f0f0;
  color: #666;
}

.checkout-btn {
  background: #4CAF50;
  color: white;
}

.clear-btn:hover {
  background: #e0e0e0;
}

.checkout-btn:hover {
  background: #45a049;
}

@media (max-width: 480px) {
  .cart-wrapper {
    width: calc(100% - 40px);
    max-height: calc(100vh - 120px);
  }
}
</style>