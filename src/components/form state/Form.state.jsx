export const INITIAL_STATE = {
  isValid: {
    // валидна ли форма, изначально форма валидна, так как ничего не введено
    title: true,
    text: true,
    date: true,
  },
  values: {
    // тоесть если значения не заданы - форма валидна
    title: "",
    text: "",
    date: "",
    tag: "",
  },
  // готова ли форма к сабмиту
  isFormReadyToSubmit: false,
};
export function formReducer(state, action) {
  switch (action.type) {
    case "CLEAR_FORM":
      return {
        ...state,
        values: INITIAL_STATE.values,
        isFormReadyToSubmit:false
      };
    case "RESET_VALIDITY":
      return {
        ...state,
        isValid: INITIAL_STATE.isValid,
      };
    case "SUBMIT":
      const titleValidity = state.values.title.trim().length;
      const textValidity = state.values.text.trim().length;
      const dateleValidity = state.values.date;
      return {
        ...state,
        isValid: {
          title: titleValidity,
          text: textValidity,
          date: dateleValidity,
        },
        isFormReadyToSubmit: titleValidity && textValidity && dateleValidity,
      };
    case "SET_VALUE":
      return {
        ...state, // 1. Копируем ВСЕ старые ключи (isValid, values, isFormReadyToSubmi
        values: { // 2. ПЕРЕЗАПИСЫВАЕМ только ключ "values" новым объектом
          ...state.values, // 3. Внутри values - копируем старые поля (title, text, date, tag)
          ...action.payload, // 4. Добавляем/обновляем новые поля
        },
      };
    case "SET_FORM":
      return {
        ...state,
        values: action.payload,
        isValid: INITIAL_STATE.isValid,
        isFormReadyToSubmit: false,
      };
    default:
      return state;
  }
}
