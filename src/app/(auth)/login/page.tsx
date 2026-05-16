import LoginForm from "@/features/auth/components/LoginForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Left Section: Logo - Hidden on mobile, visible on lg screens */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center bg-[#434E78] text-white">
        <div className="animate-fade-in-down">
          <Image 
            src="/assets/Logo-Bg-Black.png" 
            alt="Buku Tulis Logo" 
            width={600} 
            height={600} 
            className="w-full max-w-lg h-auto drop-shadow-2xl"
            priority
          />
        </div>
      </div>

      {/* Right Section: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#FCF8F8] p-4 lg:p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo: visible only on small screens */}
          <div className="lg:hidden flex flex-col items-center mb-8 animate-fade-in-down">
            <Image 
              src="/assets/Logo-Bg-Black.png" 
              alt="Buku Tulis Logo" 
              width={250} 
              height={250} 
              className="w-48 h-auto drop-shadow-lg"
            />
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
