import React, { useEffect, useState } from "react";
import contactMessageService from "../Services/contact_messages.Services";

function AdminInbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await contactMessageService.DiscoverMessage({});

        const newMessages = response?.data?.updatedStatus?.filtered || [];
        setMessages(newMessages);
      } catch (err) {
        const backendMessage = err?.response?.data?.message || "";
        if (
          backendMessage.includes("Zero Message") ||
          err?.response?.status === 404
        ) {
          setMessages([]);
          setError("");
        } else {
          setError("Their is Zero Messages");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-transparent text-primary-600 dark:text-primary-400 font-black tracking-widest uppercase text-[10px] sm:text-xs transition-colors duration-500">
        <div className="relative flex items-center justify-center w-12 h-12 mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-primary-400 opacity-20 animate-ping"></div>
          <svg
            className="w-8 h-8 animate-spin text-primary-500 opacity-80"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-20"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-100"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        Decrypting Secure Transmissions...
      </div>
    );

  return (
    <div className="relative w-full px-4 py-8 sm:py-12 mx-auto max-w-7xl animate-[slideDown_0.4s_ease-out] isolate">
      <div className="flex flex-col items-start gap-6 mb-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 shadow-sm gpu-layer cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-primary-700 dark:text-primary-400 uppercase">
              Secure Terminal
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Transmission Inbox
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-2xl">
            Review incoming contact payloads. Data packets are automatically
            decrypted and marked as read upon discovery. Close this terminal to
            burn history.
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 p-4 mb-8 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-2xl transform-gpu animate-[slideDown_0.3s_ease-out]">
          <svg
            className="w-5 h-5 mt-0.5 shrink-0 text-red-600 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div className="flex flex-col">
            <span className="text-[10px] font-black tracking-widest text-red-800 dark:text-red-300 uppercase mb-0.5">
              System Alert
            </span>
            <span className="text-[13px] font-medium text-red-700 dark:text-red-400 leading-snug">
              {error}
            </span>
          </div>
        </div>
      )}

      {messages.length === 0 && !error ? (
        <div className="flex flex-col items-center justify-center w-full py-24 px-4 border-2 border-dashed border-slate-200 dark:border-slate-800/80 rounded-[2.5rem] bg-white/50 dark:bg-[#040405]/50 backdrop-blur-xl shadow-sm gpu-layer">
          <div className="p-5 mb-5 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-inner">
            <svg
              className="w-10 h-10 text-slate-400 dark:text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-50 mb-2 tracking-tight">
            Inbox Zero
          </h3>
          <p className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-500 uppercase text-center">
            No new transmissions detected in the sector.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="relative flex flex-col p-6 sm:p-8 bg-white/80 dark:bg-[#040405]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-none gpu-layer transform-gpu hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group isolate"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex flex-col overflow-hidden pr-4">
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-50 tracking-tight truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {msg.name}
                  </h3>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-[11px] font-black tracking-widest text-slate-400 dark:text-slate-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors uppercase mt-1 truncate"
                  >
                    {msg.email}
                  </a>
                </div>

                <div className="inline-flex shrink-0 items-center px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-800/50 shadow-sm gpu-layer">
                  <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">
                    Unread
                  </span>
                </div>
              </div>

              <div className="relative grow p-5 bg-slate-50/80 dark:bg-[#0a0a0c]/50 border border-slate-200 dark:border-slate-800/80 rounded-2xl group-hover:border-primary-200 dark:group-hover:border-primary-900/30 transition-colors duration-300">
                <p className="text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminInbox;
