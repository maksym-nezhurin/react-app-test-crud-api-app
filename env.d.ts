/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_NODE_ENV: string; // Якщо є інші змінні, додайте їх тут
    // readonly VITE_API_URL: string; // приклад іншої змінної
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  