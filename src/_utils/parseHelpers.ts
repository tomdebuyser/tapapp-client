function parseDecimal(value, options): string {
  return parseFloat(value).toLocaleString('nl-BE', {
    maximumFractionDigits: 2,
    ...options,
  });
}

export function parseCurrency(value): string {
  return `€ ${parseDecimal(value / 100, { minimumFractionDigits: 2 })}`;
}
