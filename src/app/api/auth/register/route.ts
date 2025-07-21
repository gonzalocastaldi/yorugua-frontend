import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    console.log("Enviando registro al backend:", { username });

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
    
    console.log("Respuesta del backend:", {
      status: response.status,
      ok: response.ok,
      data: data
    });

    if (response.ok) {
      // Registro exitoso
      return NextResponse.json({
        success: true,
        message: data.message || "Registro exitoso",
        ...data,
      });
    } else {
      // Error en el registro
      return NextResponse.json(
        { 
          success: false,
          message: data.message || "Error al registrar usuario" 
        },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error en registro:", error);
    return NextResponse.json(
      { 
        success: false,
        message: "Error interno del servidor" 
      },
      { status: 500 }
    );
  }
} 