<template>
  <div class="p-4 lg:p-6 max-w-2xl mx-auto">
    <!-- Header -->
    <div class="mb-6 lg:mb-8">
      <h1 class="hidden lg:block text-2xl font-bold">Profile</h1>
      <p class="text-xs lg:text-sm text-gray-500">Manage your account information</p>
    </div>

    <!-- Avatar picker modal -->
    <div v-if="showAvatarPicker" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black bg-opacity-50" @click="showAvatarPicker = false"></div>
      <div class="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
        <h3 class="text-sm font-semibold text-gray-800 mb-4">Choose an avatar</h3>
        <div class="grid grid-cols-4 gap-3">
          <!-- Initials option -->
          <button
            class="w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold text-white transition-all border-2"
            :class="selectedAvatar === null ? 'border-blue-500 scale-110' : 'border-transparent hover:border-gray-300'"
            style="background: #2563eb"
            @click="selectedAvatar = null"
          >
            {{ userInitial }}
          </button>
          <button
            v-for="av in avatarOptions"
            :key="av.id"
            class="w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all border-2"
            :class="selectedAvatar === av.id ? 'border-blue-500 scale-110' : 'border-transparent hover:border-gray-300'"
            :style="{ background: av.bg }"
            @click="selectedAvatar = av.id"
          >
            {{ av.emoji }}
          </button>
        </div>
        <div class="flex gap-3 mt-5">
          <button class="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium" @click="saveAvatar">Save</button>
          <button class="flex-1 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50" @click="showAvatarPicker = false">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Avatar + name card -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-5 flex items-center gap-5">
      <div class="relative flex-shrink-0">
        <div
          class="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
          :style="currentAvatarStyle"
        >
          <span v-if="currentAvatar">{{ currentAvatar.emoji }}</span>
          <span v-else class="text-white text-xl font-bold">{{ userInitial }}</span>
        </div>
        <button
          class="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
          @click="showAvatarPicker = true"
        >
          <Pencil class="h-3 w-3 text-white" />
        </button>
      </div>
      <div>
        <p class="text-lg font-semibold text-gray-900">{{ fullName }}</p>
        <p class="text-sm text-gray-500">{{ userEmail }}</p>
        <span class="inline-flex items-center gap-1 mt-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
          <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
          Active account
        </span>
      </div>
    </div>

    <!-- Personal Info -->
    <section class="bg-white rounded-xl shadow-sm border border-gray-100 mb-5">
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div class="flex items-center gap-2">
          <User class="h-4 w-4 text-blue-500" />
          <h2 class="text-sm font-semibold text-gray-800">Personal information</h2>
        </div>
        <button
          v-if="!editingInfo"
          class="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          @click="startEditInfo"
        >
          <Pencil class="h-3.5 w-3.5" /> Edit
        </button>
      </div>
      <div class="p-6 space-y-4">
        <div v-if="!editingInfo" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">First name</p>
            <p class="text-sm font-medium text-gray-800">{{ profile.first_name || '—' }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">Last name</p>
            <p class="text-sm font-medium text-gray-800">{{ profile.last_name || '—' }}</p>
          </div>
          <div class="sm:col-span-2">
            <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</p>
            <p class="text-sm font-medium text-gray-800">{{ userEmail }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">Currency</p>
            <p class="text-sm font-medium text-gray-800">{{ profile.currency || '€' }}</p>
          </div>
        </div>

        <!-- Edit form -->
        <form v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4" @submit.prevent="saveInfo">
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">First name</label>
            <input
              v-model="editForm.first_name"
              type="text"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Last name</label>
            <input
              v-model="editForm.last_name"
              type="text"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Doe"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Currency</label>
            <select
              v-model="editForm.currency"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="€">€ Euro</option>
              <option value="$">$ Dollar</option>
              <option value="£">£ Pound</option>
              <option value="¥">¥ Yen</option>
              <option value="CHF">CHF Franc</option>
            </select>
          </div>

          <div v-if="infoError" class="sm:col-span-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {{ infoError }}
          </div>
          <div v-if="infoSuccess" class="sm:col-span-2 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            {{ infoSuccess }}
          </div>

          <div class="sm:col-span-2 flex gap-3 pt-1">
            <button
              type="submit"
              class="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
              :disabled="savingInfo"
            >
              <svg v-if="savingInfo" class="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ savingInfo ? 'Saving...' : 'Save changes' }}
            </button>
            <button type="button" class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors" @click="cancelEditInfo">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>

    <!-- Change Password -->
    <section class="bg-white rounded-xl shadow-sm border border-gray-100 mb-5">
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div class="flex items-center gap-2">
          <Lock class="h-4 w-4 text-blue-500" />
          <h2 class="text-sm font-semibold text-gray-800">Change password</h2>
        </div>
        <button
          v-if="!editingPassword"
          class="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          @click="editingPassword = true"
        >
          <Pencil class="h-3.5 w-3.5" /> Change
        </button>
      </div>
      <div class="p-6">
        <div v-if="!editingPassword">
          <p class="text-sm text-gray-500">••••••••••••</p>
          <p class="text-xs text-gray-400 mt-1">Last changed: unknown</p>
        </div>

        <form v-else class="space-y-4" @submit.prevent="savePassword">
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Current password</label>
            <div class="relative">
              <input
                v-model="passwordForm.currentPassword"
                :type="showCurrentPassword ? 'text' : 'password'"
                class="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
              <button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600" @click="showCurrentPassword = !showCurrentPassword">
                <Eye v-if="!showCurrentPassword" class="h-4 w-4" />
                <EyeOff v-else class="h-4 w-4" />
              </button>
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">New password</label>
            <div class="relative">
              <input
                v-model="passwordForm.newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                class="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
                minlength="8"
              />
              <button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600" @click="showNewPassword = !showNewPassword">
                <Eye v-if="!showNewPassword" class="h-4 w-4" />
                <EyeOff v-else class="h-4 w-4" />
              </button>
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Confirm new password</label>
            <div class="relative">
              <input
                v-model="passwordForm.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                :class="passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword ? 'border-red-400' : ''"
                placeholder="••••••••"
                required
              />
              <button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600" @click="showConfirmPassword = !showConfirmPassword">
                <Eye v-if="!showConfirmPassword" class="h-4 w-4" />
                <EyeOff v-else class="h-4 w-4" />
              </button>
            </div>
            <p v-if="passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword" class="mt-1 text-xs text-red-500">Passwords do not match</p>
          </div>

          <div v-if="passwordError" class="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{{ passwordError }}</div>
          <div v-if="passwordSuccess" class="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">{{ passwordSuccess }}</div>

          <div class="flex gap-3">
            <button
              type="submit"
              class="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
              :disabled="savingPassword || passwordForm.newPassword !== passwordForm.confirmPassword || passwordForm.newPassword.length < 8 || !passwordForm.currentPassword"
            >
              <svg v-if="savingPassword" class="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ savingPassword ? 'Updating...' : 'Update password' }}
            </button>
            <button type="button" class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors" @click="cancelEditPassword">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>

    <!-- Account info -->
    <section class="bg-white rounded-xl shadow-sm border border-gray-100">
      <div class="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
        <Info class="h-4 w-4 text-blue-500" />
        <h2 class="text-sm font-semibold text-gray-800">Account details</h2>
      </div>
      <div class="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">Member since</p>
          <p class="text-sm font-medium text-gray-800">{{ memberSince }}</p>
        </div>
        <div>
          <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">Login method</p>
          <p class="text-sm font-medium text-gray-800 capitalize">{{ loginProvider }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '../store/user';
import { supabase } from '../lib/supabaseClient';
import { User, Lock, Pencil, Eye, EyeOff, Info } from 'lucide-vue-next';

const avatarOptions = [
  { id: 'bear',    emoji: '🐻', bg: '#f59e42' },
  { id: 'fox',     emoji: '🦊', bg: '#ef4444' },
  { id: 'cat',     emoji: '🐱', bg: '#8b5cf6' },
  { id: 'dog',     emoji: '🐶', bg: '#f59e0b' },
  { id: 'lion',    emoji: '🦁', bg: '#d97706' },
  { id: 'panda',   emoji: '🐼', bg: '#6b7280' },
  { id: 'penguin', emoji: '🐧', bg: '#0ea5e9' },
  { id: 'rabbit',  emoji: '🐰', bg: '#ec4899' },
  { id: 'frog',    emoji: '🐸', bg: '#22c55e' },
  { id: 'owl',     emoji: '🦉', bg: '#a16207' },
  { id: 'tiger',   emoji: '🐯', bg: '#f97316' },
  { id: 'dino',    emoji: '🦕', bg: '#14b8a6' },
];

const userStore = useUserStore();

interface Profile {
  first_name: string | null;
  last_name: string | null;
  currency: string;
  avatar_url?: string | null;
}

const profile = ref<Profile>({ first_name: null, last_name: null, currency: '€', avatar_url: null });
const showAvatarPicker = ref(false);
const selectedAvatar = ref<string | null>(null);
const loading = ref(false);

const editingInfo = ref(false);
const savingInfo = ref(false);
const infoError = ref('');
const infoSuccess = ref('');
const editForm = ref({ first_name: '', last_name: '', currency: '€' });

const editingPassword = ref(false);
const savingPassword = ref(false);
const passwordError = ref('');
const passwordSuccess = ref('');
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const passwordForm = ref({ currentPassword: '', newPassword: '', confirmPassword: '' });

onMounted(async () => {
  if (!userStore.user) return;
  loading.value = true;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('first_name, last_name, currency, avatar_url')
      .eq('id', userStore.user.id)
      .single();
    if (!error && data) {
      profile.value = data;
      selectedAvatar.value = data.avatar_url || null;
      const cached = { first_name: data.first_name, last_name: data.last_name, currency: data.currency, avatar_url: data.avatar_url };
      localStorage.setItem('userProfile', JSON.stringify(cached));
    } else {
      const cached = localStorage.getItem('userProfile');
      if (cached) {
        const parsed = JSON.parse(cached);
        profile.value = parsed;
        selectedAvatar.value = parsed.avatar_url || null;
      }
    }
  } finally {
    loading.value = false;
  }
});

const userEmail = computed(() => userStore.user?.email || '');
const fullName = computed(() => {
  const f = profile.value.first_name || '';
  const l = profile.value.last_name || '';
  return (f + ' ' + l).trim() || userEmail.value.split('@')[0];
});
const userInitial = computed(() => {
  const f = profile.value.first_name?.charAt(0).toUpperCase() || '';
  const l = profile.value.last_name?.charAt(0).toUpperCase() || '';
  return f + l || userEmail.value.charAt(0).toUpperCase();
});
const memberSince = computed(() => {
  const created = userStore.user?.created_at;
  if (!created) return '—';
  return new Date(created).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
});
const loginProvider = computed(() => {
  const identities = userStore.user?.identities;
  if (identities && identities.length > 0) return identities[0].provider;
  return 'email';
});

const currentAvatar = computed(() => avatarOptions.find(a => a.id === selectedAvatar.value) ?? null);
const currentAvatarStyle = computed(() => ({
  background: currentAvatar.value ? currentAvatar.value.bg : '#2563eb',
}));

const saveAvatar = async () => {
  if (!userStore.user) return;
  showAvatarPicker.value = false;
  profile.value.avatar_url = selectedAvatar.value;
  const cached = localStorage.getItem('userProfile');
  const parsed = cached ? JSON.parse(cached) : {};
  const updated = { ...parsed, avatar_url: selectedAvatar.value ?? null };
  localStorage.setItem('userProfile', JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('profileUpdated', { detail: updated }));
  await supabase.from('profiles').update({ avatar_url: selectedAvatar.value ?? null }).eq('id', userStore.user.id);
};

const startEditInfo = () => {
  editForm.value = {
    first_name: profile.value.first_name || '',
    last_name: profile.value.last_name || '',
    currency: profile.value.currency || '€',
  };
  infoError.value = '';
  infoSuccess.value = '';
  editingInfo.value = true;
};

const cancelEditInfo = () => {
  editingInfo.value = false;
  infoError.value = '';
  infoSuccess.value = '';
};

const saveInfo = async () => {
  if (!userStore.user) return;
  savingInfo.value = true;
  infoError.value = '';
  infoSuccess.value = '';
  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: editForm.value.first_name || null,
        last_name: editForm.value.last_name || null,
        currency: editForm.value.currency,
      })
      .eq('id', userStore.user.id);

    if (error) throw error;

    profile.value = { ...profile.value, ...editForm.value };
    localStorage.setItem('userProfile', JSON.stringify(profile.value));
    window.dispatchEvent(new CustomEvent('profileUpdated', { detail: profile.value }));

    await supabase.auth.updateUser({
      data: {
        first_name: editForm.value.first_name,
        last_name: editForm.value.last_name,
      }
    });

    infoSuccess.value = 'Profile updated successfully!';
    setTimeout(() => { editingInfo.value = false; infoSuccess.value = ''; }, 1500);
  } catch (err: any) {
    infoError.value = err.message || 'Failed to update profile';
  } finally {
    savingInfo.value = false;
  }
};

const cancelEditPassword = () => {
  editingPassword.value = false;
  passwordForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' };
  passwordError.value = '';
  passwordSuccess.value = '';
};

const savePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    passwordError.value = 'Passwords do not match';
    return;
  }
  savingPassword.value = true;
  passwordError.value = '';
  passwordSuccess.value = '';
  try {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: userEmail.value,
      password: passwordForm.value.currentPassword,
    });
    if (signInError) {
      passwordError.value = 'Current password is incorrect';
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: passwordForm.value.newPassword });
    if (error) throw error;
    passwordSuccess.value = 'Password updated successfully!';
    passwordForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' };
    setTimeout(() => { editingPassword.value = false; passwordSuccess.value = ''; }, 1500);
  } catch (err: any) {
    passwordError.value = err.message || 'Failed to update password';
  } finally {
    savingPassword.value = false;
  }
};
</script>
