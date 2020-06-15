export function parseNumber(value): number {
  return (value && Number(value)) || null;
}

export function parseDecimal(value, options): string {
  return parseFloat(value).toLocaleString('nl-BE', {
    maximumFractionDigits: 2,
    ...options,
  });
}

export function parseCurrency(value): string {
  return `€ ${parseDecimal(value, { minimumFractionDigits: 2 })}`;
}
