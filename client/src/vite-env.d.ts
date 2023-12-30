/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_API_URL: string;
  VITE_APP_UPLOADS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
