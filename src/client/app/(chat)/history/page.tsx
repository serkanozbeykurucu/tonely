"use client";

import { motion } from "framer-motion";
import { Clock, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/Input";

const MOCK_HISTORY = [
  { id: 1, candidate: "Alex Johnson", role: "Frontend Engineer", company: "Stripe", date: "2 mins ago", tone: "Professional" },
  { id: 2, candidate: "Sarah Williams", role: "Product Manager", company: "Airbnb", date: "1 hour ago", tone: "Enthusiastic" },
  { id: 3, candidate: "Michael Chen", role: "VP of Engineering", company: "Netflix", date: "Yesterday", tone: "Direct" },
  { id: 4, candidate: "Emma Davis", role: "UX Designer", company: "Google", date: "2 days ago", tone: "Persuasive" },
];

export default function HistoryPage() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-6 py-8 w-full max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-display font-medium text-[var(--text)] mb-2">Generation History</h1>
          <p className="text-sm text-[var(--text-secondary)]">Review and copy your previously generated outreach messages.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-64">
            <Input 
              placeholder="Search history..." 
              icon={<Search size={16} />}
              className="!h-10 text-sm"
            />
          </div>
          <button className="glass h-10 px-4 rounded-[var(--radius-md)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">
            <Filter size={16} />
          </button>
        </div>
      </div>

      <div className="glass rounded-[var(--radius-lg)] overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-[var(--border)] bg-[var(--bg-elevated)] text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
          <div className="col-span-4">Candidate</div>
          <div className="col-span-3">Target Role</div>
          <div className="col-span-3">Tone</div>
          <div className="col-span-2 text-right">Generated</div>
        </div>

        <div className="flex flex-col divide-y divide-[var(--border)]">
          {MOCK_HISTORY.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[var(--bg-hover)] transition-colors cursor-pointer group"
            >
              <div className="col-span-4 flex flex-col">
                <span className="text-sm font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">{item.candidate}</span>
                <span className="text-xs text-[var(--text-muted)]">{item.company}</span>
              </div>
              <div className="col-span-3 text-sm text-[var(--text-secondary)]">
                {item.role}
              </div>
              <div className="col-span-3 flex items-center">
                <span className="text-xs font-medium px-2 py-1 bg-[var(--accent-muted)] rounded-md text-[var(--accent-light)] border border-[var(--border-accent)]">
                  {item.tone}
                </span>
              </div>
              <div className="col-span-2 flex items-center justify-end gap-2 text-sm text-[var(--text-muted)]">
                <Clock size={14} />
                {item.date}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}