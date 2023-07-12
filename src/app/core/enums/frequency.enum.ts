enum FREQUENCIES {
  ONEOFF = 'ONEOFF',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export const FREQUENCIES_DISPLAY = {
  [FREQUENCIES.ONEOFF]: 'Única vez',
  [FREQUENCIES.MONTHLY]: 'Mensual',
  [FREQUENCIES.YEARLY]: 'Anual',
};

export const FREQUENCY_ITEMS = Object.keys(FREQUENCIES_DISPLAY).map(
  (key: string) => {
    return {
      value: key,
      name: FREQUENCIES_DISPLAY[key as keyof typeof FREQUENCIES_DISPLAY],
    };
  }
);

export default FREQUENCIES;
