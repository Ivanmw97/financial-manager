<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm" @click="$emit('close')"></div>

    <!-- Modal -->
    <div class="relative w-full max-w-md overflow-hidden bg-gray-800 border border-gray-700 shadow-2xl rounded-2xl">

      <!-- Header -->
      <div class="px-6 pt-6 pb-5 border-b border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-10 h-10 bg-blue-600 border border-blue-500 rounded-xl bg-opacity-20 border-opacity-30">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 class="text-base font-semibold text-white">Reset password</h3>
              <p class="text-xs text-gray-500 mt-0.5">We'll send you a reset link</p>
            </div>
          </div>
          <button class="text-gray-500 transition-colors hover:text-gray-300" @click="$emit('close')">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="px-6 py-5 space-y-4">
        <!-- Success state -->
        <div v-if="success" class="flex flex-col items-center py-4 space-y-3 text-center">
          <div class="flex items-center justify-center bg-green-500 border border-green-500 rounded-full w-14 h-14 bg-opacity-15 border-opacity-30">
            <svg xmlns="http://www.w3.org/2000/svg" class="text-green-400 h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p class="font-medium text-white">Check your inbox</p>
            <p class="mt-1 text-sm text-gray-400">We sent a reset link to <span class="text-blue-400">{{ sentTo }}</span></p>
          </div>
          <p class="text-xs text-gray-600">Closing in a moment...</p>
        </div>

        <!-- Form state -->
        <template v-else>
          <p class="text-sm text-gray-400">Enter your email and we'll send you a link to reset your password.</p>

          <div v-if="error" class="flex items-center gap-2 p-3 text-sm text-red-400 bg-red-900 border border-red-700 bg-opacity-30 border-opacity-40 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ error }}
          </div>

          <div>
            <label for="reset-email" class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email address</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                id="reset-email"
                v-model="email"
                type="email"
                class="w-full pl-10 py-2.5 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="your@email.com"
                @keyup.enter="handleResetPassword"
              />
            </div>
          </div>
        </template>
      </div>

      <!-- Footer -->
      <div v-if="!success" class="flex gap-3 px-6 pb-6">
        <button
          type="button"
          class="flex-1 py-2.5 rounded-xl border border-gray-600 text-sm font-medium text-gray-400 hover:bg-gray-700 transition-all duration-200"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button
          type="button"
          class="flex-1 flex justify-center items-center py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          :disabled="loading || !email"
          @click="handleResetPassword"
        >
          <svg v-if="loading" class="w-4 h-4 mr-2 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? 'Sending...' : 'Send reset link' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { supabase } from '../../lib/supabaseClient';

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'success'): void
}>();

const email = ref('');
const loading = ref(false);
const error = ref('');
const success = ref(false);
const sentTo = ref('');

const handleResetPassword = async () => {
  if (!email.value) {
    error.value = 'Please enter your email address';
    return;
  }

  try {
    loading.value = true;
    error.value = '';

    const redirectTo = window.location.hostname === 'localhost'
      ? `${window.location.origin}/financial-manager/reset-password`
      : 'https://ivanmw97.github.io/financial-manager/reset-password';

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo,
    });

    if (resetError) throw resetError;

    sentTo.value = email.value;
    email.value = '';
    success.value = true;

    setTimeout(() => {
      emit('success');
      emit('close');
    }, 3000);

  } catch (err: any) {
    error.value = err.message || 'Failed to send reset link';
  } finally {
    loading.value = false;
  }
};
</script>