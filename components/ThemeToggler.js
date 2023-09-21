import {useEffect, useState} from "react";
import {useTheme} from "next-themes";

export function ThemeToggler() {
    const {theme, setTheme} = useTheme()
    const circleBtn = "rotate-[360deg] "
    const [test,setest] = useState(true)
    useEffect(() => {
        document.querySelector(".dark-mode-btn").addEventListener("click",()=>{
            document.querySelector(".dark-mode-btn").classList.toggle("rotate-[360deg]")
        })
    }, []);
    return (
        <div
            className={`absolute rounded-3xl p-2 top-36 right-10 lg:top-5 lg:right-5 ${theme==="dark" ? "bg-gray-500":"bg-app-semi-dark-blue"} text-white w-12 h-12`}>
            <div className={"w-full h-full rounded-3xl bg-[#10141e]"}>
                <div onClick={() => {
                    setTheme(theme === 'light' ? 'dark' : 'light')
                    setest(false)
                }}
                     className={`${test === false  ? circleBtn : "circleBtn"} flex justify-center items-center dark-mode-btn transition duration-500 cursor-pointer ease-in-out rounded-full  h-full w-full `}>
                    <span className="material-symbols-outlined">
                    {theme === "dark" ? "light_mode":"dark_mode"}
                    </span>
                </div>
            </div>
        </div>

    )
}