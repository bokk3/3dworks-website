"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle, Circle, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { ContactMessage } from "@/app/actions/admin";

interface MessagesOverviewProps {
  messages: ContactMessage[];
  onStatusChange?: (id: string, status: "new" | "replied") => void;
}

export function MessagesOverview({
  messages: initialMessages,
  onStatusChange,
}: MessagesOverviewProps) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [filterStatus, setFilterStatus] = useState<"all" | "new" | "replied">("all");

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const filteredMessages = messages.filter((msg) => {
    if (filterStatus === "all") return true;
    return msg.status === filterStatus;
  });

  const handleStatusChange = (id: string, status: "new" | "replied") => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, status } : msg))
    );
    onStatusChange?.(id, status);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold flex items-center gap-2">
            <Mail className="text-cyan-500" size={24} />
            Contact Messages
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredMessages.length} message{filteredMessages.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Filter */}
        <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as any)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Messages</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="replied">Replied</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-xl">
            <p className="text-muted-foreground">No messages found.</p>
          </div>
        ) : (
          filteredMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "glass-card p-6 rounded-xl",
                message.status === "new" && "border-l-4 border-cyan-500"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{message.name}</h3>
                    <span className="text-sm text-muted-foreground">
                      {message.email}
                    </span>
                    {message.status === "new" && (
                      <span className="px-2 py-1 text-xs bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(message.timestamp).toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    handleStatusChange(
                      message.id,
                      message.status === "new" ? "replied" : "new"
                    )
                  }
                >
                  {message.status === "new" ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Replied
                    </>
                  ) : (
                    <>
                      <Circle className="mr-2 h-4 w-4" />
                      Mark as New
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-1">Message:</p>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>

                {message.projectType && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    {message.projectType && (
                      <div>
                        <span className="text-muted-foreground">Type:</span>{" "}
                        <span className="font-medium">{message.projectType}</span>
                      </div>
                    )}
                    {message.complexity && (
                      <div>
                        <span className="text-muted-foreground">Complexity:</span>{" "}
                        <span className="font-medium">{message.complexity}</span>
                      </div>
                    )}
                    {message.material && (
                      <div>
                        <span className="text-muted-foreground">Material:</span>{" "}
                        <span className="font-medium">{message.material}</span>
                      </div>
                    )}
                    {message.quantity && (
                      <div>
                        <span className="text-muted-foreground">Quantity:</span>{" "}
                        <span className="font-medium">{message.quantity}</span>
                      </div>
                    )}
                  </div>
                )}

                {message.files && message.files.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Attached Files:</p>
                    <div className="flex flex-wrap gap-2">
                      {message.files.map((file, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded-md"
                        >
                          {file}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

