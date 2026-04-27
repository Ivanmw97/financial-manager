<template>
  <!-- Backdrop for mobile -->
  <div
    v-if="isOpen"
    class="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50"
    @click="$emit('close')"
  ></div>

  <!-- Sidebar -->
  <div :class="[
    'fixed lg:relative h-screen w-64 bg-gray-900 text-white flex flex-col shadow-xl transition-transform duration-300 z-40',
    isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
  ]">
    <!-- Logo -->
    <div class="p-6 border-b border-gray-800">
      <div class="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
        </svg>
        <div>
          <span class="text-blue-500 font-bold text-xl">Financial</span>
          <span class="text-white font-medium text-xl">Manager</span>
        </div>
      </div>
    </div>

    <!-- Menu -->
    <nav class="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
      <div class="flex items-center gap-2 px-2 mb-4">
        <div class="h-px bg-gray-800 flex-grow"></div>
        <p class="text-gray-400 text-xs font-medium">MENU</p>
        <div class="h-px bg-gray-800 flex-grow"></div>
      </div>
      <SidebarItem :icon="LayoutDashboard" label="Dashboard" to="/dashboard" />
      <SidebarItem :icon="ReceiptEuro" label="Transactions" to="/transactions" />
      <SidebarItem :icon="Wallet" label="Budgets" to="/budgets" />
      <SidebarItem :icon="BarChart" label="Stats" to="/stats" />
    </nav>

    <!-- Footer with UserProfile -->
    <div class="border-t border-gray-800">
      <!-- User Profile -->
      <div class="p-4 mb-2">
        <UserProfile />
      </div>
      
      <!-- App Info -->
      <div class="px-6 py-3 flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
        </svg>
        <div class="flex-1">
          <p class="text-sm font-medium">Financial Manager</p>
          <div class="version text-xs text-gray-500 mt-2">v1.2.1</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import SidebarItem from '../components/SidebarItem.vue';
import { LayoutDashboard, Wallet, BarChart, ReceiptEuro } from 'lucide-vue-next';
import UserProfile from './UserProfile.vue';

const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits<{ (e: 'close'): void }>();

provide('closeSidebar', () => emit('close'));
</script>
  