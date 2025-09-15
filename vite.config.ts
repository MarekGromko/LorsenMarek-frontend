import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({mode})=>{
    const env = loadEnv(mode, "./", "");
    return { 
        plugins: [react()],
        server: {
            proxy: {
                [env.VITE_API_BASE_URL]: {
                    target: env.VITE_API_HOST,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
            },
        }
    }
});
