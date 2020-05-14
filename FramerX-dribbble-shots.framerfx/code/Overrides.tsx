import { useRef, useCallback, useEffect, useState } from "react"
import { Data, Override, motionValue, useAnimation } from "framer"

// Stores scroll Y offset in motion value
const scrollY = motionValue(0)

const cardsPos = {
    card01: {
        minY: 40,
        maxY: 400,
    },
    card02: {
        minY: 400,
        maxY: 713,
    },
    card03: {
        minY: 713,
        maxY: 1073,
    },
    card04: {
        minY: 1073,
        maxY: 1433,
    },
    card05: {
        minY: 1593,
        maxY: 1954,
    },
    card06: {
        minY: 1954,
        maxY: 2314,
    },
    card07: {
        minY: 2314,
        maxY: 2674,
    },
    card08: {
        minY: 2674,
        maxY: 3062,
    },
    card09: {
        minY: 3146,
        maxY: 3459,
    },
    card10: {
        minY: 3459,
        maxY: 3772,
    },
    card11: {
        minY: 3772,
        maxY: 4085,
    },
    card12: {
        minY: 4085,
        maxY: 4425,
    },
}

/* -------------------------------- STATE ------------------------------------ */

const data = Data({
    current: 0,
    scrollYOffset: 0,
})

/* --------------------------- HELPER FUNCTIONS ------------------------------ */

// Scrolling down
const switchesNavtitle = scrollY => {
    let updateCurrent = 0

    if (scrollY <= 0 && scrollY > -1554) {
        console.log("Featured", updateCurrent)
        // updateCurrent = 0
        data.current = 0
    } else if (scrollY <= -1554 && scrollY > -3112) {
        // console.log("News", updateCurrent)
        // updateCurrent = 1
        data.current = 1
    } else if (scrollY <= -3062 && scrollY > -4508) {
        // console.log("Sports", updateCurrent)
        // updateCurrent = 2
        data.current = 2
    } else if (scrollY <= -4508) {
        data.current = 3
    }

    // console.log("Current selected: ", data.current)
}

// Takes navtitle current and outputs scroll Y offset for each section
const scrollToSection = tappedItem => {
    if (tappedItem === 0) {
        return 0
    } else if (tappedItem === 1) {
        return -1554
    } else if (tappedItem === 2) {
        return -3112
    } else if (tappedItem === 3) {
        return -4552
    }
}

/* ------------------------------ OVERRIDES ---------------------------------- */

// Apply to scroll
export const Scroll: Override = props => {
    return {
        // Listens to scroll event and stores Y offset in motionValue
        contentOffsetY: scrollY,

        scrollAnimate: {
            y: data.scrollYOffset,
            transition: { ease: "easeInOut", duration: 0.9 },
        },

        onScroll(event) {
            // Updates navtitle current based on scroll Y position

            //@ts-ignore
            console.log(event.point.y)

            //@ts-ignore
            let scrollY = event.point.y

            if (scrollY <= 0 && scrollY > -1508) {
                // console.log("Featured")
                data.current = 0
            } else if (scrollY <= -1508 && scrollY > -3062) {
                // console.log("News")
                data.current = 1
            } else if (scrollY <= -3062 && scrollY > -4508) {
                // console.log("Sports")
                data.current = 2
            } else if (scrollY <= -4508) {
                data.current = 3
            }
        },
    }
}

// Sets current selected anchor on navtitle. Apply to navtitle
export const Navtitle: Override = () => {
    return {
        currentlySelected: data.current,
        onValueChange(tappedItem: number) {
            // Passes tapped item index to scrollToSection
            data.scrollYOffset = scrollToSection(tappedItem)
        },
    }
}

// OVERRIDE - Toggles card autoplay. Apply to card
export const HandleCard: Override = props => {
    // Creates a ref
    const ref: any = useRef(null)

    // Initiates state
    const [playVideo, setPlayVideo] = useState(false)

    useEffect(() => {
        const layerName = ref.current.props.name
        const topLine = cardsPos[layerName].minY
        const bottomLine = cardsPos[layerName].maxY

        // console.log(layerName,topLine,bottomLine)

        const unsubscribe = scrollY.onChange(scrollY => {
            const targetY = Math.abs(scrollY) + 200

            if (topLine < targetY && bottomLine > targetY) {
                // console.log(`The ${layerName} is now selected`)
                setPlayVideo(true)
                // setPlayVideo(false)
            } else {
                setPlayVideo(false)
            }
        })

        return () => unsubscribe()
    }, [])

    return {
        autoplay: playVideo,
        ref: ref,
    }
}
