import Vapi from '@vapi-ai/web';

// Next.js exposes environment variables prefixed with NEXT_PUBLIC_ to the browser.
// Don't run dotenv here — Next handles env injection and dotenv can break server/module initialization.
export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);
