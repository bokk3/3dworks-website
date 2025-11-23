"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessagesOverview } from "@/components/admin/MessagesOverview";
import { QuotesOverview } from "@/components/admin/QuotesOverview";
import { verifyAdminPassword, setAdminSession, checkAdminSession, clearAdminSession } from "@/app/actions/admin";
import type { ContactMessage, QuoteRequest } from "@/app/actions/admin";

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);

  useEffect(() => {
    // Check authentication status
    checkAdminSession().then((authenticated) => {
      setIsAuthenticated(authenticated);
      if (authenticated) {
        loadData();
      }
    });
  }, []);

  const loadData = () => {
    // Load messages and quotes from localStorage (in production, this would be from a database)
    if (typeof window !== "undefined") {
      const savedMessages = localStorage.getItem("contactMessages");
      const savedQuotes = localStorage.getItem("quoteRequests");
      
      if (savedMessages) {
        try {
          setMessages(JSON.parse(savedMessages));
        } catch (e) {
          console.error("Error parsing messages:", e);
        }
      }
      
      if (savedQuotes) {
        try {
          setQuotes(JSON.parse(savedQuotes));
        } catch (e) {
          console.error("Error parsing quotes:", e);
        }
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const isValid = await verifyAdminPassword(password);
    if (isValid) {
      await setAdminSession();
      setIsAuthenticated(true);
      loadData();
    } else {
      setError("Invalid password");
    }
  };

  const handleLogout = async () => {
    await clearAdminSession();
    setIsAuthenticated(false);
    setMessages([]);
    setQuotes([]);
  };

  const handleMessageStatusChange = (id: string, status: "new" | "replied") => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, status } : msg))
    );
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "contactMessages",
        JSON.stringify(
          messages.map((msg) => (msg.id === id ? { ...msg, status } : msg))
        )
      );
    }
  };

  const handleQuoteStatusChange = (id: string, status: "new" | "replied") => {
    setQuotes((prev) =>
      prev.map((quote) => (quote.id === id ? { ...quote, status } : quote))
    );
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "quoteRequests",
        JSON.stringify(
          quotes.map((quote) => (quote.id === id ? { ...quote, status } : quote))
        )
      );
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-cyan-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-xl max-w-md w-full space-y-6"
        >
          <div className="text-center space-y-2">
            <Lock className="mx-auto text-cyan-500" size={48} />
            <h1 className="text-2xl font-display font-bold">Admin Login</h1>
            <p className="text-sm text-muted-foreground">
              Enter the admin password to access the dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="bg-white/5 border-white/10"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Button type="submit" className="w-full hover-glow-cyan">
              Login
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
      <div className="container max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage contact messages and quote requests
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-white/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <MessagesOverview
            messages={messages}
            onStatusChange={handleMessageStatusChange}
          />
          <QuotesOverview quotes={quotes} onStatusChange={handleQuoteStatusChange} />
        </div>
      </div>
    </div>
  );
}

