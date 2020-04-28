import * as React from "react";
import {
	Frame,
	Stack,
	Scroll,
	StackProperties,
	addPropertyControls,
    ControlType,
    useMotionValue,
    useAnimation
} from "framer";

// Imports from Web Design System
import { Text } from "@framer/dailymotion.web-design-system/code/01_Foundations/Text";

const items = ["Featured", "News", "Sports", "Entertainment", "Music", "Item 1", "Item 2"];

// let controls = useAnimation()


export function Navtitle(props) {
    const { ...rest } = props;

    const scrollY = useMotionValue(0)

    
    /* -------------------------------- STATE ------------------------------------ */
    const [state, setState] = React.useState({
        selected: 0,
    })

    /* ---------------------------- EVENT HANDLERS ------------------------------- */

    const handleTap = (item, index) => {

        console.log("Item xPos: " + item)

        let tappedItem = index

        // sets state
        setState({
            selected: tappedItem
        })
    }


    const onScroll = (info) => {
        console.log(info.offset)
      }
    
    /* ----------------------------- 🖼 RENDER ----------------------------------- */
	return (
        <Scroll 
        {...rest}
        direction="horizontal"
        backgroundColor="teal"
        // dragEnabled={false}
        wheelEnabled={false}
        onScroll={onScroll}
        // contentOffsetY={scrollY}
        // scrollAnimate={controls}
        scrollAnimate = {{
            x: 16,
            transition: { ease: "easeInOut", duration: 1 },
        }}
        >
			<Stack
				direction="horizontal"
                alignment="start"
                backgroundColor="lightpink"
                width="100%"
                // paddingLeft={16}
			>
				{items.map((item, index) => {
					return (
						<Text
							text={item}
							role="heading"
                            sizeHeading={state.selected === index ? "h1" : "h3" }
                            color={state.selected === index ? "#0D0D0D" : "#7E7E7E" }
							backgroundColor="transparent"
                            width="auto"
                            verticalTextAlign="center"
                            onTap={()=>handleTap(item, index)}
						/>
					);
				})}
			</Stack>
		</Scroll>
	);
}

Navtitle.defaultProps = {
	height: 52,
	width: 375,
	// backgroundColor: "white",
};
