<template>
  <form class="space-y-5" @submit.prevent="handleSignIn">
    <!-- Email field -->
    <div>
      <label for="email" class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </div>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          class="pl-10 block w-full py-2.5 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="your@email.com"
        />
      </div>
    </div>

    <!-- Password field -->
    <div>
      <label for="password" class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Password</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <input
          id="password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          required
          class="pl-10 pr-10 block w-full py-2.5 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="••••••••"
        />
        <button
          type="button"
          class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
          @click="showPassword = !showPassword"
        >
          <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Remember me & Forgot password -->
    <div class="flex items-center justify-between">
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          id="remember-me"
          v-model="rememberMe"
          type="checkbox"
          class="h-4 w-4 rounded border-gray-500 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
        />
        <span class="text-sm text-gray-400">Remember me</span>
      </label>
      <a
        href="#"
        class="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        @click.prevent="$emit('forgot-password')"
      >
        Forgot password?
      </a>
    </div>

    <!-- Sign in button -->
    <button
      type="submit"
      class="w-full flex justify-center items-center py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
      :disabled="loading"
    >
      <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {{ loading ? 'Signing in...' : 'Sign in' }}
    </button>

    <!-- Divider -->
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-600"></div>
      </div>
      <div class="relative flex justify-center text-xs">
        <span class="px-3 bg-gray-800 text-gray-500">or continue with</span>
      </div>
    </div>

    <!-- Social / Guest buttons -->
    <div class="grid grid-cols-2 gap-3">
      <button
        type="button"
        class="flex justify-center items-center gap-2 py-2.5 px-4 rounded-xl border border-gray-600 bg-gray-700 text-sm font-medium text-gray-400 cursor-not-allowed opacity-50"
        disabled
        title="Coming soon"
      >
        <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
        </svg>
        Google
      </button>
      <button
        type="button"
        class="flex justify-center items-center gap-2 py-2.5 px-4 rounded-xl border border-gray-600 bg-gray-700 text-sm font-medium text-gray-200 hover:bg-gray-600 hover:border-gray-500 transition-all duration-200"
        @click.prevent="emit('guest-access')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Guest
      </button>
    </div>

    <!-- Guest mode warning -->
    <div class="p-3 bg-amber-950 bg-opacity-50 border border-amber-800 border-opacity-50 rounded-xl flex items-start gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p class="text-xs text-amber-400 text-opacity-80">
        <span class="font-semibold">Guest mode:</span> Data is stored locally only and cannot be recovered if lost.
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const { loading } = defineProps<{
  loading: boolean
}>();

const emit = defineEmits<{
  (e: 'sign-in', email: string, password: string, rememberMe: boolean): void
  (e: 'forgot-password'): void
  (e: 'social-sign-in', provider: 'google'): void
  (e: 'guest-access'): void
}>();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const rememberMe = ref(false);

const handleSignIn = () => {
  emit('sign-in', email.value, password.value, rememberMe.value);
};
</script>