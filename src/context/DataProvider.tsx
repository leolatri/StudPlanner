import React, { createContext, useEffect, useState } from "react";
import { DataProps } from "./dataProps";

export const DataContext = createContext<DataProps | undefined>(undefined);

const DataProvider = ({children}: {children: React.ReactNode}) => {
    const [loading, setLoading] = useState(false);

    const value: DataProps = {
        loading,
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
             console.log('fetch data');   
            } catch {
                console.log('Error with fetching data');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
};

export default DataProvider;