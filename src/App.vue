<template>
  <!-- Layout dinámico según la ruta actual -->
  <div :class="appWrapperClass">
    <!-- Overlay de carga global -->
    <div
      v-if="isLoading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75"
    >
      <div class="text-center text-white">
        <svg class="w-10 h-10 mx-auto mb-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p>Loading your data...</p>
      </div>
    </div>

    <!-- Sidebar solo si no estás en /auth -->
    <Sidebar v-if="!isAuthRoute" :is-open="mobileMenuOpen" @close="mobileMenuOpen = false" />

    <!-- Contenido principal -->
    <div class="flex flex-col flex-1 h-screen overflow-hidden">
      <!-- Mobile top bar -->
      <div v-if="!isAuthRoute" class="flex items-center flex-shrink-0 gap-3 px-4 bg-gray-900 border-b border-gray-800 lg:hidden h-14">
        <button class="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors" @click="mobileMenuOpen = !mobileMenuOpen">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 class="flex-1 text-sm font-semibold text-white">{{ routeTitle }}</h1>
      </div>

      <div
        v-if="!isAuthRoute"
        class="flex-1 overflow-y-auto"
      >
        <router-view />
      </div>

      <!-- Renderizar AuthView directamente si estás en /auth -->
      <router-view v-if="isAuthRoute" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watch, ref } from 'vue';
import { useUserStore } from './store/user';
import { useTransactionStore } from './store/transactions';
import { useBudgetStore } from './store/budgets';
import Sidebar from './components/Sidebar.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const isAuthRoute = computed(() => 
  route.path.includes('/auth') || 
  route.path.includes('/reset-password')
);

const mobileMenuOpen = ref(false);

const routeTitle = computed(() => {
  const names: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/transactions': 'Transactions',
    '/budgets': 'Budgets',
    '/stats': 'Stats',
  };
  return names[route.path] ?? '';
});


const userStore = useUserStore();
const transactionStore = useTransactionStore();
const budgetStore = useBudgetStore();

const isLoading = computed(() => userStore.isLoading || transactionStore.isLoading || budgetStore.isLoading);

const appWrapperClass = computed(() => {
  return isAuthRoute.value
    ? 'w-screen h-screen overflow-hidden' // Auth ocupa todo, sin layout
    : 'flex min-h-screen w-full bg-gray-100'; // Layout general
});

onMounted(async () => {
  console.log('App mounted, initializing user...');
  await userStore.initialize();
  
  // After user is initialized, load data if user is authenticated or in guest mode
  if (userStore.user || userStore.isGuestMode) {
    console.log('Loading data for', userStore.isGuestMode ? 'guest user' : 'authenticated user');
    await Promise.all([
      transactionStore.loadTransactions(),
      budgetStore.loadBudgets()
    ]);
    console.log('Data loaded:', {
      transactions: transactionStore.transactions.length,
      budgets: budgetStore.budgets.length
    });
  }
  
  // Redirect to appropriate route if at root
  if (route.path === '/') {
    if (userStore.user || userStore.isGuestMode) {
      router.push('/dashboard');
    } else {
      router.push('/auth');
    }
  }
});

// Watch for changes in authentication state
watch(() => userStore.user, async (newUser) => {
  if (newUser || userStore.isGuestMode) {
    console.log('User state changed, reloading data');
    await Promise.all([
      transactionStore.loadTransactions(),
      budgetStore.loadBudgets()
    ]);
  }
});
</script>
