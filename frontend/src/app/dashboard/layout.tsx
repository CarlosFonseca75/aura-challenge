import { AuthProvider } from "@/common/Providers";
import { Nav } from "@/components/common/Nav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Nav />
      {children}
    </AuthProvider>
  );
}
