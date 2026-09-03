import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../services/admin.service";
import { SeoConfig, AnalyticsConfig } from "../types/admin.types";

export const ADMIN_SEO_KEY = ["admin", "seo"];
export const ADMIN_GA_KEY = ["admin", "analytics"];

export function useAdminSeo() {
  return useQuery({
    queryKey: ADMIN_SEO_KEY,
    queryFn: () => adminService.getSeoConfig(),
  });
}

export function useUpdateAdminSeo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (configs: SeoConfig[]) => adminService.updateSeoConfig(configs),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_SEO_KEY });
    },
  });
}

export function useAdminAnalytics() {
  return useQuery({
    queryKey: ADMIN_GA_KEY,
    queryFn: () => adminService.getAnalyticsConfig(),
  });
}

export function useUpdateAdminAnalytics() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (config: AnalyticsConfig) =>
      adminService.updateAnalyticsConfig(config),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_GA_KEY });
    },
  });
}

export function useAdminLogin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      adminService.login(email, password),
  });
}
