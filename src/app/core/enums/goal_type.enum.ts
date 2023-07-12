enum GOAL_TYPES {
  NOGOAL = 'NOGOAL',
  AMOUNT = 'AMOUNT',
  CALENDAR = 'CALENDAR',
  REPETITIONS = 'REPETITIONS',
}

export const GOAL_TYPES_DISPLAY = {
  [GOAL_TYPES.NOGOAL]: 'No se termina',
  [GOAL_TYPES.AMOUNT]: 'Termina cuando se alcanza un monto',
  [GOAL_TYPES.CALENDAR]: 'Termina cuando se alcanza una fecha',
  [GOAL_TYPES.REPETITIONS]:
    'Termina cuando se alcanza un número de repeticiones',
};

export const GOAL_TYPE_ITEMS = Object.keys(GOAL_TYPES_DISPLAY).map(
  (key: string) => {
    return {
      value: key,
      name: GOAL_TYPES_DISPLAY[key as keyof typeof GOAL_TYPES_DISPLAY],
    };
  }
);

export default GOAL_TYPES;
