enum TRANSACTION_STATUS {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}

export const TRANSACTION_STATUS_DISPLAY = {
  [TRANSACTION_STATUS.OPEN]: 'Abierto',
  [TRANSACTION_STATUS.CLOSE]: 'Cerrado',
};

export const TRANSACTION_STATUS_ITEMS = Object.keys(
  TRANSACTION_STATUS_DISPLAY
).map((key: string) => {
  return {
    value: key,
    name: TRANSACTION_STATUS_DISPLAY[
      key as keyof typeof TRANSACTION_STATUS_DISPLAY
    ],
  };
});

export default TRANSACTION_STATUS;
