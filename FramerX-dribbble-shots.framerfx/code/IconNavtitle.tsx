import * as React from "react";
import {
	Frame,
	Stack,
} from "framer";



export const IconNavtitle = (props) => {
    return (
		<Frame
			size={16}
			background="transparent"
		>
			<Frame background="#0d0d0d" height={2} width={16} top={2} radius={3}></Frame>
			<Frame background="#0d0d0d" height={2} width={10} center="y" radius={3}></Frame>
			<Frame background="#0d0d0d" height={2} width={13} bottom={2} radius={3}></Frame>
		</Frame>
	)
}