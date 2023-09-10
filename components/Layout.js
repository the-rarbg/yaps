import { useRouter } from 'next/router'
import Footer from './Footer'
import Navigation from './Navigation'

export default function Layout({ children }) {
  const router = useRouter()
  return (
    <div className='text-app-pure-white lg:flex'>
      <Navigation />
      <main  className='mx-0 flex p-1 flex-col py-6 md:m-6 md:px-0 md:pt-0 lg:ml-[10rem] lg:min-w-[800px] lg:grow'>

     {/* { (router.pathname==="/search" || router?.pathname==="/login") ? null: <div className='py-1 md:rounded-[10px] head' style={{textAlign:"center"}}>Y.A.P.S [Yet Another Piracy Site]</div>} */}
        <br/>
        {children}
        <Footer />
      </main>
    </div>
  )
}
