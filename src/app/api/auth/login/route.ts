import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Aquí llamas a tu API externa o base de datos
    const response = await fetch("https://tu-api-backend.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Login exitoso
      return NextResponse.json({
        message: "Login exitoso",
        token: data.token,
        user: data.user,
      });
    } else {
      // Error en el login
      return NextResponse.json(
        { message: data.message || "Credenciales inválidas" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}