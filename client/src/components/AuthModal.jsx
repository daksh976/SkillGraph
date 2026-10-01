import { useState } from "react";
import {
  X,
  LogIn,
  UserPlus,
  Sparkles,
  CheckCircle,
} from "lucide-react";

import { useAuth } from "../context/AuthContext.jsx";

function AuthModal({
  isOpen,
  onClose,
  onSuccess,
}) {
  const { login, register } = useAuth();

  const [mode, setMode] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] =
    useState(false);

  if (!isOpen) {
    return null;
  }

  const isLogin =
    mode === "login";

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const switchMode = () => {
    setMode(
      isLogin
        ? "register"
        : "login"
    );

    resetForm();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (
      !email.trim() ||
      !password.trim()
    ) {
      setError(
        "Please enter your email and password."
      );

      return;
    }

    if (
      !isLogin &&
      !name.trim()
    ) {
      setError(
        "Please enter your name."
      );

      return;
    }

    try {
      setLoading(true);

      let response;

      if (isLogin) {
        response = await login(
          email.trim(),
          password
        );
      } else {
        response = await register(
          name.trim(),
          email.trim(),
          password
        );
      }

      if (onSuccess) {
        onSuccess(response);
      }

      resetForm();
      onClose();
    } catch (requestError) {
      const message =
        requestError?.response?.data
          ?.message ||
        "Something went wrong. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="auth-overlay"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
      >
        <button
          className="auth-close"
          onClick={onClose}
          aria-label="Close authentication modal"
        >
          <X size={18} />
        </button>

        <div className="auth-brand">
          <div className="auth-brand-icon">
            <Sparkles size={19} />
          </div>

          <span>
            SkillGraph
          </span>
        </div>

        <div className="auth-heading">
          <span className="section-label">
            {isLogin
              ? "WELCOME BACK"
              : "GET STARTED"}
          </span>

          <h2 id="auth-title">
            {isLogin
              ? "Welcome back."
              : "Create your account."}
          </h2>

          <p>
            {isLogin
              ? "Sign in to continue building your personalized career path."
              : "Create your SkillGraph account and start building your career path."}
          </p>
        </div>

        {error && (
          <div className="auth-error">
            <X size={15} />
            <span>{error}</span>
          </div>
        )}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          {!isLogin && (
            <div className="auth-field">
              <label htmlFor="auth-name">
                Full Name
              </label>

              <input
                id="auth-name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(
                    event.target.value
                  )
                }
                placeholder="Enter your name"
                autoComplete="name"
              />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="auth-email">
              Email
            </label>

            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="auth-password">
              Password
            </label>

            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Minimum 6 characters"
              autoComplete={
                isLogin
                  ? "current-password"
                  : "new-password"
              }
            />
          </div>

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="auth-spinner" />
                Please wait...
              </>
            ) : (
              <>
                {isLogin ? (
                  <LogIn size={17} />
                ) : (
                  <UserPlus size={17} />
                )}

                {isLogin
                  ? "Sign In"
                  : "Create Account"}
              </>
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <div className="auth-switch">
          <span>
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>

          <button
            type="button"
            onClick={switchMode}
          >
            {isLogin
              ? "Create account"
              : "Sign in"}
          </button>
        </div>

        <div className="auth-security">
          <CheckCircle size={14} />

          <span>
            Your account is securely connected
            to SkillGraph.
          </span>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
