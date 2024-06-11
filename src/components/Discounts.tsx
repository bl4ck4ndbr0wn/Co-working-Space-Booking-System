export const applyDiscount = (hours: number, amount: number): number => {
  if (hours > 3) {
    return amount * 0.9;
  }
  return amount;
};
