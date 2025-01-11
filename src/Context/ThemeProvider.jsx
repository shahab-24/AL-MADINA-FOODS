import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext()

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState("light")

    const toggleTheme = () => {
        setTheme((prevTheme) => prevTheme === "light" ? "dark" : "light")
    }

    useEffect(()=>{
        const savedTheme = localStorage.getItem("theme" ) || "light";
        setTheme(savedTheme)
    },[])

    useEffect(()=> {
        document.documentElement.className = theme;
        localStorage.setItem('theme', theme)
    },[theme])
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>

            {children}
            
        </ThemeContext.Provider >
    );
};

export  {ThemeProvider, ThemeContext};