import Footer from './Footer'
import Navigation from './Navigation'

export default function Layout({ children }) {
  return (
    <div className='text-app-pure-white lg:flex lg:items-center'>
      <Navigation />
      <main className='mx-0 flex flex-col p-1 py-6 md:m-6 md:px-0 md:pt-0 lg:ml-[10rem] lg:min-w-[800px] lg:grow'>
        {children}
        <Footer />
      </main>
    </div>
  )
}
