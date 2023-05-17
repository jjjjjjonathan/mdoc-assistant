import { useReducer } from "react";
import type { ToastProps } from "~/components/Toast";

type ToastActions = {
  type: "SET_SUCCESS" | "SET_WARNING" | "SET_ERROR" | "CLEAR_TOAST";
  message: string;
};

const useToast = () => {
  const reducers = {
    SET_SUCCESS(state: ToastProps, action: ToastActions) {
      return { ...state, status: "success", message: action.message };
    },

    SET_WARNING(state: ToastProps, action: ToastActions) {
      return { ...state, status: "warning", message: action.message };
    },

    SET_ERROR(state: ToastProps, action: ToastActions) {
      return { ...state, status: "error", message: action.message };
    },

    CLEAR_TOAST(state: ToastProps, _action: ToastActions) {
      return { ...state, status: "", message: "" };
    },
  };

  const reducer = (state: ToastProps, action: ToastActions) => {
    return reducers[action.type](state, action) || state;
  };

  const [state, dispatch] = useReducer(reducer, {
    status: "",
    message: "",
  });

  return {
    toastStatus: state.status,
    toastMessage: state.message,
    dispatchToast: dispatch,
  };
};

export default useToast;
