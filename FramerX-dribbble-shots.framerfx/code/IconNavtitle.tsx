import * as React from "react";
import {
	Frame,
	Stack,
} from "framer";


export const IconNavtitle = ({isActive}) => {


	const [active,setActive] = React.useState(isActive) 

	// Set initial state based on prop
	React.useEffect(()=>{
		setActive(isActive)
	},[])

	const handleTap = () => {
		setActive(!active)
		// console.log(`Changed state to ${active}`)
	}

    return (
		<Frame
			size={16}
			background={null}
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
				width={16}
				height={2}
				animate={{
					background: active ? "white" : "0d0d0d",
					top: active ? 2 : 2,
					rotate: active ? 45 : 0,
					width: active ? 14 : 16
				}}
				originX={0}
			></Frame>


			<Frame 
				radius={3}
				width={10}
				height={2}
				background="0d0d0d"
				animate={{
					opacity: active ? 0 : 1,
				}}
				originX={0}
				center="y"
			></Frame>



			<Frame 
				radius={3}
				// width={13}
				height={2}
				animate={{
					background: active ? "white" : "0d0d0d",
					bottom: active ? 2 : 2,
					rotate: active ? -45 : 0,
					width: active ? 14 : 10
				}}
				originX={0}
			></Frame>
		</Frame>
	)
}

IconNavtitle.defaultProps = {
	isActive: false
}