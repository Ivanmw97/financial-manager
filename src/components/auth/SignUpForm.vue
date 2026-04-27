<template>
  <form class="space-y-4" @submit.prevent="handleSignUp">
    <!-- First Name and Last Name -->
    <div class="grid grid-cols-2 gap-3">
      <div>
        <label for="first-name" class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">First name</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </div>
          <input
            id="first-name"
            v-model="firstName"
            type="text"
            class="w-full pl-10 py-2.5 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Ivan"
            required
          />
        </div>
      </div>
      <div>
        <label for="last-name" class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Last name</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </div>
          <input
            id="last-name"
            v-model="lastName"
            type="text"
            class="w-full pl-10 py-2.5 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="García"
            required
          />
        </div>
      </div>
    </div>

    <!-- Email -->
    <div>
      <label for="signup-email" class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </div>
        <input
          id="signup-email"
          v-model="email"
          type="email"
          class="w-full pl-10 py-2.5 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="your@email.com"
          required
        />
      </div>
    </div>

    <!-- Password -->
    <div>
      <label for="signup-password" class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Password</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <input
          id="signup-password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          class="w-full pl-10 pr-10 py-2.5 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="••••••••"
          required
          @input="checkPasswordStrength"
        />
        <button type="button" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300 transition-colors" @click="togglePasswordVisibility('password')">
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

    <!-- Confirm Password -->
    <div>
      <label for="confirm-password" class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Confirm password</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <input
          id="confirm-password"
          v-model="confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          class="w-full pl-10 pr-10 py-2.5 bg-gray-700 border text-white placeholder-gray-400 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          :class="confirmPassword && password !== confirmPassword ? 'border-red-500' : 'border-gray-600'"
          placeholder="••••••••"
          required
        />
        <button type="button" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300 transition-colors" @click="togglePasswordVisibility('confirm')">
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

    <!-- Terms -->
    <label class="flex items-start gap-3 cursor-pointer">
      <input
        id="terms"
        v-model="acceptTerms"
        type="checkbox"
        class="mt-0.5 h-4 w-4 rounded border-gray-500 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
        required
      />
      <span class="text-xs text-gray-500 leading-relaxed">
        I agree to the
        <a href="#" class="text-blue-400 hover:text-blue-300" @click.prevent="$emit('show-terms')">Terms of Service</a>
        and
        <a href="#" class="text-blue-400 hover:text-blue-300" @click.prevent="$emit('show-privacy')">Privacy Policy</a>
      </span>
    </label>

    <!-- Submit -->
    <button
      type="submit"
      class="w-full flex justify-center items-center py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
      :disabled="loading || !isFormValid"
    >
      <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {{ loading ? 'Creating account...' : 'Create account' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const { loading } = defineProps<{
  loading: boolean
}>();

const emit = defineEmits<{
  (e: 'sign-up', formData: {
    email: string,
    password: string,
    firstName: string,
    lastName: string
  }): void
  (e: 'show-terms'): void
  (e: 'show-privacy'): void
}>();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const firstName = ref('');
const lastName = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const passwordStrength = ref(0);
const acceptTerms = ref(false);

// Password strength calculation
const checkPasswordStrength = () => {
  const pwd = password.value;
  let strength = 0;
  
  // Length check
  if (pwd.length >= 8) strength += 25;
  
  // Contains uppercase
  if (/[A-Z]/.test(pwd)) strength += 25;
  
  // Contains lowercase
  if (/[a-z]/.test(pwd)) strength += 25;
  
  // Contains number
  if (/[0-9]/.test(pwd)) strength += 25;
  
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
    email.value.trim() !== '' &&
    password.value.trim() !== '' &&
    password.value === confirmPassword.value &&
    firstName.value.trim() !== '' &&
    lastName.value.trim() !== '' &&
    acceptTerms.value &&
    passwordStrength.value >= 50 // Require at least a fair password
  );
});

const togglePasswordVisibility = (field: 'password' | 'confirm') => {
  if (field === 'password') {
    showPassword.value = !showPassword.value;
  } else {
    showConfirmPassword.value = !showConfirmPassword.value;
  }
};

const handleSignUp = () => {
  if (isFormValid.value) {
    emit('sign-up', {
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value
    });
  }
};
</script>