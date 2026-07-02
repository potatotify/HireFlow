import Vapi from '@vapi-ai/web';
import dotenv from 'dotenv';
dotenv.config();
export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);
