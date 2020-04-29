import * as React from "react"
import {
    Frame,
    Stack,
    Scroll,
    StackProperties,
    addPropertyControls,
    ControlType,
    useMotionValue,
    useAnimation,
} from "framer"

// Imports from Web Design System
// import { Text } from "@framer/dailymotion.web-design-system/code/01_Foundations/Text";

const items = ["Featured", "News", "Sports", "Entertainment", "Music"]

/* --------------------------- HELPER COMPONENT ------------------------------ */
const Titles = ({ text, onTap, ...props }) => {
    // Sets up ref
    const ref = React.useRef(null)

    const handleTap = () => {
        onTap(ref.current)
    }

    // Renders element
    return (
        <Frame
            {...props}
            ref={ref}
            onTap={handleTap}
            width="auto"
            height="auto"
            background="lightgrey"
        >
            <div>{text}</div>
        </Frame>
    )
}

export function Navtitle(props) {
	const { currentlySelected, ...rest } = props
	

	/* --------------------------- HELPER FUNCTIONS ------------------------------ */

	const CalculateXPos = (index) => {
		let posX

		if (index === 0) {
			posX = 0
		} else if (index===1) {
			posX = -138
		} else if (index ===2) {
			posX = 227
		}

		return posX
	}

	/* -------------------------------- STATE ------------------------------------ */
	
	// Initiates state
    const [state, setState] = React.useState({
        selected: currentlySelected,
        scrollPosition: 16,
	})
	
	// Sets initial state
	React.useEffect(() => {
		let index = currentlySelected
		let xPos = CalculateXPos(currentlySelected)
	
		// Shares value
		// props.onValueChange(index)

		// Update state
		setState({
			selected: index,
			scrollPosition: xPos + 16
		})
		
    },[currentlySelected])

    /* ---------------------------- EVENT HANDLERS ------------------------------- */

    const handleTap = (element, index) => {

		console.log(index, element.offsetLeft)
		
		// Save index value
		let tappedItem = index
		
		// Shares value 
		props.onValueChange(tappedItem)

        // Updates state
        setState({
            selected: tappedItem,
            scrollPosition: -element.offsetLeft + 16,
        })
    }

    /* ----------------------------- 🖼 RENDER ----------------------------------- */
    return (
        <Scroll
            {...rest}
            direction="horizontal"
            width={375}
            background="teal"
            backgroundColor="lightpink"
        >
            <Stack
                direction="horizontal"
                distribution="start"
                alignment="center"
                gap={20}
                backgroundColor="lightpink"
                // height={52}
                width="100%"
                initial={{ left: state.scrollPosition }}
                animate={{ left: state.scrollPosition }}
                transition={{
                    ease: "easeOut",
                    duration: 0.3
                }}
            >
                {items.map((item, index) => {
                    return (
                        <Titles
                            key={`${props.id}_option_${index}`}
                            text={item}
                            style={{
                                color:
                                    state.selected === index
                                        ? "#0D0D0D"
                                        : "#7E7E7E",
                                fontFamily: "Retina",
                                fontSize: state.selected === index ? "28px" : "20px",
                                fontWeight:
                                    state.selected === index ? "900" : "700",
                                verticalAlign: "baseline",
                            }}
                            onTap={element => handleTap(element, index)}
                        ></Titles>
                    )
                })}
            </Stack>
        </Scroll>
    )
}

Navtitle.defaultProps = {
    height: 52,
	width: 375,
	currentlySelected: 0,
	onValueChange: value => null
}
