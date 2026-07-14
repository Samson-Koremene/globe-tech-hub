import { defineNitroConfig } from 'nitro/config';

export default defineNitroConfig({
  // Vercel preset is auto-detected during Vercel builds via the VERCEL env var.
  // No custom handlers or publicAssets — TanStack Start manages those.
});
