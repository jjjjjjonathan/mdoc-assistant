import classNames from "classnames";

export type ToastProps = {
  status: string;
  message: string;
};

const Toast = ({ status, message }: ToastProps) => {
  const alertClasses = classNames("alert", {
    "alert-success": status === "success",
    "alert-warning": status === "warning",
    "alert-error": status === "error",
  });
  return (
    <div className="toast-start toast">
      {status && (
        <div className={alertClasses}>
          <div>
            <span>{message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Toast;
