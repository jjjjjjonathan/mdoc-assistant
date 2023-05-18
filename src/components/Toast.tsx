import classNames from "classnames";

export type ToastProps = {
  status: string;
  message: string;
  clearToast: () => void;
};

const Toast = ({ status, message, clearToast }: ToastProps) => {
  const alertClasses = classNames("alert", {
    "alert-success": status === "success",
    "alert-warning": status === "warning",
    "alert-error": status === "error",
  });
  return (
    <div className="toast-start toast">
      {status === "success" || status === "warning" || status === "error" ? (
        <div className={alertClasses}>
          <div className="flex flex-row items-center justify-around">
            <span>{message}</span>
            <button className="btn-ghost btn" onClick={() => clearToast()}>
              X
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Toast;
