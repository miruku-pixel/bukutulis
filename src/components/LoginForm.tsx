"use client";

import React, { useState } from "react";
import { Copy, Check, RefreshCcw, Eye, EyeOff } from "lucide-react";
import { authenticate } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function LoginForm() {
  const [mode, setMode] = useState<"token" | "login">("token");
  const [isFading, setIsFading] = useState(false);

  const animationClasses = `transition-all duration-300 ${isFading ? "opacity-0 -translate-x-4" : "opacity-100 translate-x-0"}`;

  // Form States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleModeChange = (checked: boolean) => {
    setIsFading(true);
    setTimeout(() => {
      setMode(checked ? "login" : "token");
      setIsFading(false);
      setMessage(null);
      setUsername("");
      setPassword("");
      if (checked) {
        setToken("");
      } else {
        setToken("");
      }
    }, 300);
  };

  const handleReset = () => {
    setUsername("");
    setPassword("");
    setToken("");
    setMessage(null);
  };

  const handleCopy = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleGetToken = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const result = await authenticate("/auth/login", { username, password, mode: "token" });
      if (result.status === 1) {
        setToken(result.data.token);
        setMessage({ type: "success", text: result.message });
      } else {
        setMessage({ type: "error", text: result.message || "Failed to get token" });
      }
    } catch (error) {
      console.error("Fetch token error:", error);
      setMessage({ type: "error", text: "An error occurred while fetching token" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const result = await authenticate("/auth/login", { username, password, token, mode: "login" });
      if (result.status === 1) {
        setMessage({ type: "success", text: result.message });
        console.log("Success login:", result.data);
      } else {
        setMessage({ type: "error", text: result.message || "Login failed" });
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage({ type: "error", text: "An error occurred during login" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between mb-2">

            <Switch
              id="mode-switch"
              checked={mode === "login"}
              onCheckedChange={handleModeChange}
            />
          </div>
          <CardTitle className={`text-2xl font-bold tracking-tight ${animationClasses}`}>
            {mode === "token" ? "Authentication" : "User Login"}
          </CardTitle>

        </CardHeader>
        <CardContent>
          <form onSubmit={mode === "token" ? handleGetToken : handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className={animationClasses}>Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={animationClasses}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className={animationClasses}>Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`${animationClasses} pr-10`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={`absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-zinc-500 hover:text-zinc-700 ${animationClasses}`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>

            {mode === "token" ? (
              <div className="space-y-2">
                <Label htmlFor="token-display" className={animationClasses}>Token</Label>
                <div className="flex gap-2">
                  <Input
                    id="token-display"
                    value={token}
                    readOnly
                    placeholder="Token will appear here"
                    className={`bg-zinc-50 dark:bg-zinc-900 font-mono text-xs ${animationClasses}`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleCopy}
                    disabled={!token}
                    className={animationClasses}
                  >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="token-input" className={animationClasses}>Bearer Token</Label>
                <Input
                  id="token-input"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Paste your token here"
                  required
                  className={`font-mono text-xs ${animationClasses}`}
                />
              </div>
            )}

            {message && (
              <div className={`p-3 rounded-md text-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                {message.text}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="flex gap-2"
              >
                <RefreshCcw className="h-4 w-4" />
                Reset
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Processing..." : mode === "token" ? "Get Token" : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
