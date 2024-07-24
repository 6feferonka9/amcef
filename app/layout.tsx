import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils"
import ClientProvider from "./clientProvider";
import { getTodoCategories } from "./serverActions/todos/categories";
import CategoriesList from "./components/categories/categoriesList";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Cool todo list",
  description: "Even cooler description",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // a bit of SSR for better UX
  async function CategoriesListLocal() {
    try {
      const categoriesData = await getTodoCategories();
      return <CategoriesList initialData={categoriesData} />
    } catch {
      return <span>Failed to load data :(</span>
    }
  }

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ClientProvider>
          <main>
            <div className="flex gap-4">
              <div className="w-[200px]">
                <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Categories
                </h1>
                
                <CategoriesListLocal />
              </div>

              <div className="w-full">
                {children}
              </div>
            </div>
          </main>
        </ClientProvider>
      </body>
    </html>
  );
}