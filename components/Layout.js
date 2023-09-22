import Footer from './Footer'
import Navigation from './Navigation'
import { ThemeToggler } from './ThemeToggler'

export default function Layout({ children }) {
  return (
    <div className='e bg-light-white text-app-dark-blue dark:bg-app-dark-blue dark:text-app-pure-white lg:flex lg:items-center'>
      <Navigation />
      <ThemeToggler />
      <main className='mx-0 flex flex-col  overflow-visible  bg-light-white py-6  pt-1 dark:bg-app-dark-blue md:m-6 md:px-0 md:pt-12 lg:ml-[10rem] lg:min-w-[800px] lg:grow'>
        {children}
        <Footer />
      </main>
    </div>
  )
}
