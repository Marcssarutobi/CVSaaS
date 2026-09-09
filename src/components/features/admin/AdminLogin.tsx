import React, { useState } from "react";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Shield, Lock, AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { authService } from "../../../services/supabase/auth.service";

interface AdminLoginProps {
  onSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await authService.signIn({ email, password });
      const profile = await authService.getCurrentUser();

      if (!profile || profile.role !== "admin") {
        throw new Error("Ce compte n'a pas les droits d'administration.");
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connexion impossible. Vérifiez vos identifiants.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Espace d'Administration
          </h1>
          <p className="text-xs text-slate-400">
            Gestion des templates, prix, utilisateurs, paiements et statistiques
          </p>
        </div>

        <Card className="border-slate-800 bg-slate-950 text-slate-200 shadow-2xl">
          <CardContent className="pt-6">
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-950/50 border border-rose-800 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <Label className="text-slate-300" required>Email Administrateur</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <Label className="text-slate-300" required>Mot de passe</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  size="md"
                  isLoading={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  <Lock className="h-3.5 w-3.5 mr-1.5" />
                  <span>Connexion au Back-office</span>
                </Button>
              </div>

              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                <span>Créez l'utilisateur admin dans Supabase Auth et donnez-lui le rôle </span>
                <strong className="text-slate-300">admin</strong>.
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Retour au site public</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
