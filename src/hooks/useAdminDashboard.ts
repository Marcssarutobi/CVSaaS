import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../services/supabase/admin.service";

export const ADMIN_USERS_QUERY_KEY = ["admin", "users"];
export const ADMIN_PAYMENTS_QUERY_KEY = ["admin", "payments"];
export const ADMIN_STATS_QUERY_KEY = ["admin", "stats"];
export const ADMIN_PRICING_QUERY_KEY = ["admin", "pricing"];

export function useAdminUsers() {
  return useQuery({
    queryKey: ADMIN_USERS_QUERY_KEY,
    queryFn: () => adminService.getUsers(),
  });
}

export function useAdminPayments() {
  return useQuery({
    queryKey: ADMIN_PAYMENTS_QUERY_KEY,
    queryFn: () => adminService.getPayments(),
  });
}

export function useAdminStats() {
  return useQuery({
    queryKey: ADMIN_STATS_QUERY_KEY,
    queryFn: () => adminService.getStats(),
  });
}

export function useAdminPricing() {
  return useQuery({
    queryKey: ADMIN_PRICING_QUERY_KEY,
    queryFn: () => adminService.getPricing(),
  });
}

export function useUpdateAdminPricing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cvPrice: number) => adminService.updatePricing(cvPrice),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_PRICING_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ADMIN_STATS_QUERY_KEY });
    },
  });
}
