// stores/cart.js
import { defineStore } from 'pinia';
import { Plant } from '@/stores/plantService';

interface CartItem extends Plant {
  quantity: number;
}

export const useCartStore = defineStore('cart', {
  state: () => {
    const initialCart: CartItem[] = [];
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart).map((item: any) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
      initialCart.push(...parsedCart);
    }

    return {
      cartItems: initialCart,
    };
  },

  actions: {
    addToCart(product: Plant) {
      if (!product || !product.id) {
        console.error('Sản phẩm không hợp lệ hoặc thiếu ID:', product);
        return;
      }

      const existingItem = this.cartItems.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }
      this.saveCart();
    },

    removeFromCart(productId: number) {
      if (!productId) {
        console.error('ID sản phẩm không hợp lệ:', productId);
        return;
      }
      this.cartItems = this.cartItems.filter(item => item.id !== productId);
      this.saveCart();
    },

    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    },

    loadCart() {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cartItems = JSON.parse(savedCart).map((item: any) => ({
          ...item,
          quantity: item.quantity || 1,
        }));
      }
    },

    clearCart() {
      this.cartItems = [];
      this.saveCart();
    },
  },

  getters: {
    totalItems: (state): number => {
      return state.cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
    },

    totalPrice: (state): number => {
      return state.cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
    },
  },
});