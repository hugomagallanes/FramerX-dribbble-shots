import { useRef, useCallback, useEffect, useState } from "react";
import { Override, Data, motionValue, useAnimation, animate } from "framer";



// Tracks scroll y position
const scrollY = motionValue(0);


// Stores all cards positions
const cardsPos = {
    card01: {
        minY: 51,
        maxY: 151
    },
    card02: {
        minY: 333,
        maxY: 444
    }
}


// OVERRIDE - Tracks scroll. Apply to scroll
export const HandleScroll: Override = (props) => {
	return {
		contentOffsetY: scrollY,
	};
};




// OVERRIDE - Toggles card autoplay. Apply to card
// export const HandleVideoCard: Override = (props) => {
// 	const ref: any = useRef(null);

//     const [playVideo, setPlayVideo] = useState(false)

// 	useEffect(() => {
//         // Stores layer name

//         const layerName = ref.current.props.name
//         const topLine = cardsPos[layerName].minY
//         const bottomLine = cardsPos[layerName].maxY

//         console.log(layerName, topLine, bottomLine)

// 		const unsubscribe = scrollY.onChange((scrollY) => {
        
//             if (topLine < Math.abs(scrollY) && bottomLine > Math.abs(scrollY)) {
//                 console.log(`The ${layerName} is now selected`)
//                 setPlayVideo(true)
//             } else {
//                 setPlayVideo(false)
//             }
            
//         });

// 	}, []);

// 	return {
//         autoplay: playVideo,
//         ref: ref
// 	};
// };







// export const HandleList: Override = () => {
//     const ref: any = useRef(null)

//     useEffect(() => {
//         console.log(ref.current.children[0])
//         // ref.current.children[0].props.autoplay = true

//     }, []);

// 	return {
// 		ref: ref,
// 	};
// };

// OVERRIDE - Gets stack elements position
// export const HandleElement: Override = () => {
// 	const ref: any = useRef();

// 	useEffect(() => {
//         let stackChildren = ref.current.parentNode.children;
//         let stackChildrenNum = ref.current.parentNode.children.length

//         for (let i = 0; i < stackChildrenNum; i++) {
//             // Prevents from logging first item
//             if (i != 0) {
//                 let topHedge = stackChildren[i].offsetTop
//                 let bottomHedge = stackChildren[i].offsetHeight

//                 // let position = [topHedge,bottomHedge]
//                 let position = {
//                     name: `card0${i}`,
//                     yMin: topHedge,
//                     yMax: bottomHedge
//                 }

//                 cards.push(position)
//             }
//         }

//         console.log(cards)
// 	}, []);

// 	return {
// 		ref: ref,
// 	};
// };


const data = Data({
    isExpand: false,
    scale: 1,
    opacity: 1,
    chevronYpos: 0,
    //@ts-ignore
    selected: "id_u0A2OQth_",
    selectedName: "featured"
})



export const RevealMenu: Override = () => {
    return {
        animate:{scale: data.scale, opacity: data.opacity},
        transition: {duration: .9, ease: "anticipate"},
        onTap() {          
            data.isExpand = true

            data.scale = 50
            data.opacity = 1
        }
    }
}



export const Accordion: Override = (props) => {
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
        transition: {
            delay: 0.5
        },
        animate: data.isExpand ? "visible" : "hidden"
    }
}

export const Triangle: Override = (props) => {
    return {
        originY:1,
        opacity: 0,
        animate: {
            y: data.chevronYpos,
            rotate: data.isExpand ? 0 : 90,
            opacity: data.isExpand ? 1 : 0,
            scaleX: data.isExpand ? 1 : 0
        },
        style: {zIndex: 10},
    }
}




export const Item: Override = (props) => {
    const ref = useRef(null)

    const [backgroundColor, setBackgroundColor] = useState("transparent")

    const isSelected = data.selected === props.id


    return {
        variants: {
            visible: {
                opacity: 1,
                y: 0,
                // height: 66
            },
            hidden: {
                opacity: 0,
                y: -4,
            }
        },
        ref: ref,
        style: {cursor: "pointer"},


        onTap (){
            data.chevronYpos = ref.current.offsetTop 

            //@ts-ignore
            data.selected = props.id
            data.selectedName = props.name
            console.log(typeof props.id)
            // console.log(props.name)

        },
    }    
}

// export const ItemContainter: Override = (props) => {
//     return {
//         variants: {
//             initial: { background: "blue", height: 44},
//             start: { background: "red", height: 66},
//         },

//         initial: "inital",
//         animate: `${data.selectedName}-content` === props.name ? "start" : "initial", 
//     }
// }



export const ItemHeader: Override = (props) => {
    return {
        style: {color: data.selectedName === props.name ? "white" : "#414141" }
    }
}


export const ItemDescription: Override = (props) => {
    return {
        variants: {
            initial: { y: -4, opacity: 0},
            start: { y: 0, opacity: 1},
        },
        transition: {
            // delay: .1
        },
        initial: "inital",
        animate: `${data.selectedName}-tagline` === props.name ? "start" : "initial",
    }
}

// export const ItemDescription: Override = (props) => {
//     return {
//         opacity: `${data.selectedName}-tagline` === props.name ? 1 : .1
//     }
// }