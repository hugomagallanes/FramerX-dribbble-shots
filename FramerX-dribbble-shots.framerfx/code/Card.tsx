import * as React from "react";
import { Frame, Stack, addPropertyControls, ControlType } from "framer";
import { Image, Check_icon } from "./canvas";

const Thumbnail = (props) => {
	return (
		<Frame
			height={212}
			width={375}
			background={{
				src: `${props.image}`,
			}}
		>
			<Frame
				background="#0d0d0d"
				height={20}
				width="auto"
				y={16}
				x={16}
				style={{
					fontFamily: "Retina",
					fontSize: 12,
					fontWeight: 700,
					textAlign: "left",
					color: "white",
					paddingLeft: 4,
					paddingRight: 4,
				}}
			>
				00:00
			</Frame>
		</Frame>
	);
};

export const Card = (props) => {
	const { videoID, ...rest } = props;

	function formatDuration(duration) {
		let output;

		let hours: any = Math.floor(duration / 3600);
		let minutes: any = Math.floor((duration - hours * 3600) / 60);
		let seconds: any = duration - hours * 3600 - minutes * 60;

		if (hours < 10) {
			hours = "0" + hours;
		}
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		if (seconds < 10) {
			seconds = "0" + seconds;
		}

		output = `${minutes}:${seconds}`;

		console.log(output);
	}

	formatDuration(154);

	/* -------------------------------- STATE ------------------------------------ */

	const [state, setState] = React.useState({
		// id: "x7tlu48",
		id: videoID,
		image: "",
		timestamp: "",
		uploadTime: "10 hours ago",
		title: "Once Upon a Time in Hollywood - Official Trailer",
		channel: "FanReviews",
	});

	React.useEffect(() => {
		fetch(
			`https://api.dailymotion.com/video/${videoID}}?fields=title%2Cthumbnail_1080_url%2Cowner.screenname%2Cid%2Cduration`
		)
			.then((response) => response.json())
			.then((data) => {
				setState((prevState) => ({
					...prevState,
					id: `${videoID}`,
					image: data["thumbnail_1080_url"],
					title: data.title,
					channel: data["owner.screenname"],
				}));
				console.log(data);
			});
	}, [videoID]);

	/* ----------------------------- 🖼 RENDER ----------------------------------- */

	return (
		<Frame {...rest}>
			<Stack
				direction="vertical"
				alignment="start"
				distribution="start"
				backgroundColor="teal"
				gap={4}
			>
				<Thumbnail image={state.image}></Thumbnail>

				<div
					style={{
						display: "inline-block",
						// background: "lightgrey",
						width: "375px",
						fontFamily: "Retina",
						fontSize: 11,
						fontWeight: 600,
						textAlign: "left",
						color: "#7E7E7E",
						paddingLeft: 16,
						paddingRight: 16,
					}}
				>
					{state.uploadTime}
				</div>
				<div
					style={{
						display: "inline-block",
						// background: "lightgrey",
						width: "375px",
						fontFamily: "Retina",
						fontSize: 18,
						fontWeight: 800,
						textAlign: "left",
						color: "#0D0D0D",
						paddingLeft: 16,
						paddingRight: 16,
					}}
				>
					{state.title}
				</div>

				<Stack
					direction="horizontal"
					alignment="start"
					distribution="start"
					gap={4}
					height={16}
				>
					<div
						style={{
							display: "inline-block",
							// background: "lightgrey",
							width: "auto",
							fontFamily: "Retina",
							fontSize: 13,
							fontWeight: 700,
							textAlign: "left",
							color: "#7E7E7E",
							paddingLeft: 16,
						}}
					>
						{state.channel}
					</div>
					<Check_icon />
				</Stack>
			</Stack>
		</Frame>
	);
};

Card.defaultProps = {
	height: 298,
	width: 375,
	background: "white",
	videoID: "",
};

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(Card, {
	videoID: {
		title: "Video ID",
		type: ControlType.String,
		placeholder: "Enter video id",
		defaultValue: "x7tlu48",
	},
});
