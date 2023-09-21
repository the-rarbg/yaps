import Footer from './Footer'
import Navigation from './Navigation'
import {ThemeToggler} from "./ThemeToggler";

export default function Layout({children}) {
    return (
        <div
            className='text-app-dark-blue dark:bg-app-dark-blue bg-light-white dark:text-app-pure-white e lg:flex lg:items-center'>
            <Navigation/>
            <ThemeToggler/>
            <main
                className='mx-0 dark:bg-app-dark-blue bg-light-white     flex flex-col p-1 py-6 md:m-6 md:px-0 md:pt-0 lg:ml-[10rem] lg:min-w-[800px] lg:grow'>
                {children}
                <Footer/>
            </main>
        </div>
    )
}
