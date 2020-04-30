import * as React from "react";
import {
	Frame,
	Stack,
	Scroll,
	StackProperties,
	addPropertyControls,
	ControlType,
	useMotionValue,
	useAnimation,
} from "framer";

// Imports from Web Design System
// import { Text } from "@framer/dailymotion.web-design-system/code/01_Foundations/Text";

const items = ["Featured", "News", "Sports", "Entertainment", "Music"];

/* --------------------------- HELPER COMPONENT ------------------------------ */
const Title = ({ text, onTap, isSelected, ...props }) => {
	const [state, setState] = React.useState({
		isHighlighted: false,
	});

	React.useEffect(() => {
        // console.log("Ran useEffect");
        // console.log("Received props.isSelected as " + isSelected);
		setState({
			isHighlighted: isSelected,
		});
	}, [isSelected]);

	// Sets up ref
	const ref = React.useRef(null);

	const handleTap = () => {
		// setState({
		// 	isHighlighted: !state.isHighlighted,
		// });
		onTap(ref.current);
	};

	// Renders element
	return (
		<Frame
			{...props}
			ref={ref}
			width="auto"
			height="auto"
			background="lightgrey"
			style={{
				fontFamily: "Retina",
                fontSize: state.isHighlighted ? "28px" : "20px",
                //@ts-ignore
				fontWeight: state.selected ? "900" : "700",
				color: state.isHighlighted ? "#0D0D0D" : "#7E7E7E",
			}}
			onTap={handleTap}
		>
			<div>{text}</div>
		</Frame>
	);
};

export function Navtitle(props) {
	const { currentlySelected, ...rest } = props;

	/* --------------------------- HELPER FUNCTIONS ------------------------------ */

	const CalculateXPos = (index) => {
		let posX;

		if (index === 0) {
			posX = 0;
		} else if (index === 1) {
			posX = -138;
		} else if (index === 2) {
			posX = 227;
		}

		return posX;
	};

	/* -------------------------------- STATE ------------------------------------ */

	// Initiates state
	const [state, setState] = React.useState({
		selectedItem: 0,
		scrollPosition: 16,
	});



	/* ---------------------------- EVENT HANDLERS ------------------------------- */

	const handleTap = (element, index) => {

		// Updates selectedItem with tapped item
		setState(prevState=>({
            ...prevState,
			selectedItem: index,
        }));
        
        // Updates scroll x position
        setState(prevState=>({
            ...prevState,
			scrollPosition: -element.offsetLeft,
        }));
    };
    

   


	const handleScroll = (event) => {
		let scrollX = Math.abs(event.point.x);
		let stateX = Math.abs(state.scrollPosition);

		// console.log(event.point.x, state.scrollPosition);
		// console.log(scrollX, typeof scrollX)

		if (scrollX > stateX) {
			console.log("Scroll to the right");
		} else {
			console.log("Scroll to the left");
		}
	};

	/* ----------------------------- 🖼 RENDER ----------------------------------- */
	const controls = useAnimation();
	// controls.start({ x: 16 })
	controls.start({ x: state.scrollPosition });

	return (
		<Scroll
			{...rest}
			direction="horizontal"
			width={375}
			background="teal"
			backgroundColor="lightpink"
			scrollAnimate={controls}
			x={16}
			onScroll={handleScroll}
		>
			<Stack
				direction="horizontal"
				distribution="start"
				alignment="center"
				gap={20}
				backgroundColor="lightpink"
				// height={52}
				width={860}
				// initial={{ left: state.scrollPosition }}
				// animate={{ left: state.scrollPosition }}
				transition={{
					ease: "easeOut",
					duration: 0.3,
				}}
				paddingRight={200}
			>
				{items.map((item, index) => {
					return (
						<Title
							key={`${props.id}_option_${index}`}
							text={item}
							// style={{
							// 	color: state.selected === index ? "red" : "#7E7E7E",
                            // }}
                            isSelected={state.selectedItem === index ? true : false}
							onTap={(element) => handleTap(element, index)}
						></Title>
					);
				})}
				{/* </Frame> */}
			</Stack>
		</Scroll>
	);
}

Navtitle.defaultProps = {
	height: 52,
	width: 375,
	currentlySelected: 0,
	// onValueChange: (value) => null,
};
