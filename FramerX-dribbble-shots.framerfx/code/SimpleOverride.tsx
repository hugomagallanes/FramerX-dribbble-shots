import { useRef, useCallback, useEffect } from "react"
import { Data, Override } from "framer";


export function CardRef(props): Override {
   
    const ref = useCallback(elem => {
        if (elem) {
            console.log(elem.props.children[0].props.height)
        }
    }, [])
    

    return {
        ref: ref,
    }
}