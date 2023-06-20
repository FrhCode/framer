import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Link href={"/"}>Home</Link>
      {children}
    </div>
  );
}
