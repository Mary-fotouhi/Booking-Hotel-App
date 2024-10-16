import { useEffect } from "react"

export default function useOutsideClick(ref , exceptionId , callback){

    useEffect(()=>{
        function handleOutsideClick(event){

            if(ref.current && !ref.current.contains(event.target) && event.target.id != exceptionId){
                callback();}
        }
        document.addEventListener("mousedown" , handleOutsideClick);

        return() => {
            document.removeEventListener("mousedown" , handleOutsideClick);
        }
    },[ref , callback])

}