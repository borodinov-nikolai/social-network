import { useEffect, useRef } from "react"






export const useClickOutside = (onClick:()=> void)=> {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(()=>{


        const handleClickOutside = (e: Event)=> {
                if(ref.current && !ref.current.contains(e.target as Node)) {
                        onClick()
                }
        }

        window.addEventListener('click', handleClickOutside)

        return ()=> window.removeEventListener('click', handleClickOutside)

    }, [onClick])


    return ref

}