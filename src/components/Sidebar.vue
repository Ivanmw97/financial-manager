<template>
  <!-- Backdrop for mobile -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
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
        <svg xmlns="http://www.w3.org/2000/svg" class="text-blue-500 h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
        </svg>
        <div>
          <span class="text-xl font-bold text-blue-500">Financial</span>
          <span class="text-xl font-medium text-white">Manager</span>
        </div>
      </div>
    </div>

    <!-- Menu -->
    <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
      <div class="flex items-center gap-2 px-2 mb-4">
        <div class="flex-grow h-px bg-gray-800"></div>
        <p class="text-xs font-medium text-gray-400">MENU</p>
        <div class="flex-grow h-px bg-gray-800"></div>
      </div>
      <SidebarItem :icon="LayoutDashboard" label="Dashboard" to="/dashboard" />
      <SidebarItem :icon="ReceiptEuro" label="Transactions" to="/transactions" />
      <SidebarItem :icon="Wallet" label="Budgets" to="/budgets" />
      <SidebarItem :icon="BarChart" label="Stats" to="/stats" />
      <SidebarItem :icon="UserCircle" label="Profile" to="/profile" />
    </nav>

    <!-- Footer with UserProfile -->
    <div class="border-t border-gray-800">
      <!-- User Profile -->
      <div class="p-4 mb-2">
        <UserProfile />
      </div>
      
      <!-- App Info -->
      <div class="flex items-center gap-3 px-6 py-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
        </svg>
        <div class="flex-1">
          <p class="text-sm font-medium">Financial Manager</p>
          <div class="mt-2 text-xs text-gray-500 version">v1.4.0</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import SidebarItem from '../components/SidebarItem.vue';
import { LayoutDashboard, Wallet, BarChart, ReceiptEuro, UserCircle } from 'lucide-vue-next';
import UserProfile from './UserProfile.vue';

const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits<{ (e: 'close'): void }>();

provide('closeSidebar', () => emit('close'));
</script>
  