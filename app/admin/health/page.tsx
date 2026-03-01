"use client";

import { useEffect, useState } from "react";

type ServiceStatus = {
  configured: boolean;
  connected: boolean;
  message: string;
  webhookSecretConfigured?: boolean;
  publicPriceConfigured?: boolean;
  clientConfigured?: boolean;
};

type HealthResponse = {
  overall: boolean;
  productionReady?: boolean;
  timestamp: string;
  checks: {
    openai: ServiceStatus;
    stripe: ServiceStatus;
    supabase: ServiceStatus;
    routes: Record<string, { ok: boolean; message: string }>;
  };
  warnings: string[];
};

function StatusBadge({ ok }: { ok: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        ok ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {ok ? "Healthy" : "Needs attention"}
    </span>
  );
}

function ServiceCard({ name, status }: { name: string; status: ServiceStatus }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
        <StatusBadge ok={status.connected} />
      </div>
      <p className="text-sm text-gray-700">{status.message}</p>
      <div className="mt-3 space-y-1 text-sm text-gray-600">
        <p>Configured: {status.configured ? "Yes" : "No"}</p>
        {typeof status.webhookSecretConfigured === "boolean" && (
          <p>Webhook Secret: {status.webhookSecretConfigured ? "Yes" : "No"}</p>
        )}
        {typeof status.publicPriceConfigured === "boolean" && (
          <p>Public Price ID: {status.publicPriceConfigured ? "Yes" : "No"}</p>
        )}
        {typeof status.clientConfigured === "boolean" && (
          <p>Client Keys: {status.clientConfigured ? "Yes" : "No"}</p>
        )}
      </div>
    </div>
  );
}

export default function HealthPage() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/health", { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Failed to load health status");
      }
      const json = (await res.json()) as HealthResponse;
      setData(json);
    } catch {
      setError("Could not load health status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHealth();
  }, []);

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-2xl bg-white/95 p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">MindScribe Health Check</h1>
              <p className="text-sm text-gray-600">One-click status for core integrations</p>
            </div>
            <button
              onClick={loadHealth}
              className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700"
            >
              Refresh
            </button>
          </div>

          {loading && <p className="text-sm text-gray-700">Checking services...</p>}
          {error && <p className="text-sm text-red-700">{error}</p>}

          {data && (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
                <div>
                  <p className="text-sm text-gray-600">Overall Status</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.overall ? "Customer-facing app flow is healthy" : "Issues detected"}
                  </p>
                </div>
                <StatusBadge ok={data.overall} />
              </div>

              {typeof data.productionReady === "boolean" && (
                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <div>
                    <p className="text-sm text-gray-600">Production Readiness</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {data.productionReady ? "Ready for full launch" : "Needs final configuration"}
                    </p>
                  </div>
                  <StatusBadge ok={data.productionReady} />
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <ServiceCard name="OpenAI" status={data.checks.openai} />
                <ServiceCard name="Stripe" status={data.checks.stripe} />
                <ServiceCard name="Supabase" status={data.checks.supabase} />
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">Route Readiness</h2>
                <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
                  {Object.entries(data.checks.routes).map(([route, status]) => (
                    <p key={route} className="text-gray-700">
                      <span className="font-medium">{route}:</span> {status.ok ? "OK" : "Issue"} - {status.message}
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">Warnings</h2>
                {data.warnings.length === 0 ? (
                  <p className="text-sm text-gray-700">No warnings.</p>
                ) : (
                  <ul className="list-disc space-y-1 pl-6 text-sm text-gray-700">
                    {data.warnings.map((warning) => (
                      <li key={warning}>{warning}</li>
                    ))}
                  </ul>
                )}
              </div>

              <p className="text-xs text-gray-500">Last checked: {new Date(data.timestamp).toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
