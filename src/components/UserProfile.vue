<template>
  <div ref="profileContainer" class="relative">
    <button 
      class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors w-full"
      @click="isOpen = !isOpen"
    >
      <div
        class="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0"
        :style="avatarStyle"
      >
        <span v-if="avatarEmoji">{{ avatarEmoji }}</span>
        <span v-else>{{ userInitial }}</span>
      </div>
      <div class="flex-1 text-left">
        <p class="text-sm font-medium truncate">{{ displayName }}</p>
        <p class="text-xs text-gray-400">{{ userStatus }}</p>
      </div>
      <ChevronDown :class="['h-4 w-4 text-gray-400 transition-transform', isOpen ? 'rotate-180' : '']" />
    </button>

    <!-- Dropdown Menu -->
    <div 
      v-if="isOpen" 
      class="absolute bottom-full left-0 w-full bg-gray-800 rounded-lg shadow-lg py-2 mb-2 border border-gray-700 z-10"
    >
      <div class="px-4 py-2 border-b border-gray-700">
        <p class="text-sm font-medium">{{ displayName }}</p>
        <p class="text-xs text-gray-400">{{ userEmail }}</p>
      </div>
      <button
        class="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
        @click="goToProfile"
      >
        <UserCircle class="h-4 w-4" />
        Edit Profile
      </button>
      <button 
        class="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center gap-2"
        @click="signOut"
      >
        <LogOut class="h-4 w-4" />
        Sign Out
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useUserStore } from '../store/user';
import { useRouter, useRoute } from 'vue-router';
import { ChevronDown, LogOut, UserCircle } from 'lucide-vue-next';
import { supabase } from '../lib/supabaseClient';

const AVATAR_OPTIONS: Record<string, { emoji: string; bg: string }> = {
  bear:    { emoji: '🐻', bg: '#f59e42' },
  fox:     { emoji: '🦊', bg: '#ef4444' },
  cat:     { emoji: '🐱', bg: '#8b5cf6' },
  dog:     { emoji: '🐶', bg: '#f59e0b' },
  lion:    { emoji: '🦁', bg: '#d97706' },
  panda:   { emoji: '🐼', bg: '#6b7280' },
  penguin: { emoji: '🐧', bg: '#0ea5e9' },
  rabbit:  { emoji: '🐰', bg: '#ec4899' },
  frog:    { emoji: '🐸', bg: '#22c55e' },
  owl:     { emoji: '🦉', bg: '#a16207' },
  tiger:   { emoji: '🐯', bg: '#f97316' },
  dino:    { emoji: '🦕', bg: '#14b8a6' },
};

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const isOpen = ref(false);
const userProfile = ref<any>(null);
const profileContainer = ref<HTMLElement | null>(null);

// Handle click outside
const handleClickOutside = (event: MouseEvent) => {
  if (profileContainer.value && !profileContainer.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

// Add event listener when component is mounted
const onProfileUpdated = (e: Event) => {
  userProfile.value = (e as CustomEvent).detail;
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('profileUpdated', onProfileUpdated);
  loadProfile();
});

// Remove event listener when component is unmounted
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('profileUpdated', onProfileUpdated);
});

const loadProfile = () => {
  const cached = localStorage.getItem('userProfile');
  if (cached) {
    userProfile.value = JSON.parse(cached);
    return;
  }
  if (!userStore.isGuestMode && userStore.user) {
    supabase
      .from('profiles')
      .select('first_name, last_name, avatar_url')
      .eq('id', userStore.user.id)
      .single()
      .then(({ data, error }) => {
        if (!error && data) userProfile.value = data;
      });
  }
};

watch(() => route.path, (_, oldPath) => {
  if (oldPath === '/profile') loadProfile();
});

const firstName = computed(() => {
  if (userStore.isGuestMode) return 'Guest';
  // First try to get from DB profile
  if (userProfile.value?.first_name) return userProfile.value.first_name;
  // Then try metadata
  return userStore.user?.user_metadata?.first_name || 
         userStore.user?.email?.split('@')[0].split('.')[0] || 'User';
});

const lastName = computed(() => {
  if (userStore.isGuestMode) return 'User';
  // First try to get from DB profile
  if (userProfile.value?.last_name) return userProfile.value.last_name;
  // Then try metadata
  return userStore.user?.user_metadata?.last_name || 
         (userStore.user?.email?.split('@')[0].includes('.') ? 
          userStore.user?.email?.split('@')[0].split('.')[1] : '');
});

const displayName = computed(() => {
  if (userStore.isGuestMode) return 'Guest User';
  if (firstName.value && lastName.value) {
    return `${firstName.value} ${lastName.value}`;
  }
  return userStore.user?.email?.split('@')[0] || 'User';
});

const userEmail = computed(() => {
  if (userStore.isGuestMode) return 'Guest Mode';
  return userStore.user?.email || '';
});

const userStatus = computed(() => {
  return userStore.isGuestMode ? 'Guest Mode' : 'Signed In';
});

const userInitial = computed(() => {
  if (userStore.isGuestMode) return 'G';
  const firstInitial = firstName.value.charAt(0).toUpperCase();
  const lastInitial = lastName.value ? lastName.value.charAt(0).toUpperCase() : '';
  return lastInitial ? `${firstInitial}${lastInitial}` : firstInitial;
});

const avatarId = computed(() => userProfile.value?.avatar_url ?? null);
const avatarEmoji = computed(() => avatarId.value ? (AVATAR_OPTIONS[avatarId.value]?.emoji ?? null) : null);
const avatarStyle = computed(() => ({
  background: avatarId.value && AVATAR_OPTIONS[avatarId.value]
    ? AVATAR_OPTIONS[avatarId.value].bg
    : '#2563eb',
}));

const goToProfile = () => {
  isOpen.value = false;
  router.push('/profile');
};

const signOut = async () => {
  isOpen.value = false; // Close dropdown first to avoid UI glitches
  
  if (userStore.isGuestMode) {
    userStore.setGuestMode(false);
  } else {
    await userStore.signOut();
  }
  
  // Navigate to auth page after signout is complete
  router.push('/auth');
};
</script>