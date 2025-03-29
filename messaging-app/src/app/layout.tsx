import { Providers } from './providers';
import './globals.css';
import { Toaster } from "@/components/ui/sonner"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900">
        <Providers>{children}</Providers>
        <Toaster/>
      </body>
    </html>
  );
}