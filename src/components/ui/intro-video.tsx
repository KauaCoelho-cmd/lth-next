"use client";

import { useState } from "react";
import { ScrollVideo } from "./scroll-video";

export function IntroVideo({ children }: { children: React.ReactNode }) {
  const [ended, setEnded] = useState(false);

  return (
    <>
      {!ended && <ScrollVideo onEnd={() => setEnded(true)} />}
      <div style={{ opacity: ended ? 1 : 0, transition: "opacity 0.8s ease" }}>
        {children}
      </div>
    </>
  );
}
