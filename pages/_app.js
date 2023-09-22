import Router from 'next/router'
import NProgress from 'nprogress'
import {RecoilRoot} from 'recoil'
import Layout from '../components/Layout'
import '../styles/globals.css'
import '../styles/nprogress.css'
import {ToastContainer} from 'react-toastify';
import {ThemeProvider} from "next-themes";

NProgress.configure({showSpinner: false})
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({Component, pageProps}) {
    return (
        <ThemeProvider attribute={"class"}>
            <RecoilRoot>
                <Layout>
                    <ToastContainer/>
                    <Component {...pageProps} />
                </Layout>
            </RecoilRoot>
        </ThemeProvider>
    )
}

export default MyApp
