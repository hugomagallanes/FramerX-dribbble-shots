import { Data, Override } from "framer";


/* -------------------------------- STATE ------------------------------------ */

const data = Data({
	current: 0,
	scrollYOffset: 0,
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

    console.log("Current selected: ", data.current)
   
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
		scrollAnimate: {
			y: data.scrollYOffset,
			transition: { ease: "easeInOut", duration: 1 },
		},

		onScroll(event) {
            // Updates navtitle current based on scroll Y position
            
            //@ts-ignore
            // console.log("ScrollY:", event.point.y)

            //@ts-ignore
            // switchesNavtitle(event.point.y)

            let scrollY = event.point.y

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

			//@ts-ignore
			// data.current = switchesNavtitle(event.point.y);
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
