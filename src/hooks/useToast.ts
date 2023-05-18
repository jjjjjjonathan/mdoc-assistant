import { useReducer } from "react";

type ToastActions = {
  type: "SET_SUCCESS" | "SET_WARNING" | "SET_ERROR" | "CLEAR_TOAST";
  message: string;
};

type ToastState = {
  status: string;
  message: string;
};

const useToast = () => {
  const reducers = {
    SET_SUCCESS(state: ToastState, action: ToastActions) {
      return { ...state, status: "success", message: action.message };
    },

    SET_WARNING(state: ToastState, action: ToastActions) {
      return { ...state, status: "warning", message: action.message };
    },

    SET_ERROR(state: ToastState, action: ToastActions) {
      return { ...state, status: "error", message: action.message };
    },

    CLEAR_TOAST(state: ToastState, _action: ToastActions) {
      return { ...state, status: "", message: "" };
    },
  };

  const reducer = (state: ToastState, action: ToastActions) => {
    return reducers[action.type](state, action) || state;
  };

  const [state, dispatch] = useReducer(reducer, {
    status: "",
    message: "",
  });

  const clearToast = () => {
    dispatch({ type: "CLEAR_TOAST", message: "" });
  };

  return {
    toastStatus: state.status,
    toastMessage: state.message,
    dispatchToast: dispatch,
    clearToast,
  };
};

export default useToast;
