import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Llamada al backend externo de registro
    const response = await fetch("https://yorugua-backend-production.up.railway.app/api/v1/users/register", {
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
      // Registro exitoso
      return NextResponse.json({
        message: "Registro exitoso",
        ...data,
      });
    } else {
      // Error en el registro
      return NextResponse.json(
        { message: data.message || "Error al registrar usuario" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error en registro:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
} 