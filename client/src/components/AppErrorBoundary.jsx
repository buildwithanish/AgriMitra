import React from "react";

export default class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error?.message || "Unexpected application error"
    };
  }

  componentDidCatch(error) {
    console.error("AI Village Brain render error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(92,193,130,0.14),transparent_24%),linear-gradient(180deg,#f4fbf7_0%,#edf6ef_100%)] px-6 dark:bg-[radial-gradient(circle_at_top_left,rgba(92,193,130,0.14),transparent_24%),linear-gradient(180deg,#07170f_0%,#0b1f14_100%)]">
          <div className="w-full max-w-xl rounded-[32px] border border-white/70 bg-white/90 p-8 text-center shadow-[0_30px_90px_rgba(7,23,15,0.14)] backdrop-blur-2xl dark:border-white/10 dark:bg-primary-950/88">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-700 dark:text-primary-300">
              Application Error
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold text-slate-950 dark:text-white">
              The frontend hit a render issue
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Refresh once after the latest deployment. If the issue persists, check the browser console for the exact
              component error.
            </p>
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-left text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-200">
              {this.state.errorMessage}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
