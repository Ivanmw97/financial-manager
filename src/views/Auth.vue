<template>
  <div class="flex w-screen h-screen overflow-hidden">
    <!-- Reset Password UI -->
    <div v-if="$route.path.includes('reset-password')" class="flex flex-col items-center justify-center w-full bg-gray-900">
      <router-view></router-view>
    </div>
    
    <!-- Main Auth UI with split panels -->
    <template v-else>
      <!-- Left side: Auth Form -->
      <div class="flex flex-col justify-center w-full px-4 py-12 lg:w-1/2 sm:px-6 lg:px-8" style="background: linear-gradient(160deg, #0f172a 0%, #111827 60%, #0f172a 100%);">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <!-- Logo pequeño en mobile -->
          <div class="flex justify-center mb-6 lg:hidden">
            <div class="flex items-center gap-2">
              <div class="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="text-lg font-bold text-white">Financial<span class="text-blue-400">Manager</span></span>
            </div>
          </div>
          <h2 class="text-2xl font-bold tracking-tight text-center text-white">
            {{ mode === 'signin' ? 'Welcome back' : 'Create your account' }}
          </h2>
          <p class="mt-2 text-sm text-center text-gray-500">
            {{ mode === 'signin' ? 'Don\'t have an account?' : 'Already have an account?' }}
            <a href="#"
               class="ml-1 font-medium text-blue-400 transition-colors duration-200 hover:text-blue-300"
               @click.prevent="mode = mode === 'signin' ? 'signup' : 'signin'">
              {{ mode === 'signin' ? 'Sign up' : 'Sign in' }}
            </a>
          </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="px-6 py-8 bg-gray-800 border border-gray-700 rounded-2xl sm:px-10">
            <!-- Error message -->
            <div v-if="errorMsg" class="flex items-center gap-2 p-3 mb-5 text-sm text-red-400 bg-red-900 border border-red-700 border-opacity-50 rounded-lg bg-opacity-40">
              <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {{ errorMsg }}
            </div>
            
            <!-- Sign In Form -->
            <SignInForm 
              v-if="mode === 'signin'" 
              :loading="loading"
              @sign-in="handleSignIn"
              @forgot-password="showForgotPasswordModal = true"
              @social-sign-in="handleSocialSignIn"
              @guest-access="handleGuestAccess"
            />
            
            <!-- Sign Up Form -->
            <SignUpForm 
              v-else 
              :loading="loading"
              @sign-up="handleSignUp"
              @show-terms="showTermsModal = true"
              @show-privacy="showPrivacyModal = false"
            />
          </div>
        </div>
      </div>

      <!-- Right side: App Info -->
      <div class="relative hidden h-full overflow-hidden lg:flex lg:w-1/2" style="background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 40%, #1e40af 100%);">

        <!-- SVG decorative background -->
        <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <!-- Grid dots -->
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" fill-opacity="0.08"/>
            </pattern>
            <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#60a5fa" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#93c5fd" stop-opacity="0.2"/>
              <stop offset="100%" stop-color="#1e40af" stop-opacity="0"/>
            </radialGradient>
          </defs>

          <!-- Dot grid overlay -->
          <rect width="100%" height="100%" fill="url(#grid)"/>

          <!-- Large decorative circles -->
          <circle cx="85%" cy="15%" r="180" fill="white" fill-opacity="0.04" />
          <circle cx="85%" cy="15%" r="120" fill="white" fill-opacity="0.05" />
          <circle cx="85%" cy="15%" r="60"  fill="white" fill-opacity="0.07" />

          <circle cx="10%" cy="80%" r="140" fill="white" fill-opacity="0.04" />
          <circle cx="10%" cy="80%" r="80"  fill="white" fill-opacity="0.05" />

          <!-- Glow blobs -->
          <ellipse cx="75%" cy="20%" rx="200" ry="200" fill="url(#glow1)" />
          <ellipse cx="20%" cy="75%" rx="160" ry="160" fill="url(#glow2)" />

          <!-- Geometric lines -->
          <line x1="60%" y1="0"    x2="100%" y2="40%"  stroke="white" stroke-opacity="0.06" stroke-width="1"/>
          <line x1="70%" y1="0"    x2="100%" y2="50%"  stroke="white" stroke-opacity="0.06" stroke-width="1"/>
          <line x1="80%" y1="0"    x2="100%" y2="30%"  stroke="white" stroke-opacity="0.04" stroke-width="1"/>
          <line x1="0"   y1="60%"  x2="40%"  y2="100%" stroke="white" stroke-opacity="0.06" stroke-width="1"/>
          <line x1="0"   y1="70%"  x2="30%"  y2="100%" stroke="white" stroke-opacity="0.04" stroke-width="1"/>

          <!-- Floating chart bars (decorative) -->
          <g transform="translate(68%, 55%)" opacity="0.1">
            <rect x="0"  y="60" width="18" height="40"  rx="3" fill="white"/>
            <rect x="26" y="30" width="18" height="70"  rx="3" fill="white"/>
            <rect x="52" y="10" width="18" height="90"  rx="3" fill="white"/>
            <rect x="78" y="45" width="18" height="55"  rx="3" fill="white"/>
            <rect x="104" y="20" width="18" height="80" rx="3" fill="white"/>
          </g>

          <!-- Floating trend line (decorative) -->
          <polyline
            points="5%,75% 15%,65% 25%,68% 35%,55% 45%,58% 55%,42% 65%,38% 75%,28%"
            fill="none" stroke="white" stroke-opacity="0.08" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          />

          <!-- Small accent circles scattered -->
          <circle cx="30%" cy="20%" r="4" fill="white" fill-opacity="0.12"/>
          <circle cx="55%" cy="12%" r="3" fill="white" fill-opacity="0.10"/>
          <circle cx="90%" cy="60%" r="5" fill="white" fill-opacity="0.08"/>
          <circle cx="15%" cy="45%" r="3" fill="white" fill-opacity="0.10"/>
          <circle cx="45%" cy="88%" r="4" fill="white" fill-opacity="0.08"/>

          <!-- Hexagon ring top-right -->
          <polygon points="92%,5% 96%,8% 96%,14% 92%,17% 88%,14% 88%,8%"
            fill="none" stroke="white" stroke-opacity="0.1" stroke-width="1"/>
          <polygon points="92%,7% 95%,9.5% 95%,13.5% 92%,16% 89%,13.5% 89%,9.5%"
            fill="white" fill-opacity="0.04"/>
        </svg>

        <!-- Content -->
        <div class="relative z-10 flex flex-col items-start justify-center w-full h-full p-12">
          <!-- App Logo and Name -->
          <div class="flex items-center gap-3 mb-12">
            <div class="flex items-center justify-center w-10 h-10 bg-white border border-white rounded-xl bg-opacity-15 backdrop-blur-sm border-opacity-20">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <span class="text-xl font-bold text-white">Financial</span>
              <span class="text-xl font-medium text-blue-200">Manager</span>
            </div>
          </div>

          <h1 class="mb-4 text-4xl font-bold leading-tight text-white">Manage Your Finances<br/><span class="text-blue-200">with Ease</span></h1>
          <p class="max-w-xs mb-10 text-sm text-blue-200">Take control of your money. Track, plan, and grow — all in one place.</p>

          <div class="space-y-5">
            <div class="flex items-center gap-4">
              <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-white border border-white rounded-lg bg-opacity-15 border-opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-white">Track Expenses</h3>
                <p class="text-xs text-blue-200">Monitor your daily spending and stay on top</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-white border border-white rounded-lg bg-opacity-15 border-opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-white">Budget Management</h3>
                <p class="text-xs text-blue-200">Set limits and reach your financial goals</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-white border border-white rounded-lg bg-opacity-15 border-opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-white">Visual Analytics</h3>
                <p class="text-xs text-blue-200">Insights with detailed charts and statistics</p>
              </div>
            </div>
          </div>

          <!-- Bottom stat pills -->
          <div class="flex gap-3 mt-12">
            <div class="px-4 py-2 text-xs font-medium text-white bg-white border border-white rounded-full bg-opacity-10 border-opacity-15 backdrop-blur-sm">
              💳 Expense tracking
            </div>
            <div class="px-4 py-2 text-xs font-medium text-white bg-white border border-white rounded-full bg-opacity-10 border-opacity-15 backdrop-blur-sm">
              📊 Live stats
            </div>
            <div class="px-4 py-2 text-xs font-medium text-white bg-white border border-white rounded-full bg-opacity-10 border-opacity-15 backdrop-blur-sm">
              🔒 Secure
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>

  <!-- Modals -->
  <TermsModal v-if="showTermsModal" @close="showTermsModal = false" />
  <PrivacyModal v-if="showPrivacyModal" @close="showPrivacyModal = false" />
  <ForgotPasswordModal 
    v-if="showForgotPasswordModal" 
    @close="showForgotPasswordModal = false"
    @success="handlePasswordResetSuccess"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../lib/supabaseClient';
import { useUserStore } from '../store/user';
import SignInForm from '../components/auth/SignInForm.vue';
import SignUpForm from '../components/auth/SignUpForm.vue';
import TermsModal from '../components/auth/TermsModal.vue';
import PrivacyModal from '../components/auth/PrivacyModal.vue';
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal.vue';

const router = useRouter();
const userStore = useUserStore();

const mode = ref<'signin' | 'signup'>('signin');
const errorMsg = ref('');
const loading = ref(false);
const showTermsModal = ref(false);
const showPrivacyModal = ref(false);
const showForgotPasswordModal = ref(false);

const handleSignIn = async (email: string, password: string, rememberMe: boolean) => {
  try {
    loading.value = true;
    errorMsg.value = '';
    
    localStorage.setItem('rememberMe', rememberMe ? 'true' : 'false');
    const result = await userStore.signIn(email, password);

    if (!result.success) {
      throw new Error(result.error);
    }
    
    // Clear any guest mode data
    localStorage.removeItem('guest_transactions');
    localStorage.removeItem('guest_budgets');
    
    router.push('/dashboard');
  } catch (error: any) {
    errorMsg.value = error.message || 'Failed to sign in';
  } finally {
    loading.value = false;
  }
};

const handleSignUp = async (formData: {
  email: string,
  password: string,
  firstName: string,
  lastName: string
}) => {
  try {
    loading.value = true;
    errorMsg.value = '';
    
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName
        }
      }
    });

    if (error) throw error;
    
    if (data.user) {
      // Create a profile for the new user
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: data.user.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          currency: '€',
          theme: 'light'
        });
       
      if (profileError) {
        console.error('Profile creation error:', profileError);
        // Continue anyway since the user was created
      }
      
      await userStore.setUser(data.user);
      router.push('/dashboard');
    } else {
      // Email confirmation required
      errorMsg.value = 'Please check your email for a confirmation link';
    }
  } catch (error: any) {
    errorMsg.value = error.message || 'Failed to create account';
  } finally {
    loading.value = false;
  }
};

const handleGuestAccess = () => {
  // Clear any existing data first
  localStorage.removeItem('transactions');
  localStorage.removeItem('budgets');
  localStorage.removeItem('guest_transactions');
  localStorage.removeItem('guest_budgets');
  
  userStore.setGuestMode(true);
  router.push('/dashboard');
};

const handleSocialSignIn = async (provider: 'google') => {
  try {
    loading.value = true;
    errorMsg.value = '';

    const redirectTo = window.location.hostname === 'localhost'
      ? `${window.location.origin}/financial-manager/auth`
      : 'https://ivanmw97.github.io/financial-manager/auth';

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo
      }
    });
    
    if (error) throw error;
    
  } catch (error: any) {
    errorMsg.value = error.message || `Failed to sign in with ${provider}`;
    loading.value = false;
  }
};

const handlePasswordResetSuccess = () => {
  errorMsg.value = '';
};
</script>