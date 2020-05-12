import { useRef, useCallback, useEffect, useState } from "react";
import { Override, Data, motionValue, useAnimation, animate } from "framer";



// Stores data variables
const data = Data({
    isExpanded: false,
    // scale: 1,
    // opacity: 1,
    chevronYpos: 0,
    //@ts-ignore
    selected: "id_u0A2OQth_",
    selectedName: "featured"
})



const animationSpecs = {
    duration: .5,
    ease: "anticipate"
}



// Toggles browse. Apply to IconNavTitle
export const ToggleBrowse: Override = () => {
    return {
        style: {
            cursor: "pointer"
        },
        // Update data on tap
        onValueChange(value) {
            data.isExpanded = value
        }
    }
}

// Expanded browse black background. Apply to browseBackground frame 
export const BrowseBackground: Override = () => {
    return {
        animate: {
            scale: data.isExpanded ? 100 : 1,
            opacity: data.isExpanded ? 1 : 0,
        },
        transition: animationSpecs,
    }
}



// Toggles browse menu visibiity. Apply to stack component holding menu items.
export const Menu: Override = (props) => {
    return {
        variants: {
            visible: {
                opacity: 1,
                transition: {
                    delayChildren: .3,
                    staggerChildren: .1,
                }
            },
            hidden: {
                opacity: 0
            }
        },
        initial: "hidden",
        transition: animationSpecs,
        animate: data.isExpanded ? "visible" : "hidden"
    }
}


// Coreagraphs chevron right icon entrance and exit. Apply to chevron-right frame.
export const ChevronRight : Override = (props) => {
    return {
        originY:1,

        initial:{
            opacity: 0
        },
        animate: {
            y: data.chevronYpos,
            rotate: data.isExpanded ? 0 : 90,
            opacity: data.isExpanded ? 1 : 0,
        },
        transition: {
            duration: .3,
            ease: "easeIn"
        },
        style: {zIndex: 10},
    }
}



// Coreagraphs menu items entrance. Tracks chevron-right Y position. Apply to each menu item inside stack.
export const MenuItem: Override = (props) => {
    // Sets up ref
    const ref = useRef(null)

    // Initiate state
    const [backgroundColor, setBackgroundColor] = useState("transparent")

    const isSelected = data.selected === props.id


    return {
        variants: {
            visible: {
                opacity: 1,
                y: 0,
            },
            hidden: {
                opacity: 0,
                y: -4,
            }
        },
        ref: ref,
        style: {cursor: "pointer"},
        onTap (){
            // Updates chevron-right position
            data.chevronYpos = ref.current.offsetTop 

            //@ts-ignore
            data.selected = props.id
            data.selectedName = props.name
        },
        transition: animationSpecs,
    }    
}



export const MenuItemHeader: Override = (props) => {
    return {
        style: {color: data.selectedName === props.name ? "white" : "#414141" }
    }
}


export const MenuItemDescription: Override = (props) => {
    return {
        variants: {
            initial: { y: -4, opacity: 0},
            start: { y: 0, opacity: 1},
        },

        initial: "inital",
        animate: `${data.selectedName}-tagline` === props.name ? "start" : "initial",
    }
}

