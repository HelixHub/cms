import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {createTheme, NextUIProvider} from '@nextui-org/react';
import {ThemeProvider as NextThemesProvider} from 'next-themes';
import {Layout} from '../components/layout/layout';
import { useEffect, useState } from 'react';
import LoginModal from "../components/login/LoginModal";

const lightTheme = createTheme({
   type: 'light',
   theme: {
      colors: {},
   },
});

const darkTheme = createTheme({
   type: 'dark',
   theme: {
      colors: {},
   },
});

function MyApp({Component, pageProps}: AppProps) {
   const [isModalOpen, setModalOpen] = useState(false);
   useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
         setModalOpen(true);
      }
   }, []);

   return (
      <NextThemesProvider
         defaultTheme="system"
         attribute="class"
         value={{
            light: lightTheme.className,
            dark: darkTheme.className,
         }}
      >
         <NextUIProvider>
            <Layout>
               <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
               <Component {...pageProps} />
            </Layout>
         </NextUIProvider>
      </NextThemesProvider>
   );
}

export default MyApp;
