export const currencyFormat = (amount: number | string): string => {
  return amount.toLocaleString('ja-JP');
}

export const sortByNewest = (a: { createdAt: Date }, b: { createdAt: Date }) => {
  return a.createdAt > b.createdAt ? -1 : 1;
}