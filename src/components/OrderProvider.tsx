"use client";
import { createContext, useCallback, useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import { orderHref } from "@/lib/order";

type Ctx = { open: (subject: string) => void };
const OrderCtx = createContext<Ctx>({ open: () => {} });
export const useOrder = () => useContext(OrderCtx);

// "Order now" now opens the order page, with the chosen service or domain already filled in.
export default function OrderProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const open = useCallback((subject: string) => router.push(orderHref(subject)), [router]);
  const value = useMemo(() => ({ open }), [open]);
  return <OrderCtx.Provider value={value}>{children}</OrderCtx.Provider>;
}
