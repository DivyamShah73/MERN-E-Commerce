import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const messages = [
  "Welcome to ECommerce Shopping",
  "Discover the Latest Trends",
  "Unbeatable Deals Await You",
  "Shop Smart, Shop Secure",
];

// Royalty-free Unsplash images for demo
const bgImages = [
  // Shopping bags
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
  // Fashion store
  "https://plus.unsplash.com/premium_photo-1664202526047-405824c633e7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // Online deals
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
  // Delivery/secure shopping
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
];

function AuthLayout() {
  const [msgIdx, setMsgIdx] = useState(0);
  const timeoutRef = useRef();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setMsgIdx((idx) => (idx + 1) % messages.length);
    }, 2500);
    return () => clearTimeout(timeoutRef.current);
  }, [msgIdx]);

  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center w-1/2 px-12 relative overflow-hidden">
        {/* E-commerce background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `url(${bgImages[msgIdx]})`,
          }}
        ></div>
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/40 backdrop-blur-sm"></div>
        {/* Animated SVG shapes */}
        <svg className="absolute top-10 left-10 w-32 h-32 opacity-30 animate-float-slow" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" fill="#fff" fillOpacity="0.15" />
        </svg>
        <svg className="absolute bottom-10 right-10 w-24 h-24 opacity-20 animate-float" viewBox="0 0 100 100" fill="none">
          <rect x="20" y="20" width="60" height="60" rx="20" fill="#fff" fillOpacity="0.12" />
        </svg>
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDIuMjA5LTEuNzkxIDQtNCA0cy00LTEuNzkxLTQtNCAxLjc5MS00IDQtNCA0IDEuNzkxIDQgNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10"></div>
        <div className="relative max-w-md space-y-6 text-center text-white select-none z-10">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 min-h-[120px] transition-all duration-700">
            <span className="inline-block animate-fade-in-out">{messages[msgIdx]}</span>
          </h1>
          <p className="text-lg text-white/80 transition-all duration-700">
            {msgIdx === 0 && "Your one-stop destination for all your shopping needs. Sign in to explore our curated collection of products."}
            {msgIdx === 1 && "Stay ahead with the newest arrivals and exclusive collections."}
            {msgIdx === 2 && "Enjoy discounts, flash sales, and special offers every day!"}
            {msgIdx === 3 && "Experience seamless, secure, and smart shopping with us."}
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
      {/* Tailwind custom animations */}
      <style>{`
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float 7s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-fade-in-out {
          animation: fadeInOut 1.2s;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default AuthLayout;
