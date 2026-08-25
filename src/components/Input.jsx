import React, { useId } from "react";

function Input(
  { label, type = "text", className = "", error, required, ...props },
  ref,
) {
  const id = useId();

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label
          htmlFor={id}
          className="block text-[13px] font-medium text-slate-600 dark:text-slate-400"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative gpu-layer">
        <input
          id={id}
          type={type}
          ref={ref}
          required={required}
          className={`w-full px-4 py-2.5 text-sm bg-slate-50/50 dark:bg-[#040405] text-slate-900 dark:text-slate-100 border rounded-xl outline-none transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm focus:shadow-md focus:bg-white dark:focus:bg-slate-900/40 ${
            error
              ? "border-red-300 dark:border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          } ${className}`}
          {...props}
        />
      </div>

      {error && (
        <p className="text-xs font-medium text-red-500 mt-1 animate-pulse">
          {error}
        </p>
      )}
    </div>
  );
}

export default React.forwardRef(Input);
