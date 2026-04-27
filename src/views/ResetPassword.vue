<template>
  <div class="min-h-screen flex items-center justify-center p-4" style="background: linear-gradient(160deg, #0f172a 0%, #111827 60%, #0f172a 100%);">
    <div class="w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">

      <!-- Header -->
      <div class="px-8 pt-8 pb-6 text-center border-b border-gray-700">
        <div class="flex justify-center mb-4">
          <div class="w-14 h-14 rounded-2xl bg-blue-600 bg-opacity-20 border border-blue-500 border-opacity-30 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        <h2 class="text-xl font-bold text-white">Reset your password</h2>
        <p class="text-gray-500 text-sm mt-1">Enter your new password below</p>
      </div>

      <!-- Body -->
      <div class="px-8 py-6">

        <!-- Error -->
        <div v-if="error" class="mb-5 flex items-center gap-2 p-3 bg-red-900 bg-opacity-30 border border-red-700 border-opacity-40 rounded-xl text-red-400 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ error }}
        </div>

        <!-- Success state -->
        <div v-if="success" class="flex flex-col items-center text-center py-4 space-y-4">
          <div class="w-16 h-16 rounded-full bg-green-500 bg-opacity-15 border border-green-500 border-opacity-30 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p class="text-white font-semibold">Password updated!</p>
            <p class="text-gray-400 text-sm mt-1">You can now sign in with your new password</p>
          </div>
          <button
            class="mt-2 w-full flex justify-center items-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white transition-all duration-200"
            @click="goToLogin"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14" />
            </svg>
            Go to login
          </button>
        </div>

        <!-- Form -->
        <form v-else class="space-y-4" @submit.prevent="handleResetPassword">
          <!-- New password -->
          <div>
            <label for="password" class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">New password</label>
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
                class="w-full pl-10 pr-10 py-2.5 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="••••••••"
                required
                @input="checkPasswordStrength"
              />
              <button type="button" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300 transition-colors" @click="showPassword = !showPassword">
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" /><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              </button>
            </div>

            <!-- Strength bar -->
            <div class="mt-2 space-y-1.5">
              <div class="flex justify-between items-center">
                <div class="flex gap-1 flex-1 mr-3">
                  <div v-for="i in 4" :key="i" class="h-1 flex-1 rounded-full transition-all duration-300"
                    :class="passwordStrength >= i * 25 ? strengthBarColor : 'bg-gray-600'"></div>
                </div>
                <span class="text-xs font-medium" :class="strengthTextColor">{{ passwordStrengthText }}</span>
              </div>
              <div class="flex gap-3 text-xs text-gray-600">
                <span :class="password.length >= 8 ? 'text-green-400' : ''">8+ chars</span>
                <span :class="/[A-Z]/.test(password) ? 'text-green-400' : ''">Uppercase</span>
                <span :class="/[0-9]/.test(password) ? 'text-green-400' : ''">Number</span>
              </div>
            </div>
          </div>

          <!-- Confirm password -->
          <div>
            <label for="confirmPassword" class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Confirm password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="w-full pl-10 pr-10 py-2.5 bg-gray-700 border text-white placeholder-gray-400 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                :class="confirmPassword && password !== confirmPassword ? 'border-red-500' : 'border-gray-600'"
                placeholder="••••••••"
                required
              />
              <button type="button" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300 transition-colors" @click="showConfirmPassword = !showConfirmPassword">
                <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" /><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              </button>
            </div>
            <p v-if="confirmPassword && password !== confirmPassword" class="mt-1 text-xs text-red-400">Passwords do not match</p>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            class="w-full flex justify-center items-center py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-semibold text-white transition-all duration-200 mt-2"
            :disabled="loading || !isFormValid"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Updating...' : 'Reset password' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { supabase } from '../lib/supabaseClient';

const router = useRouter();
const route = useRoute();

const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const loading = ref(false);
const error = ref('');
const success = ref(false);
const passwordStrength = ref(0);

onMounted(() => {
  if (!route.hash) {
    error.value = 'Invalid or expired password reset link. Please request a new one.';
  }
});

// Password strength calculation
const checkPasswordStrength = () => {
  const pwd = password.value;
  let strength = 0;
  
  // Length check
  if (pwd.length >= 8) strength += 25;
  
  // Contains uppercase letter
  if (/[A-Z]/.test(pwd)) strength += 25;
  
  // Contains number
  if (/[0-9]/.test(pwd)) strength += 25;
  
  // Contains special character
  if (/[^A-Za-z0-9]/.test(pwd)) strength += 25;
  
  passwordStrength.value = strength;
};

const passwordStrengthText = computed(() => {
  if (passwordStrength.value === 0) return 'None';
  if (passwordStrength.value <= 25) return 'Weak';
  if (passwordStrength.value <= 50) return 'Fair';
  if (passwordStrength.value <= 75) return 'Good';
  return 'Strong';
});

const strengthBarColor = computed(() => {
  if (passwordStrength.value <= 25) return 'bg-red-500';
  if (passwordStrength.value <= 50) return 'bg-orange-500';
  if (passwordStrength.value <= 75) return 'bg-yellow-500';
  return 'bg-green-500';
});

const strengthTextColor = computed(() => {
  if (passwordStrength.value === 0) return 'text-gray-600';
  if (passwordStrength.value <= 25) return 'text-red-400';
  if (passwordStrength.value <= 50) return 'text-orange-400';
  if (passwordStrength.value <= 75) return 'text-yellow-400';
  return 'text-green-400';
});

const isFormValid = computed(() => {
  return (
    password.value.length >= 8 &&
    password.value === confirmPassword.value &&
    passwordStrength.value >= 50 // Require at least a fair password
  );
});

const handleResetPassword = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match';
    return;
  }

  if (password.value.length < 8) {
    error.value = 'Password must be at least 8 characters';
    return;
  }

  try {
    loading.value = true;
    error.value = '';
    
    const { error: updateError } = await supabase.auth.updateUser({
      password: password.value
    });

    if (updateError) throw updateError;

    await supabase.auth.signOut();

    success.value = true;
    password.value = '';
    confirmPassword.value = '';
    
  } catch (err: any) {
    error.value = err.message || 'Failed to reset password';
  } finally {
    loading.value = false;
  }
};

const goToLogin = () => {
  router.push('/auth');
};
</script>