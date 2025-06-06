import type { Config } from 'tailwindcss';

const config: Config = {
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/features/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      extend: {
         colors: {
            red500: '#BB1E1E',
            white500: '#FFFFFF',
            white600: '#F4F5F8',
            white700: '#F8F5F2',
            black500: '#000000',
            black600: '#1D1D1B',
            blue500: '#1E71BB',
            gray500: '#7B7A7C',
            gray600: '#8D8D8C',
            divider: '#979797',
            green500: '#0F856C',
            overlay: 'rgba(71, 72, 73, 0.8)',
         },
         screens: {
            xxs: '370px',
            xs: '400px',
            sm: '767px',
            md: '960px',
            lg: '1150px',
            lger: '1250px',
            xl: '1440px',
            xxl: '1600px',
         },
      },
      fontFamily: {
         sans: ['var(--font-inter)', 'Inter'],
      },
   },
   plugins: [],
};
export default config;
