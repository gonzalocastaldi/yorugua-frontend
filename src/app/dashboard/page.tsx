"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Poppins } from "next/font/google";

  const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-poppins",
  });



export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Si no hay token, redirigir al login
    if (typeof window !== "undefined" && !localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    
    <div 
      className={`min-h-screen bg-cover bg-center bg-no-repeat relative ${poppins.variable} font-[var(--font-poppins)]`}
      style={{
        backgroundImage: "url('/stadium-background.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 text-center py-8">
        <h1 className="text-white text-8xl font-bold mt-6 ">
          Yorugua<span className="text-blue-400 font-normal">.uy</span>
        </h1>
      </div>

      <div className="relative z-10 flex items-center justify-center px-4">
        <ul className="flex items-center space-x-10">
          <li>
        <a href="/myTeam" className="hover:text-blue-400 transition tracking-[0.1em]">Mi equipo</a>
          </li>
          <li>|</li>
          <li>
        <a href="#" className="hover:text-blue-400 transition tracking-[0.1em]">Ligas / Torneos</a>
          </li>
          <li>|</li>
          <li>
        <a href="#" className="hover:text-blue-400 transition tracking-[0.1em]">Mercado de fichajes</a>
          </li>
          <li>|</li>
          <li>
        <a href="#" className="hover:text-blue-400 transition tracking-[0.1em]">Estadísticas</a>
          </li>
          <li>|</li>
          <li>
        <a href="#" className="hover:text-blue-400 transition tracking-[0.1em]">Mi cuenta / Configuración</a>
          </li>
          <li>|</li>
          <li>
        <a onClick={handleLogout} className="hover:text-red-400 transition tracking-[0.1em] cursor-pointer">Cerrar sesión</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
