"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, refetchOnMount: false },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>
          <div className="w-full flex-col items-stretch">
            <nav className="flex flex-row gap-2 p-4 bg-slate-800">
              <Link className="border px-2 py-1 rounded-md" href={`/`}>
                All Employees
              </Link>

              <Link
                className="border px-2 py-1 rounded-md"
                href={`/employee/create`}
              >
                Create Employee
              </Link>
            </nav>
            {children}
          </div>
        </body>
      </QueryClientProvider>
    </html>
  );
}
