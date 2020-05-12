import * as React from "react";
import {
	Frame,
	Stack,
} from "framer";


export const IconNavtitle = (props) => {

	// Destructure props
	const {isActive, ...rest} = props

	// Initiates state
	const [active,setActive] = React.useState(isActive) 

	// Set initial state based on prop
	React.useEffect(()=>{
		setActive(true)
	},[isActive])

	// Handle tap
	const handleTap = () => {
		let updatedValue = !active

		// Shares updated value
		props.onValueChange(updatedValue)

		// Updates state
		setActive(updatedValue)
	}

    return (
		<Frame
			{...rest}
			size={16}
			background="transparent"
			style={{
				zIndex: 10
			}}
			onTap={handleTap}
			transition={{
				duration: .3,
				ease: "anticipate"
			}}
		>


			<Frame 
				radius={3}
				height={2}
				originX={0}
				top={2}
				// width={active ? 14 : 16}
				// background={active ? "white" : "#0d0d0d"}
				// rotate={active ? 45 : 0}
				initial={{
					width: 16,
					background: "#0d0d0d",
					rotate: 0
				}}
				animate={{
					background: active ? "white" : "#0d0d0d",
					rotate: active ? 45 : 0,
					width: active ? 14 : 16
				}}
				style={{
					zIndex: 10
				}}

			></Frame>


			<Frame 
				radius={3}
				width={10}
				height={2}
				background="#0d0d0d"
				animate={{
					opacity: active ? 0 : 1,
				}}
				originX={0}
				center="y"
			></Frame>



			<Frame 
				radius={3}
				height={2}
				originX={0}
				bottom={2}
				initial={{
					width: 10,
					background: "#0d0d0d",
					rotate: 0
				}}
				animate={{
					background: active ? "white" : "#0d0d0d",
					rotate: active ? -45 : 0,
					width: active ? 14 : 10
				}}
				style={{
					zIndex: 10
				}}
			></Frame>
		</Frame>
	)
}

IconNavtitle.defaultProps = {
	isActive: false,
	onValueChange: value => null,
}