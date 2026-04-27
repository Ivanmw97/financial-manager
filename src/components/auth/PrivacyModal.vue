<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
    <div class="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm" @click="$emit('close')"></div>

    <div class="relative w-full max-w-lg bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl flex flex-col max-h-[85vh]">

      <!-- Header -->
      <div class="px-6 pt-6 pb-4 border-b border-gray-700 flex items-center justify-between flex-shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-blue-600 bg-opacity-20 border border-blue-500 border-opacity-30 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h3 class="text-base font-semibold text-white">Privacy Policy</h3>
            <p class="text-xs text-gray-500 mt-0.5">Last updated: April 2025</p>
          </div>
        </div>
        <button class="text-gray-500 hover:text-gray-300 transition-colors" @click="$emit('close')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="overflow-y-auto px-6 py-5 space-y-5 text-sm flex-1">
        <section>
          <h4 class="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">1. Data Collection</h4>
          <p class="text-gray-400 leading-relaxed">We collect personal information such as your name, email address, and financial data that you choose to enter into the application.</p>
        </section>
        <div class="border-t border-gray-700"></div>
        <section>
          <h4 class="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">2. Data Usage</h4>
          <p class="text-gray-400 leading-relaxed">We use your data to provide and improve the service, including generating financial insights and personalized recommendations.</p>
        </section>
        <div class="border-t border-gray-700"></div>
        <section>
          <h4 class="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">3. Data Storage</h4>
          <p class="text-gray-400 leading-relaxed">Your data is stored securely in our database and is retained as long as your account is active or as needed to provide you services.</p>
        </section>
        <div class="border-t border-gray-700"></div>
        <section>
          <h4 class="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">4. Data Sharing</h4>
          <p class="text-gray-400 leading-relaxed">We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. Your financial data remains private.</p>
        </section>
        <div class="border-t border-gray-700"></div>
        <section>
          <h4 class="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">5. User Rights</h4>
          <p class="text-gray-400 leading-relaxed">You have the right to access, correct, or delete your personal data at any time through your account settings or by contacting us.</p>
        </section>
        <div class="border-t border-gray-700"></div>
        <section>
          <h4 class="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">6. Cookies</h4>
          <p class="text-gray-400 leading-relaxed">We use cookies to enhance your experience and analyze site usage. You can control cookies through your browser settings.</p>
        </section>
        <div class="border-t border-gray-700"></div>
        <section>
          <h4 class="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">7. Security Measures</h4>
          <p class="text-gray-400 leading-relaxed">We implement a variety of security measures to maintain the safety of your personal information, including encryption and secure database practices.</p>
        </section>
        <div class="border-t border-gray-700"></div>
        <section>
          <h4 class="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">8. Contact Information</h4>
          <p class="text-gray-400 leading-relaxed">If you have any questions regarding this privacy policy, you may contact us at <span class="text-blue-400">support@financialmanager.com</span>.</p>
        </section>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t border-gray-700 flex-shrink-0">
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