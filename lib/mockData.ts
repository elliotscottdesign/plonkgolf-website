// Placeholder data so the admin UI looks alive. Replaced with real DB calls
// once Supabase is wired in.

export type Venue = { id: "hackney" | "borough"; name: string };

export const VENUES: Venue[] = [
  { id: "hackney", name: "Plonk Hackney" },
  { id: "borough", name: "Plonk Borough Market" },
];

export type Ticket = {
  id: string;
  venueId: Venue["id"];
  name: string;
  pricePence: number;
  vatRatePct: number;
  active: boolean;
  sortOrder: number;
};

export const TICKETS: Ticket[] = [
  { id: "t1", venueId: "hackney", name: "Adult — 1 round", pricePence: 1100, vatRatePct: 20, active: true, sortOrder: 1 },
  { id: "t2", venueId: "hackney", name: "Child (under 16) — 1 round", pricePence: 800, vatRatePct: 20, active: true, sortOrder: 2 },
  { id: "t3", venueId: "hackney", name: "Pool — 30 mins", pricePence: 500, vatRatePct: 20, active: true, sortOrder: 3 },
  { id: "t4", venueId: "borough", name: "Adult — 1 round", pricePence: 1300, vatRatePct: 20, active: true, sortOrder: 1 },
  { id: "t5", venueId: "borough", name: "Child (under 16) — 1 round", pricePence: 1000, vatRatePct: 20, active: true, sortOrder: 2 },
  { id: "t6", venueId: "borough", name: "Pool — 30 mins", pricePence: 500, vatRatePct: 20, active: true, sortOrder: 3 },
];

export type Addon = {
  id: string;
  venueId: Venue["id"] | "all";
  name: string;
  pricePence: number;
  active: boolean;
};

export const ADDONS: Addon[] = [
  { id: "a1", venueId: "all", name: "Round of cocktails (4)", pricePence: 2400, active: true },
  { id: "a2", venueId: "hackney", name: "Two tacos — Taco Mates", pricePence: 800, active: true },
  { id: "a3", venueId: "all", name: "Bottle of prosecco", pricePence: 2500, active: true },
  { id: "a4", venueId: "borough", name: "Bottle of house red", pricePence: 2200, active: true },
];

export type Booking = {
  id: string;
  reference: string;
  venueId: Venue["id"];
  slotTime: string; // ISO
  partySize: number;
  totalPence: number;
  customerName: string;
  customerEmail: string;
  status: "confirmed" | "cancelled" | "refunded";
  createdAt: string;
};

const today = new Date();
const day = (offset: number, h: number, m: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + offset);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};

export const BOOKINGS: Booking[] = [
  { id: "b1", reference: "PLNK-A47K", venueId: "hackney", slotTime: day(0, 18, 30), partySize: 4, totalPence: 4400, customerName: "Sam Patel", customerEmail: "sam.p@example.com", status: "confirmed", createdAt: day(-1, 10, 0) },
  { id: "b2", reference: "PLNK-B92M", venueId: "borough", slotTime: day(0, 19, 0), partySize: 6, totalPence: 7800, customerName: "Jamie O'Connell", customerEmail: "j.oconnell@example.com", status: "confirmed", createdAt: day(-1, 14, 22) },
  { id: "b3", reference: "PLNK-C13X", venueId: "hackney", slotTime: day(1, 17, 30), partySize: 2, totalPence: 2200, customerName: "Priya Shah", customerEmail: "priya.shah@example.com", status: "confirmed", createdAt: day(-2, 9, 5) },
  { id: "b4", reference: "PLNK-D55R", venueId: "hackney", slotTime: day(1, 18, 0), partySize: 3, totalPence: 3300, customerName: "Marco Bianchi", customerEmail: "marco.b@example.com", status: "cancelled", createdAt: day(-3, 19, 47) },
  { id: "b5", reference: "PLNK-E08H", venueId: "borough", slotTime: day(2, 20, 15), partySize: 5, totalPence: 6500, customerName: "Aoife Murphy", customerEmail: "aoife@example.com", status: "confirmed", createdAt: day(-1, 11, 12) },
  { id: "b6", reference: "PLNK-F21Q", venueId: "borough", slotTime: day(2, 21, 0), partySize: 4, totalPence: 5200, customerName: "Tomás Reyes", customerEmail: "tomas.r@example.com", status: "refunded", createdAt: day(-4, 8, 30) },
  { id: "b7", reference: "PLNK-G77L", venueId: "hackney", slotTime: day(3, 19, 30), partySize: 6, totalPence: 6600, customerName: "Hannah Lee", customerEmail: "hannah.lee@example.com", status: "confirmed", createdAt: day(-2, 15, 0) },
  { id: "b8", reference: "PLNK-H03N", venueId: "hackney", slotTime: day(4, 20, 0), partySize: 2, totalPence: 2200, customerName: "Oliver Bennett", customerEmail: "oli.b@example.com", status: "confirmed", createdAt: day(-3, 17, 18) },
  { id: "b9", reference: "PLNK-I46S", venueId: "borough", slotTime: day(5, 18, 45), partySize: 4, totalPence: 5200, customerName: "Yuki Tanaka", customerEmail: "yuki.t@example.com", status: "confirmed", createdAt: day(-1, 20, 30) },
  { id: "b10", reference: "PLNK-J19P", venueId: "hackney", slotTime: day(6, 19, 0), partySize: 5, totalPence: 5500, customerName: "Adaeze Okafor", customerEmail: "ada.o@example.com", status: "confirmed", createdAt: day(-1, 7, 50) },
  { id: "b11", reference: "PLNK-K88W", venueId: "borough", slotTime: day(7, 17, 30), partySize: 6, totalPence: 7800, customerName: "Lucas Schmidt", customerEmail: "l.schmidt@example.com", status: "confirmed", createdAt: day(-5, 13, 5) },
  { id: "b12", reference: "PLNK-L34V", venueId: "hackney", slotTime: day(8, 18, 30), partySize: 3, totalPence: 3300, customerName: "Nadia Karim", customerEmail: "nadia.k@example.com", status: "confirmed", createdAt: day(-2, 16, 12) },
];

export type Voucher = {
  id: string;
  code: string;
  valuePence: number;
  balancePence: number;
  expiresAt: string;
  issuedTo?: string;
  status: "active" | "redeemed" | "expired";
};

export const VOUCHERS: Voucher[] = [
  { id: "v1", code: "GIFT-X8KQ-2P9R", valuePence: 5000, balancePence: 3300, expiresAt: day(330, 23, 59), issuedTo: "Priya Shah", status: "active" },
  { id: "v2", code: "GIFT-N4LM-5T1Y", valuePence: 10000, balancePence: 10000, expiresAt: day(350, 23, 59), issuedTo: "Marco Bianchi", status: "active" },
  { id: "v3", code: "GIFT-Z3VC-7W2H", valuePence: 2500, balancePence: 0, expiresAt: day(120, 23, 59), issuedTo: "Aoife Murphy", status: "redeemed" },
];

export type PromoCode = {
  id: string;
  code: string;
  kind: "percent" | "fixed";
  value: number;
  validFrom: string;
  validTo: string;
  maxUses?: number;
  uses: number;
  active: boolean;
};

export const PROMOS: PromoCode[] = [
  { id: "p1", code: "FRIDAY20", kind: "percent", value: 20, validFrom: day(-30, 0, 0), validTo: day(60, 23, 59), maxUses: 200, uses: 42, active: true },
  { id: "p2", code: "STUDENT10", kind: "percent", value: 10, validFrom: day(-365, 0, 0), validTo: day(365, 23, 59), uses: 318, active: true },
  { id: "p3", code: "LAUNCH5", kind: "fixed", value: 500, validFrom: day(-90, 0, 0), validTo: day(-1, 23, 59), maxUses: 100, uses: 87, active: false },
];

export type OpeningHour = {
  venueId: Venue["id"];
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6; // Sun-Sat
  openTime: string; // "HH:MM"
  closeTime: string;
  closed: boolean;
};

const W = (venueId: Venue["id"], hours: { open: string; close: string; closed?: boolean }[]) =>
  hours.map((h, i) => ({ venueId, day: i as 0 | 1 | 2 | 3 | 4 | 5 | 6, openTime: h.open, closeTime: h.close, closed: !!h.closed }));

export const OPENING_HOURS: OpeningHour[] = [
  ...W("hackney", [
    { open: "12:00", close: "22:00" }, // Sun
    { open: "17:00", close: "22:00" }, // Mon
    { open: "17:00", close: "22:00" }, // Tue
    { open: "17:00", close: "22:00" }, // Wed
    { open: "17:00", close: "22:00" }, // Thu
    { open: "17:00", close: "23:30" }, // Fri
    { open: "12:00", close: "23:30" }, // Sat
  ]),
  ...W("borough", [
    { open: "12:00", close: "22:00" }, // Sun
    { open: "17:00", close: "22:30" }, // Mon
    { open: "17:00", close: "22:30" }, // Tue
    { open: "17:00", close: "23:00" }, // Wed
    { open: "17:00", close: "23:00" }, // Thu
    { open: "16:00", close: "00:00" }, // Fri
    { open: "12:00", close: "00:00" }, // Sat
  ]),
];

export type ClosedDate = {
  id: string;
  venueId: Venue["id"] | "all";
  date: string; // YYYY-MM-DD
  reason: string;
};

const isoDate = (offset: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
};

export const CLOSED_DATES: ClosedDate[] = [
  { id: "c1", venueId: "all", date: "2026-12-25", reason: "Christmas Day" },
  { id: "c2", venueId: "all", date: "2026-12-26", reason: "Boxing Day" },
  { id: "c3", venueId: "hackney", date: isoDate(14), reason: "Private hire" },
];

export type SlotOverride = {
  id: string;
  venueId: Venue["id"];
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  capacity: number;
  reason: string;
};

export const SLOT_OVERRIDES: SlotOverride[] = [
  { id: "s1", venueId: "hackney", date: isoDate(20), startTime: "12:00", endTime: "16:00", capacity: 8, reason: "Bank holiday — extra demand" },
  { id: "s2", venueId: "borough", date: isoDate(5), startTime: "20:00", endTime: "21:00", capacity: 4, reason: "Hole 7 maintenance" },
];

export type EmailTemplate = {
  id: string;
  key: "booking_confirmation" | "voucher_delivery" | "refund_confirmation";
  label: string;
  subject: string;
  body: string;
};

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "e1",
    key: "booking_confirmation",
    label: "Booking confirmation",
    subject: "Your Plonk booking is confirmed",
    body:
      "Hey {{first_name}},\n\nYour Plonk booking is confirmed.\n\nWhen: {{slot_time}}\nWhere: {{venue_name}}\nParty: {{party_size}} people\nReference: {{reference}}\n\nShow this email at the bar when you arrive. See you on the greens!\n\n— The Plonk team",
  },
  {
    id: "e2",
    key: "voucher_delivery",
    label: "Gift voucher delivery",
    subject: "Your Plonk gift voucher",
    body:
      "Hi {{recipient_name}},\n\n{{sender_name}} has sent you a Plonk gift voucher worth £{{value}}.\n\nVoucher code: {{voucher_code}}\nExpires: {{expires_at}}\n\nRedeem it at plonkgolf.co.uk against any ticket at either venue.\n\n— The Plonk team",
  },
  {
    id: "e3",
    key: "refund_confirmation",
    label: "Refund confirmation",
    subject: "Your Plonk refund has been processed",
    body:
      "Hi {{first_name}},\n\nWe've processed a refund of £{{amount}} against your booking {{reference}}. It should land back on your card within 5–10 working days.\n\nIf you have any questions, just reply to this email.\n\n— The Plonk team",
  },
];

// helpers --------------------------------------------------------------

export const fmtMoney = (pence: number) =>
  `£${(pence / 100).toFixed(2)}`;

export const fmtDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
};

export const fmtTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
};

export const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
