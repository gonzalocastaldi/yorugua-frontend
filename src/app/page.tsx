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
      
      {/* Logo centrado */}
      <div className="relative z-10 text-center py-8">
        <h1 className="text-white text-5xl font-bold">
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
    </div>
  );
}