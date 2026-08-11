import { useEffect, useState } from "react";
import {
  getPublicResidentialPilot,
  type PublicResidentialPilot,
} from "@/lib/pilot";

export function usePublicResidentialPilot() {
  const [pilot, setPilot] = useState<PublicResidentialPilot | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    getPublicResidentialPilot()
      .then(result => {
        if (active) setPilot(result);
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, []);

  return { pilot, failed };
}
