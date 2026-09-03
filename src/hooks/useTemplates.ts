import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { templateService } from "../services/template.service";
import { CreateTemplateDTO, UpdateTemplateDTO } from "../types/template.types";

export const TEMPLATES_QUERY_KEY = ["templates"];

export function useTemplates() {
  return useQuery({
    queryKey: TEMPLATES_QUERY_KEY,
    queryFn: () => templateService.getTemplates(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useTemplate(id: string | null) {
  return useQuery({
    queryKey: ["template", id],
    queryFn: () => (id ? templateService.getTemplateById(id) : null),
    enabled: Boolean(id),
  });
}

export function useCreateTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateTemplateDTO) => templateService.createTemplate(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEMPLATES_QUERY_KEY });
    },
  });
}

export function useUpdateTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTemplateDTO }) =>
      templateService.updateTemplate(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEMPLATES_QUERY_KEY });
    },
  });
}

export function useDeleteTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => templateService.deleteTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEMPLATES_QUERY_KEY });
    },
  });
}
