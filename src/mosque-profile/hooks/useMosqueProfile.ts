import { useQuery } from "@tanstack/react-query";

import {
  mosqueProfileService,
} from "../services/mosqueProfileService";

export function useMosqueProfile() {
  return useQuery({
    queryKey: ["mosque-profile"],
    queryFn: mosqueProfileService.getProfile,
  });
}