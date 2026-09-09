import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cvService, CVRecord } from "../services/supabase/cv.service";

export const CVS_QUERY_KEY = ["cvs"];

export function useCVs() {
  return useQuery({
    queryKey: CVS_QUERY_KEY,
    queryFn: () => cvService.getAll(),
  });
}

export function useCV(id: string | null) {
  return useQuery({
    queryKey: ["cvs", id],
    queryFn: () => (id ? cvService.getById(id) : null),
    enabled: Boolean(id),
  });
}

export function useCreateCV() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: Partial<CVRecord>) => cvService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CVS_QUERY_KEY });
    },
  });
}

export function useUpdateCV() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<CVRecord> }) => cvService.update(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CVS_QUERY_KEY });
    },
  });
}

export function useDeleteCV() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cvService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CVS_QUERY_KEY });
    },
  });
}
