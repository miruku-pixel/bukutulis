import { Sidebar } from "@/components/layout/sidebar/Sidebar";
import { Header } from "@/components/layout/header/Header";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Header />
                <main className="flex-1 bg-[#FCF8F8] text-zinc-800 overflow-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
