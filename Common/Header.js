/* eslint-disable @next/next/no-img-element */
import React, {  useEffect, useState } from 'react';
import {useRouter} from 'next/router';


const cRoutes = [
  {
    path: [""],
    route: "/",
    title: "Home",
  },
  {
    path: ["search"],
    route: "/search",
    title: "Search",
  },
  {
    path: ["get-posts"],
    route: "/get-posts/category:Movies/",
    title: "Browse",
  },
  {
    path: ["upload"],
    route: "/upload/",
    title: "Upload",
  },
  {
    path: ["dashboard"],
    route: "/dashboard/",
    title: "Dashboard",
  }
];


const Header = () => {
  const [showNav,setShowNav] = useState(false);
  
  const route = useRouter();
  const router = route.pathname;
  const[token,setToken]=useState(false)

  let cRouter = router?.split("/") ?? [];
useEffect(()=>{
  let temp = localStorage.getItem("access_token") || false
  setToken(temp)
},[])
  return (
    <div className=''>
    <header className="hidden bg-background-header/25 text-sm font-light md:flex sticky top-0 font-montserrat backdrop-blur-3xl px-8 md:px-16 justify-between">



    
      <span className='mx-6 cursor-pointer hover:text-green-400 text-xl font-semibold my-4' onClick={()=>route.push("/")}>theRARBG</span>

      <div className='hidden md:flex mx-auto font-normal items-center'>
        {cRoutes.map((obj, i) => (
          <div  className={`px-6 uppercase cursor-pointer font-normal ${obj.path.includes(cRouter[1] || "0") ? "border-b-2 border-primary" : ""} h-full flex items-center ${(!token && i===4)?'hidden':""} `} onClick={()=>
          {
            let temp = token?false:true
            if(i===3&&temp){
             window.location.href=`/login`;
            } 
            
            else{
            route.push(`${obj.route}`);
            }
          }} key={i}>
            <p className={`${obj.path.includes(cRouter[1] || "0") ? "text-primary" : ""} hover:text-green-400 h-fit`}>{obj.title}</p>
          </div>
        ))}
      </div>
    <button className='px-5 bg-primary/10 text-primary border-primary my-4 text-xs hover:bg-primary/30' style={{border:"solid 0.5px",fontWeight:"400"}} onClick={()=>
      {
        if(token){
        localStorage.clear()
        window.location.href="/login"
        }else{
          route.push("/login")
        }
      }}  >{token?"Logout":"Login"}</button>
    </header>
      {/*Mobile Hamburger Menu */}
      <div className={`${showNav?"h-screen":"h-[60px]"} transition-all ease-in-out duration-500 z-20   md:hidden bg-background-header/25 w-full fixed top-0 font-montserrat backdrop-blur-3xl px-8 md:px-16 flex flex-col`}>
        <div className='h-[60px] w-full flex justify-between items-center'>
        <span className='mx-6 cursor-pointer hover:text-green-400 text-xl font-semibold' onClick={()=>route.push("/")}>theRARBG</span>
        <img src='/navIcon.png' alt="The Navigation Icon" className='w-8 h-8 cursor-pointer' onClick={() => setShowNav(!showNav)}/>  
        </div>
        <div className={`${showNav?"opacity-100  pt-56":" opacity-0 h-0 "} transition-all duration-500 ease-in-out  grow w-full flex flex-col items-center gap-5`}>
        {cRoutes.map((obj, i) => (
          <div className={`uppercase cursor-pointer text-5xl font-normal flex justify-center items-center ${obj.path.includes(router) ? "border-b-2 border-primary " : ""} `}
           onClick={()=>{
            if(i===3&&!token){
              route.push(`/login`);
            } 
            else{
            route.push(`${obj.route}`);
            }
             setShowNav(false)}
            }
              key={i}>
            <p className={`${obj.path.includes(router) ? "text-primary" : ""} hover:text-green-400`}>{obj.title}</p>
          </div>
        ))}
        </div>
      </div>
  
    </div>
  );
};

export default Header
