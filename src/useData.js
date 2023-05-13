
import { useState ,useEffect } from "react";

const useData = (url) => {

    const [data,setData]=useState(null);
    const [louding,setLouding]=useState(true);
    const [isError,setIsError]=useState(null);

    useEffect(()=>{
        fetch(url)
        .then((res)=>{
            if(!res.ok){
                throw Error("could not fetch the data for this response");
            }
            return res.json();
        })
        .then((data)=>{
            setData(data);
            setLouding(false);
            setIsError(null);
        })
        .catch(err =>{
            setIsError(err.message);
            setLouding(false);
        })

    },[url]);
    
    return {data , louding , isError}
}

export default useData;