import { defineConfig, loadEnv } from 'vite';
 import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
      plugins: [react()],
        define: {

            'process.env.GOOGLE_AUT_API': JSON.stringify(env.GOOGLE_AUT_API),
             'process.env.SANITY_PROJECT_ID': JSON.stringify(env.SANITY_PROJECT_ID),
            'process.env.SANITY_TOCKEN': JSON.stringify(env.SANITY_TOCKEN),

 
             
        },
        
    };
});