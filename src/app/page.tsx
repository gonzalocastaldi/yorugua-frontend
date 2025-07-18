"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({
    usuario: "",
    contraseña: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("https://yorugua-backend-production.up.railway.app/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.usuario,
          password: formData.contraseña,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login exitoso
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Redirigir al dashboard o página principal
        router.push("/dashboard");
      } else {
        // Error en el login
        setError(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error de conexión. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/stadium-background.jpg')"
      }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      
      {/* Logo centrado */}
      <div className="relative z-10 text-center py-8">
        <h1 className="text-white text-5xl font-bold" style={{ verticalAlign: "100px" }}>
          Yorugua<span className="text-blue-400">.uy</span>
        </h1>
      </div>

      {/* Formulario de login */}
      <div className="relative z-10 flex items-center justify-center px-4">
        <div className="rounded-lg p-8 w-full max-w-md" style={{ backgroundColor: "#122B39", opacity: 0.8 }}>
          <h2 className="text-white text-2xl font-semibold text-center mb-6">
            Ingresar
          </h2>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="usuario"
                placeholder="Usuario"
                value={formData.usuario}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-400 text-white placeholder-gray-300 focus:border-white focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <input
                type="password"
                name="contraseña"
                placeholder="Contraseña"
                value={formData.contraseña}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-400 text-white placeholder-gray-300 focus:border-white focus:outline-none transition-colors"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-semibold py-3 px-6 rounded-full transition-colors mt-6"
            >
              {isLoading ? "Ingresando..." : "Ingresar"}
            </button>
            
            <div className="text-center mt-4">
              <a href="/register" className="text-white text-sm hover:underline">
                Crear cuenta
              </a>
            </div>
          </form>
        </div>
      </div>
      
      {/* Social media links */}
      <div className="relative z-10 text-center py-8">
          <a href="https://x.com/home" className="text-white hover:text-gray-300">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/" className="text-white hover:text-gray-300">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
            </svg>
          </a>
      </div>
    </div>
  );
}