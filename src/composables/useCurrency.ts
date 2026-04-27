import { ref, computed } from 'vue';

const currency = ref<string>(getCurrencyFromStorage());

function getCurrencyFromStorage(): string {
  try {
    const cached = localStorage.getItem('userProfile');
    if (cached) return JSON.parse(cached).currency || '€';
  } catch {}
  return '€';
}

window.addEventListener('profileUpdated', (e: Event) => {
  const detail = (e as CustomEvent).detail;
  if (detail?.currency) currency.value = detail.currency;
});

export function useCurrency() {
  const symbol = computed(() => currency.value);

  const format = (amount: number) => `${amount.toFixed(2)} ${currency.value}`;

  return { symbol, format };
}
