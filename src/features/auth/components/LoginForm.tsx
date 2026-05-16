"use client";

import React, { useState } from "react";
import { RefreshCcw, Eye, EyeOff } from "lucide-react";
import { authenticate } from "@/features/auth/actions/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  // Form States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();

  const handleReset = () => {
    setUsername("");
    setPassword("");
    setMessage(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const result = await authenticate("/auth/login", { username, password });
      if (Number(result.status) === 1) {
        setMessage({ type: "success", text: result.message });
        if (result.token) {
          localStorage.setItem("bukutulis_auth_token", result.token);
          localStorage.setItem("username", username);
        }
        // Redirect to dashboard mainpage
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500); // Slight delay to show success message
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
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-700">
          Welcome
        </h2>
      </div>
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-1 relative group">
            <Label
              htmlFor="username"
              className="text-xs font-semibold text-zinc-500 uppercase tracking-wider transition-colors group-focus-within:text-[#434E78]"
            >
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border-t-0 border-x-0 border-b border-zinc-300 rounded-none bg-transparent dark:bg-transparent shadow-none focus-visible:ring-0 focus-visible:border-b-[#434E78] transition-all duration-300 placeholder:text-zinc-400"
            />
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#434E78] transition-all duration-300 group-focus-within:w-full" />
          </div>

          <div className="space-y-1 relative group">
            <Label
              htmlFor="password"
              className="text-xs font-semibold text-zinc-500 uppercase tracking-wider transition-colors group-focus-within:text-[#434E78]"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pr-10 border-t-0 border-x-0 border-b border-zinc-300 rounded-none bg-transparent dark:bg-transparent shadow-none focus-visible:ring-0 focus-visible:border-b-[#434E78] transition-all duration-300 placeholder:text-zinc-400"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 bottom-0 h-10 w-10 hover:bg-transparent text-zinc-500 hover:text-zinc-700"
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
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#434E78] transition-all duration-300 group-focus-within:w-full" />
            </div>
          </div>
        </div>

        {message && (
          <div className={`p-3 rounded-md text-sm animate-fade-in ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
            }`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="flex gap-2 border-zinc-200 hover:bg-zinc-50 transition-colors"
          >
            <RefreshCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-[#434E78] hover:bg-[#323b5c] text-white transition-colors shadow-md"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </div>
  );
}
