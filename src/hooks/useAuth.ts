import { useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService, SignUpInput, SignInInput } from "../services/supabase/auth.service";

export const AUTH_SESSION_QUERY_KEY = ["auth", "session"];
export const CURRENT_USER_QUERY_KEY = ["auth", "user"];

export function useAuthSession() {
  return useQuery({
    queryKey: AUTH_SESSION_QUERY_KEY,
    queryFn: authService.getSession,
    staleTime: 1000 * 30,
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: CURRENT_USER_QUERY_KEY,
    queryFn: authService.getCurrentUser,
    staleTime: 1000 * 30,
  });
}

export function useAuth() {
  const sessionQuery = useAuthSession();
  const currentUserQuery = useCurrentUser();

  const session = sessionQuery.data ?? null;
  const user = currentUserQuery.data ?? null;

  return useMemo(
    () => ({
      session,
      user,
      isLoading: sessionQuery.isLoading || currentUserQuery.isLoading,
      isAuthenticated: Boolean(session && user),
      isAdmin: user?.role === "admin",
    }),
    [session, user, sessionQuery.isLoading, currentUserQuery.isLoading]
  );
}

export function useSignUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SignUpInput) => authService.signUp(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_SESSION_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
    },
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SignInInput) => authService.signIn(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_SESSION_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      queryClient.clear();
    },
  });
}

export function useAuthBootstrap() {
  const { data: session, isLoading } = useAuthSession();

  useEffect(() => {
    if (!session && !isLoading) {
      void authService.getSession();
    }
  }, [session, isLoading]);
}
