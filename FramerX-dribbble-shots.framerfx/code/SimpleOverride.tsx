import { useRef, useCallback, useEffect, useState } from "react";
import { Override, Data, motionValue, useAnimation } from "framer";



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
