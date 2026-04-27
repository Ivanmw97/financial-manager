<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
    <div class="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm" @click="$emit('close')"></div>

    <div class="relative w-full max-w-lg bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl flex flex-col max-h-[85vh]">

      <!-- Header -->
      <div class="flex items-center justify-between flex-shrink-0 px-6 pt-6 pb-4 border-b border-gray-700">
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center bg-blue-600 border border-blue-500 w-9 h-9 rounded-xl bg-opacity-20 border-opacity-30">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 class="text-base font-semibold text-white">Terms of Service</h3>
            <p class="text-xs text-gray-500 mt-0.5">Last updated: April 2025</p>
          </div>
        </div>
        <button class="text-gray-500 transition-colors hover:text-gray-300" @click="$emit('close')">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 px-6 py-5 space-y-5 overflow-y-auto text-sm scrollbar-thin">
        <section>
          <h4 class="mb-2 text-xs font-semibold tracking-wider text-blue-400 uppercase">1. Service Description</h4>
          <p class="leading-relaxed text-gray-400">Financial Manager is a personal finance tracking application that allows users to track expenses, set budgets, and gain insights into their financial habits.</p>
        </section>
        <div class="border-t border-gray-700"></div>
        <section>
          <h4 class="mb-2 text-xs font-semibold tracking-wider text-blue-400 uppercase">2. User Accounts</h4>
          <p class="leading-relaxed text-gray-400">Users are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account.</p>
        </section>
        <div class="border-t border-gray-700"></div>
        <section>
          <h4 class="mb-2 text-xs font-semibold tracking-wider text-blue-400 uppercase">3. Acceptable Use</h4>
          <p class="leading-relaxed text-gray-400">Users agree not to use the service for any illegal purposes or in any way that could damage, disable, or impair the service.</p>
        </section>
        <div class="border-t border-gray-700"></div>
        <section>
          <h4 class="mb-2 text-xs font-semibold tracking-wider text-blue-400 uppercase">4. Data Storage</h4>
          <p class="leading-relaxed text-gray-400">User data is stored securely and will be maintained as long as the account is active. Users can delete their data at any time.</p>
        </section>
        <div class="border-t border-gray-700"></div>
        <section>
          <h4 class="mb-2 text-xs font-semibold tracking-wider text-blue-400 uppercase">5. Termination</h4>
          <p class="leading-relaxed text-gray-400">We reserve the right to terminate or suspend access to our service immediately, without prior notice, for any reason.</p>
        </section>
        <div class="border-t border-gray-700"></div>
        <section>
          <h4 class="mb-2 text-xs font-semibold tracking-wider text-blue-400 uppercase">6. Disclaimers</h4>
          <p class="leading-relaxed text-gray-400">The service is provided "as is" without warranties of any kind. We are not responsible for any financial decisions made based on the information provided by the application.</p>
        </section>
        <div class="border-t border-gray-700"></div>
        <section>
          <h4 class="mb-2 text-xs font-semibold tracking-wider text-blue-400 uppercase">7. Changes to Terms</h4>
          <p class="leading-relaxed text-gray-400">We may modify these terms at any time. Continued use of the service after any modifications indicates acceptance of the modified terms.</p>
        </section>
      </div>

      <!-- Footer -->
      <div class="flex-shrink-0 px-6 py-4 border-t border-gray-700">
        <button
          type="button"
          class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white transition-all duration-200"
          @click="$emit('close')"
        >
          I understand
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'close'): void
}>();
</script>