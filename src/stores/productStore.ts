import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as any[],  // 存儲商品列表
    editingProduct: null as any | null,  // 存儲當前編輯的商品
    cartProducts: [] as any[],  // 存儲購物車商品
  }),

  getters: {
    getProducts: (state) => state.products,  // 獲取商品列表
    getEditingProduct: (state) => state.editingProduct,  // 獲取正在編輯的商品
    getCartProducts: (state) => state.cartProducts,  // 獲取購物車商品
  },

  actions: {
    // 設置商品列表
    setProducts(products: any[]) {
      this.products = products;
    },

    // 設置正在編輯的商品
    setEditingProduct(product: any) {
      this.editingProduct = product;
    },

    // 設置購物車商品
    addToCart(product: any) {
      this.cartProducts.push(product);
    },

    // 從購物車中移除商品
    removeFromCart(productId: number) {
      this.cartProducts = this.cartProducts.filter(product => product.id !== productId);
    },

    // 清空購物車
    clearCart() {
      this.cartProducts = [];
    },

    // 清空商品列表
    clearProducts() {
      this.products = [];
    },

    // 清空正在編輯的商品
    clearEditingProduct() {
      this.editingProduct = null;
    },
  },
});
