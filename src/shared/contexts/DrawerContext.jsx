import { createContext, useCallback, useContext, useState } from "react";

const DrawerContext = createContext({});

const useDrawerContext = () =>{
    return useContext(DrawerContext);
};

const DrawerProvider = ({children}) =>{
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [drawerOptions, setDrawerOptions] = useState([]);

    const toggleDrawerOpen =  useCallback(()=>{
        setDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    },[]);

    const handleSetDrawerOptions = useCallback((newDrawerOptions)=>{
        setDrawerOptions(newDrawerOptions);
    },[]);

    return(
        <DrawerContext.Provider value={{isDrawerOpen, toggleDrawerOpen, handleSetDrawerOptions, drawerOptions}}>
            {children}
        </DrawerContext.Provider>
    )
};

export{
    DrawerContext,
    useDrawerContext,
    DrawerProvider
}