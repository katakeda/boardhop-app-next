export const currencyFormat = (amount: number | string): string => {
  return amount.toLocaleString('ja-JP');
}