# Supabase Edge Functions for FedaPay

This folder is reserved for server-side payment logic that must never run in the browser.

Recommended functions:

- create-fedapay-payment
- verify-fedapay-payment
- fedapay-webhook

Configuration:

```bash
supabase secrets set FEDAPAY_SECRET_KEY=your_secret_key
supabase secrets set FEDAPAY_PUBLIC_KEY=your_public_key
supabase secrets set FEDAPAY_ENVIRONMENT=sandbox
```

Deploy:

```bash
supabase functions deploy create-fedapay-payment
supabase functions deploy verify-fedapay-payment
supabase functions deploy fedapay-webhook
```

The secret key must remain in Supabase secrets or another secure backend environment.
