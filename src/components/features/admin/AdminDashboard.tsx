import React, { useState } from "react";
import { useAdminUsers, useAdminPayments, useAdminStats, useAdminPricing, useUpdateAdminPricing } from "../../../hooks/useAdminDashboard";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Badge } from "../../ui/badge";

export const AdminDashboard: React.FC = () => {
  const { data: users = [], isLoading: usersLoading } = useAdminUsers();
  const { data: payments = [], isLoading: paymentsLoading } = useAdminPayments();
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: pricing, isLoading: pricingLoading } = useAdminPricing();
  const updatePricingMutation = useUpdateAdminPricing();

  const [draftPrice, setDraftPrice] = useState<string>(pricing?.cvPrice?.toString() ?? "500");

  React.useEffect(() => {
    if (pricing) {
      setDraftPrice(String(pricing.cvPrice));
    }
  }, [pricing]);

  const handlePriceSave = async () => {
    const value = Number(draftPrice);
    if (Number.isNaN(value) || value <= 0) return;
    await updatePricingMutation.mutateAsync(value);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Dashboard administrateur</h2>
          <p className="text-xs text-slate-500">Utilisateurs, paiements, prix global et statistiques SaaS.</p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">Prix global du CV</p>
            <div className="mt-1 flex items-center gap-2">
              <Input
                value={draftPrice}
                onChange={(e) => setDraftPrice(e.target.value)}
                className="w-28"
                type="number"
                min={1}
              />
              <span className="text-xs text-slate-500">XOF</span>
            </div>
          </div>
          <Button
            size="sm"
            onClick={handlePriceSave}
            isLoading={updatePricingMutation.isPending}
          >
            Enregistrer
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          { label: "Utilisateurs", value: stats?.totalUsers ?? 0, tone: "bg-slate-900" },
          { label: "CV créés", value: stats?.totalCVs ?? 0, tone: "bg-emerald-600" },
          { label: "Paiements réussis", value: stats?.successfulPayments ?? 0, tone: "bg-blue-600" },
          { label: "Chiffre d'affaires", value: `${(stats?.totalRevenue ?? 0).toLocaleString()} XOF`, tone: "bg-amber-500" },
          { label: "Paiements échoués", value: stats?.failedPayments ?? 0, tone: "bg-rose-500" },
        ].map((card) => (
          <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className={`h-2 w-12 rounded-full ${card.tone}`} />
            <p className="mt-4 text-[10px] uppercase tracking-wider text-slate-500">{card.label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900">Utilisateurs</h3>
          <div className="mt-4 space-y-3">
            {usersLoading ? (
              <p className="text-xs text-slate-400">Chargement...</p>
            ) : users.length === 0 ? (
              <p className="text-xs text-slate-400">Aucun utilisateur.</p>
            ) : (
              users.map((user) => (
                <div key={user.id} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                    <p className="text-[11px] text-slate-500">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="text-[10px] uppercase tracking-wider">{user.role}</Badge>
                    <p className="mt-1 text-[11px] text-slate-500">{user.cvCount ?? 0} CV</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900">Paiements</h3>
          <div className="mt-4 space-y-3">
            {paymentsLoading ? (
              <p className="text-xs text-slate-400">Chargement...</p>
            ) : payments.length === 0 ? (
              <p className="text-xs text-slate-400">Aucun paiement.</p>
            ) : (
              payments.slice(0, 6).map((payment) => (
                <div key={payment.id} className="border-b border-slate-100 pb-2 last:border-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-800">{payment.email}</p>
                    <Badge className="text-[10px] uppercase tracking-wider">{payment.status}</Badge>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {payment.amount.toLocaleString()} {payment.currency} · {payment.paymentMethod}
                  </p>
                  <p className="text-[10px] text-slate-400">{payment.transactionId}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Historique détaillé</h3>
          {pricing && <p className="text-[11px] text-slate-500">Prix actuel : {pricing.cvPrice.toLocaleString()} XOF</p>}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 uppercase tracking-wider text-slate-700">
              <tr>
                <th className="p-2">Utilisateur</th>
                <th className="p-2">Montant</th>
                <th className="p-2">Statut</th>
                <th className="p-2">Transaction</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-t border-slate-100">
                  <td className="p-2">{payment.email}</td>
                  <td className="p-2">{payment.amount.toLocaleString()} {payment.currency}</td>
                  <td className="p-2"><Badge className="text-[10px] uppercase tracking-wider">{payment.status}</Badge></td>
                  <td className="p-2">{payment.transactionId}</td>
                  <td className="p-2">{new Date(payment.createdAt).toLocaleDateString("fr-FR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
