import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

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

    let data;
    const textData = await response.text();
    try {
      data = JSON.parse(textData);
    } catch (jsonError) {
      data = { message: textData };
    }

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: data.message || "Registro exitoso",
        ...data,
      });
    } else {
      return NextResponse.json(
        { 
          success: false,
          message: data.message || "Error al registrar usuario" 
        },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        message: "Error interno del servidor" 
      },
      { status: 500 }
    );
  }
}