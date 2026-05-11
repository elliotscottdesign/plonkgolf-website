"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CalendarPopup from "./CalendarPopup";

const VENUES = [
  { id: "hackney", label: "Plonk Hackney" },
  { id: "borough", label: "Plonk Borough Market" },
] as const;

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function maxIso(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
}

function prettyDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const t = new Date(today);
  t.setDate(today.getDate() + 1);
  const isToday = d.toDateString() === today.toDateString();
  const isTomorrow = d.toDateString() === t.toDateString();
  if (isToday) return "Today";
  if (isTomorrow) return "Tomorrow";
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

export default function HeroBookingWidget() {
  const router = useRouter();
  const [venue, setVenue] = useState<"" | "hackney" | "borough">("");
  const [date, setDate] = useState<string>("");
  const [size, setSize] = useState<number>(0);

  const [openField, setOpenField] = useState<null | "venue" | "size">(null);
  const [calendarOpen, setCalendarOpen] = useState(false);

  function search() {
    const v = venue || "hackney";
    const params = new URLSearchParams();
    if (date) params.set("date", date);
    if (size > 0) params.set("size", String(size));
    const qs = params.toString();
    router.push(`/book/${v}${qs ? `?${qs}` : ""}`);
  }

  return (
    <>
      <div className="relative mx-auto hidden w-full max-w-3xl rounded-full bg-cream/95 p-1.5 shadow-2xl md:flex">
        {/* Where */}
        <Field
          label="Where"
          value={
            venue
              ? VENUES.find((v) => v.id === venue)?.label.replace("Plonk ", "")
              : "Choose venue"
          }
          placeholder={!venue}
          active={openField === "venue"}
          onClick={() => setOpenField(openField === "venue" ? null : "venue")}
        />
        {openField === "venue" && (
          <DropdownPanel onClose={() => setOpenField(null)} className="left-3">
            {VENUES.map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setVenue(v.id);
                  setOpenField(null);
                }}
                className="block w-full rounded-md px-3 py-2.5 text-left text-sm text-ink hover:bg-ink/5"
              >
                {v.label}
              </button>
            ))}
          </DropdownPanel>
        )}

        <Divider />

        {/* When */}
        <Field
          label="When"
          value={date ? prettyDate(date) : "Pick a date"}
          placeholder={!date}
          active={false}
          onClick={() => setCalendarOpen(true)}
        />

        <Divider />

        {/* Who */}
        <Field
          label="Who"
          value={size > 0 ? `${size} ${size === 1 ? "golfer" : "golfers"}` : "Party size"}
          placeholder={size === 0}
          active={openField === "size"}
          onClick={() => setOpenField(openField === "size" ? null : "size")}
        />
        {openField === "size" && (
          <DropdownPanel onClose={() => setOpenField(null)} className="left-1/2 -translate-x-1/2">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <button
                key={n}
                onClick={() => {
                  setSize(n);
                  setOpenField(null);
                }}
                className="block w-full rounded-md px-3 py-2.5 text-left text-sm text-ink hover:bg-ink/5"
              >
                {n} {n === 1 ? "golfer" : "golfers"}
              </button>
            ))}
          </DropdownPanel>
        )}

        {/* Search */}
        <button
          onClick={search}
          className="ml-auto inline-flex items-center gap-2 rounded-full bg-plonkPink px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-plonkPink/90"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Search
        </button>
      </div>

      {calendarOpen && (
        <CalendarPopup
          value={date || todayIso()}
          minIso={todayIso()}
          maxIso={maxIso()}
          onSelect={(iso) => {
            setDate(iso);
            setCalendarOpen(false);
          }}
          onClose={() => setCalendarOpen(false)}
        />
      )}
    </>
  );
}

function Field({
  label,
  value,
  placeholder,
  active,
  onClick,
}: {
  label: string;
  value: React.ReactNode;
  placeholder?: boolean;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex-1 rounded-full px-5 py-2.5 text-left transition ${
        active ? "bg-cream" : "hover:bg-cream"
      }`}
    >
      <p className="text-[11px] font-bold uppercase tracking-widest text-ink">{label}</p>
      <p
        className={`mt-0.5 text-sm font-medium ${
          placeholder ? "text-ink/55" : "text-ink"
        }`}
      >
        {value}
      </p>
    </button>
  );
}

function Divider() {
  return <div className="my-2 w-px bg-ink/15" aria-hidden />;
}

function DropdownPanel({
  children,
  onClose,
  className = "",
}: {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}) {
  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-10 cursor-default"
        aria-hidden
        onClick={onClose}
      />
      <div
        className={`absolute top-full z-20 mt-2 w-56 rounded-xl border border-ink/10 bg-cream p-2 shadow-xl ${className}`}
      >
        {children}
      </div>
    </>
  );
}
