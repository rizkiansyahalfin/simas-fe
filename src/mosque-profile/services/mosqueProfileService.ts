import api from "@/lib/axios";
import axios from "@/lib/axios";

export interface MosqueProfileResponse {
  name: string;
  address: string;
  contactPhone: string;
  contactEmail: string;
  website: string;
  manager: string;
  description: string;

  qrisImageUrl?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const mosqueProfileService = {
  async getProfile() {
  const response =
    await api.get<
      ApiResponse<MosqueProfileResponse>
    >("/mosque-profile");

  return response.data.data;


  
},

  async updateProfile(
    payload: FormData
  ) {
    const response =
      await api.put(
        "/mosque-profile",
        payload
      );

    return response.data;
  },
};

console.log("GET PROFILE");