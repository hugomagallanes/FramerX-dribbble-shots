import { Data, Override } from "framer"


const CalculateYpos = (index) => {
    let Ypos

    if (index === 0) {
        Ypos = 0
    } else if (index === 1) {
        Ypos = -1319
    } else if (index === 2) {
        Ypos = -1443
    }

    return Ypos
}


const CalculateXpos = (scrollYposition) => {
    
    let index
    let yPos 

    yPos = Math.abs(scrollYposition)


    console.log(`Log scroll Y position: ${yPos}`)


    if (yPos < 900) {
        index = 0
        console.log("FEATURED SECTION")
    } else if (yPos > 900 && yPos < 2126){
        index = 1
        console.log("NEWS SECTION")
    } else if (yPos > 2126){
        index = 1
        console.log("SPORTS SECTION")
    }

    return index
}



const data = Data({
    navTitleSelected: 0,
    scrollOffset: 0
})

export const Scroll: Override = (props) => {
    return {
        scrollAnimate: {
            y: data.scrollOffset,
            transition: { ease: "easeInOut", duration: 1 },
        },
        // onScrollEnd(info) {
        //     data.navTitleSelected = CalculateXpos(info.point.y)
        //     console.log(info.point.y)
        //     // console.log(props)
        // },

        onScroll(event) {
            //@ts-ignore
            console.log(event.point.y)
            console.log(CalculateXpos(event.point.y))

            data.navTitleSelected = CalculateXpos(event.point.y)
            
        }
    }
}


export const Navtitle: Override = () => {
    return {
        currentlySelected: data.navTitleSelected,
        onValueChange(val:number) {
            console.log(`Current selected: ${val}`)
            data.scrollOffset = CalculateYpos(val)
        }
    }
}

export const DisabledScroll: Override = () => {
    return {
        dragEnabled: false,
    }
}

// Featured: 0
// News: -1319
