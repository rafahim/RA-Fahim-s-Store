import Link from "next/link";
import { orderHref } from "@/lib/order";

export default function OrderButton({
  subject,
  className = "btn",
  children = "Order now",
}: {
  subject: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return <Link href={orderHref(subject)} className={className}>{children}</Link>;
}
