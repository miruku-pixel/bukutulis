import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MarketingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black p-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
        Welcome to <span className="text-blue-600">BukuTulis</span>
      </h1>
      <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 mb-10">
        The ultimate SaaS platform for managing your business with ease.
        Track orders, customers, and products all in one place.
      </p>
      <div className="flex gap-4">
        <Button asChild size="lg">
          <Link href="/login">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
