enum BUDGET_GOAL_TYPES {
  AMOUNT = 'AMOUNT',
  PERCENTAGE = 'PERCENTAGE',
}

export const BUDGET_GOAL_TYPES_DISPLAY = {
  [BUDGET_GOAL_TYPES.AMOUNT]: 'Termina cuando se alcanza un monto',
  [BUDGET_GOAL_TYPES.PERCENTAGE]: 'Termina cuando se alcanza un porcentaje',
};

export const BUDGET_GOAL_TYPE_ITEMS = Object.keys(
  BUDGET_GOAL_TYPES_DISPLAY
).map((key: string) => {
  return {
    value: key,
    name: BUDGET_GOAL_TYPES_DISPLAY[
      key as keyof typeof BUDGET_GOAL_TYPES_DISPLAY
    ],
  };
});

export default BUDGET_GOAL_TYPES;
