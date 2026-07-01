"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { incrementGlobalVisits } from "../lib/firebase/firestore";

export function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Check sessionStorage to track unique visits per session
    const hasVisitedThisSession = sessionStorage.getItem("visited_session");
    
    // Do not track visits to the admin area to prevent skewing analytics
    const isAdminArea = pathname.startsWith("/admin");

    if (!hasVisitedThisSession && !isAdminArea) {
      const recordVisit = async () => {
        try {
          await incrementGlobalVisits();
          sessionStorage.setItem("visited_session", "true");
        } catch (error) {
          console.error("Error incrementing global visits:", error);
        }
      };
      recordVisit();
    }
  }, [pathname]);

  return null;
}
