import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import AdminLogin from '@/components/AdminLogin';

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get('authorization_id') ?? '';
  const [details, setDetails] = useState<any>(null);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) return setError('Missing authorization_id');
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        if (active) setNeedsLogin(true);
        return;
      }
      if (active) setNeedsLogin(false);
      const { data, error } = await (supabase.auth as any).oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) return setError(error.message);
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId, reload]);

  async function decide(approve: boolean) {
    setBusy(true);
    const oauth = (supabase.auth as any).oauth;
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      return setError(error.message);
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      return setError('No redirect returned by the authorization server.');
    }
    window.location.href = target;
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md">
        {error ? (
          <p className="text-center text-sm text-destructive">
            Could not load this authorization request: {error}
          </p>
        ) : needsLogin ? (
          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Sign in to continue connecting this app.
            </p>
            <AdminLogin onLoginSuccess={() => setReload((n) => n + 1)} />
          </div>
        ) : !details ? (
          <p className="text-center text-sm text-muted-foreground">Loading…</p>
        ) : (
          <div className="bg-card border rounded-lg shadow-sm p-6 space-y-4">
            <h1 className="text-xl font-medium">
              Connect {details.client?.name ?? 'an app'} to your account
            </h1>
            <p className="text-sm text-muted-foreground">
              This lets {details.client?.name ?? 'the client'} use this app's tools as you.
            </p>
            <div className="flex gap-3 pt-2">
              <Button disabled={busy} onClick={() => decide(true)} className="flex-1">
                Approve
              </Button>
              <Button disabled={busy} variant="outline" onClick={() => decide(false)} className="flex-1">
                Deny
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
