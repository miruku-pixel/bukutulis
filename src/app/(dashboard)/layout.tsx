import { Sidebar } from "@/components/layout/sidebar/Sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 bg-[#12141a] text-white overflow-auto p-8">
                {children}
            </main>
        </div>
    );
}
