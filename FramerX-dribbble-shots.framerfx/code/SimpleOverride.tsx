import { useRef } from "react"
import { Data, Override } from "framer";


export function CardRef(props): Override {
    const ref: any = useRef()

    console.log(ref)

    return {
        ref: ref,
    }
}