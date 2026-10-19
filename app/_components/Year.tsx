"use client";

import { useEffect, useState } from "react";

export function Year() {
  const [y, setY] = useState<number>(2026);
  useEffect(() => setY(new Date().getFullYear()), []);
  return <>{y}</>;
}
