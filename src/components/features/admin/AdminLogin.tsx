import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Shield, Lock, AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface AdminLoginProps {
  onSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState("admin@saas-cv.fr");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      if (email.trim().length > 3 && password.length >= 4) {
        localStorage.setItem("saas_cv_admin_token", "admin_session_token_" + Date.now());
        setIsLoading(false);
        onSuccess();
      } else {
        setIsLoading(false);
        setError("Identifiants incorrects. Veuillez réessayer.");
      }
    }, 400);
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
            Gestion des templates, prix, SEO et Analytics
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
                <span>Identifiants démo : </span>
                <strong className="text-slate-300">admin@saas-cv.fr</strong> / <strong className="text-slate-300">admin123</strong>
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
