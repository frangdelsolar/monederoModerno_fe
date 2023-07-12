enum TRANSACTION_TYPES {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export const TRANSACTION_TYPES_DISPLAY = {
  [TRANSACTION_TYPES.INCOME]: 'Ingreso',
  [TRANSACTION_TYPES.EXPENSE]: 'Gasto',
};

export const TRANSACTION_TYPE_ITEMS = Object.keys(
  TRANSACTION_TYPES_DISPLAY
).map((key: string) => {
  return {
    value: key,
    name: TRANSACTION_TYPES_DISPLAY[
      key as keyof typeof TRANSACTION_TYPES_DISPLAY
    ],
  };
});

export default TRANSACTION_TYPES;
