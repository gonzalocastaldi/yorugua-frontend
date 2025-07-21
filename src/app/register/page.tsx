"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [formData, setFormData] = useState({
    usuario: "",
    contraseña: "",
    confirmarcontraseña: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    setSuccess("");
    try {
      if (formData.contraseña !== formData.confirmarcontraseña) {
        setError("Las contraseñas no coinciden");
        setIsLoading(false);
        return;
      }
      const isValidPassword = /^(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[A-Za-z]).{8,}$/.test(formData.contraseña);
      if (!isValidPassword) {
        setError("La contraseña debe tener al menos 8 caracteres, un número y un carácter especial.");
        setIsLoading(false);
        return;
      }
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.usuario,
          password: formData.contraseña
        }),
      });
      const data = await response.json();
      console.log("Response:", response);
      console.log("Response data:", data);
      console.log("Response ok:", response.ok);
      console.log("Response status:", response.status);
      if (response.ok) {
        setSuccess("¡Registro exitoso! Ahora puedes iniciar sesión.");
        setTimeout(() => router.push("/"), 1500);
      } else {
        setError(data.message || "Error al registrar usuario");
      }
    } catch (error) {
      setError("Error de conexión. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/stadium-background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-center py-8">
        <h1 className="text-white text-5xl font-bold">
          Yorugua<span className="text-blue-400">.uy</span>
        </h1>
      </div>
      <div className="relative z-10 flex items-center justify-center px-4">
        <div className="rounded-lg p-8 w-full max-w-md" style={{ backgroundColor: "#122B39", opacity: 0.8 }}>
          <h2 className="text-white text-2xl font-semibold text-center mb-6">
            Crear cuenta
          </h2>
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-500/20 border border-green-500 text-green-100 px-4 py-3 rounded mb-4">
              {success}
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
            <div>
              <input
                type="password"
                name="confirmarcontraseña"
                placeholder="Confirmar contraseña"
                value={formData.confirmarcontraseña}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-400 text-white placeholder-gray-300 focus:border-white focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-3 px-6 rounded-full transition-colors mt-6 cursor-pointer"
            >
              {isLoading ? "Registrando..." : "Registrarse"}
            </button>
            <div className="text-center mt-4">
              <Link href="/" className="text-white text-sm hover:underline">
                ¿Ya tienes cuenta? Iniciar sesión
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 