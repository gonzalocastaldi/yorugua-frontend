"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MyTeam() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router]);

  return (
    <div>
      <h1>Mi Equipo</h1>
    </div>
  );
}
