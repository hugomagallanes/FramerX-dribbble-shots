import { useRef, useCallback, useEffect, useState } from "react"
import { Data, Override, motionValue, useAnimation } from "framer";



// Stores scroll Y offset in motion value
const scrollY = motionValue(0)


/* -------------------------------- STATE ------------------------------------ */

const data = Data({
	current: 0,
    scrollYOffset: 0,
    targetY: 0,
});





/* --------------------------- HELPER FUNCTIONS ------------------------------ */

// Scrolling down
const switchesNavtitle = (scrollY) => {

    let updateCurrent = 0

	if (scrollY <= 0 && scrollY > -1564) {
        // console.log("Featured", updateCurrent)
        // updateCurrent = 0
        data.current = 0
	} else if (scrollY <= -1564 && scrollY > -3166) {
        // console.log("News", updateCurrent)
        // updateCurrent = 1
        data.current = 1
    } else if (scrollY <= -3166) {
        // console.log("Sports", updateCurrent)
        // updateCurrent = 2
        data.current = 2
    }

    // console.log("Current selected: ", data.current)
   
};

// Takes navtitle current and outputs scroll Y offset for each section
const scrollToSection = (tappedItem) => {
	if (tappedItem === 0) {
		return 0;
	} else if (tappedItem === 1) {
		return -1564;
	} else if (tappedItem === 2) {
		return -3166;
	}
};




/* ------------------------------ OVERRIDES ---------------------------------- */





// Apply to scroll
export const Scroll: Override = (props) => {
	return {
         // Listens to scroll event and stores Y offset in motionValue
         contentOffsetY: scrollY,

		scrollAnimate: {
			y: data.scrollYOffset,
			transition: { ease: "easeInOut", duration: 1 },
		},

		onScroll(event) {
            // Updates navtitle current based on scroll Y position

            //@ts-ignore
            let scrollY = event.point.y

            if (scrollY <= 0 && scrollY > -1564) {
                // console.log("Featured")
                data.current = 0
            } else if (scrollY <= -1564 && scrollY > -3166) {
                // console.log("News")
                data.current = 1
            } else if (scrollY <= -3166) {
                // console.log("Sports")
                data.current = 2
            }
        },
	};
};

// Sets current selected anchor on navtitle. Apply to navtitle
export const Navtitle: Override = () => {
	return {
		currentlySelected: data.current,
		onValueChange(tappedItem: number) {
			// Passes tapped item index to scrollToSection
			data.scrollYOffset = scrollToSection(tappedItem);
		},
	};
};


// Line override
export function GetTargetPosY(props): Override {
    // Don't know what it does
    const ref = useCallback(elem => (data.targetY = elem.offsetTop), [])

    return {
        ref: ref,
    }
}

// List element override
export function HandleElement(props): Override {
    const ref: any = useRef()
    const controls = useAnimation()

    // console.log(props.name, props.height)

    let cardtopY = props.top
    let cardHeight = cardtopY + props.height

    // console.log("name: ", props.name, "y: ", cardtopY, "height: ", cardHeight)



     const variants = {
        default: { background: "orange" },
        active: { background: "teal" },
    }

    const [state, setState] = useState({
        isAutoplayOn: false
    })



    

    function setActive(scrollY, y, height, target) {
        const topLine = y + scrollY
        const bottomLine = topLine + height
        

        // console.log("Name: ", props.name, "Scroll Y :" ,scrollY, "TopLine: ", cardtopY, "BottomLine: ",  cardHeight, "Data.targetY", data.targetY)
       

        controls.start(
            // Important
            topLine < data.targetY && bottomLine > data.targetY
                ? "active"
                : "default"
        )

        // topLine < data.targetY && bottomLine > data.targetY ? setState({isAutoplayOn: true}) : setState({isAutoplayOn: false}

        
    }
    useEffect(() => {
        if (ref) {
            const y = ref.current.offsetTop
            const unsubscribe = scrollY.onChange(scrollY => {

                // setActive(scrollY, y, props.height, data.targetY)
                console.log("Name:", props.name ,"Ref.y :", y)
   
            })

           
            // Why return a callback function?
            return () => unsubscribe()
        }
    }, [])
    return {
        ref: ref,
        variants: variants,
        animate: controls,
        autoplay: state.isAutoplayOn
    }
}