import * as React from "react";
import {
	Frame,
	Stack,
	addPropertyControls,
	ControlType,
	useMotionValue,
} from "framer";
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
				{props.duration}
			</Frame>
		</Frame>
	);
};

const Topic = (props) => {
	return (
		<Stack
			direction="vertical"
			alignment="start"
			distribution="start"
			gap={4}
			height={24 + 15 + 2}
			width="100%"
		>
			<div
				style={{
					display: "inline-block",
					width: "auto",
					fontFamily: "Retina",
					fontSize: 11,
					fontWeight: 500,
					color: "#7e7e7e",
					textAlign: "left",
					marginLeft: 16,
				}}
			>
				See more about
			</div>
			<div
				style={{
					background: "white",
					width: "auto",
					padding: "0px 16px 0px 16px",
					lineHeight: "24px",
					borderRadius: 3,
					border: "1px solid #7e7e7e",
					marginLeft: 16,
					marginTop: 0,
					textAlign: "center",
					textTransform: "uppercase",
					fontFamily: "Retina",
					fontSize: 11,
					fontWeight: 700,
					letterSpacing: 0.3,
					color: "#7e7e7e",
				}}
			>
				<span
					style={{
						display: "inline-block",
						verticalAlign: "middle",
					}}
				>
					{props.label}
				</span>
			</div>
		</Stack>
	);
};

export const Card = (props) => {
	const { videoID, hasTopic, topicLabel, ...rest } = props;

	// const topicButton = React.useRef(null);
	const channelDetail = React.useRef(null);

	/* --------------------------- HELPER FUNCTIONS ------------------------------ */

	// Formats seconds into hh:mm:ss
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

		return output;

		// console.log(output);
	}

	/* -------------------------------- STATE ------------------------------------ */

	const [state, setState] = React.useState({
		// id: "x7tlu48",
		id: videoID,
		image: "",
		timestamp: "",
		uploadTime: "10 hours ago",
		title: "Once Upon a Time in Hollywood - Official Trailer",
		channel: "FanReviews",
		duration: "01:01",
		cardHeight: 300,
	});

	// Fetches content from API
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
					duration: formatDuration(data.duration),
				}));
				// console.log(formatDuration(data.duration));
			})
			.then(() => {
				// Adjusts card height based on content

				// Check if components has been mounted
				if (!channelDetail.current) return;

				let updatedHeight;
				let channelDetailHeight = 17
				let channelDetailMaxY = channelDetail.current.offsetParent.offsetTop + channelDetailHeight;

				updatedHeight = channelDetailMaxY;

				// Adds extra height if topic button is visible
				hasTopic ? (updatedHeight += 43) : updatedHeight
		
				// Updates state
				setState((prevState) => ({
					...prevState,
					cardHeight: updatedHeight,
				}));

				// console.log(channelDetail)
				console.log(`Total height: ${updatedHeight}`)
			});
	}, [videoID, hasTopic]);

	/* ----------------------------- 🖼 RENDER ----------------------------------- */

	return (
		<Frame {...rest} height={state.cardHeight}>
			<Stack
				direction="vertical"
				alignment="start"
				distribution="start"
				// backgroundColor="teal"
				gap={8}
				height="100%"
				width="100%"
				// paddingTop = {80}
			>
				<Thumbnail image={state.image} duration={state.duration}></Thumbnail>

				{/* Card details */}
				<div
					style={{
						display: "inline-block",
						background: "lightgrey",
						width: 343,
						fontFamily: "Retina",
						fontSize: 11,
						fontWeight: 600,
						textAlign: "left",
						color: "#7E7E7E",
						marginLeft: 16,
						marginRight: 16,
						marginTop: 6,
					}}
				>
					{state.uploadTime}
				</div>
				<div
					style={{
						display: "inline-block",
						// background: "lightgrey",
						width: 343,
						fontFamily: "Retina",
						fontSize: 18,
						fontWeight: 800,
						textAlign: "left",
						color: "#0D0D0D",
						marginLeft: 16,
						marginRight: 16,
					}}
				>
					{state.title}
				</div>

				{/* Channel & Verified icon */}
				<Stack
					direction="horizontal"
					alignment="start"
					distribution="start"
					gap={4}
					height={16}
				>
					<div
						ref={channelDetail}
						style={{
							display: "inline-block",
							// background: "lightgrey",
							width: "auto",
							fontFamily: "Retina",
							fontSize: 13,
							fontWeight: 700,
							textAlign: "left",
							color: "#7E7E7E",
							marginLeft: 16,
						}}
					>
						{state.channel}
					</div>
					<Check_icon />
				</Stack>

				{/* {hasTopic && renderTopic } */}
				{hasTopic && <Topic label={topicLabel}></Topic>}
			</Stack>
		</Frame>
	);
};

Card.defaultProps = {
	height: 300,
	width: 375,
	background: "white",
	videoID: "",
	hasTopic: false,
	topicLabel: "Topic",
};

addPropertyControls(Card, {
	videoID: {
		title: "Video ID",
		type: ControlType.String,
		placeholder: "Enter video id",
		defaultValue: "x7tlu48",
	},
	hasTopic: {
		title: "Has Topic",
		type: ControlType.Boolean,
		enabledTitle: "Yes",
		disabledTitle: "No",
		defaultValue: true,
	},
	topicLabel: {
		title: "Topic label",
		type: ControlType.String,
		placeholder: "Enter topic label",
		defaultValue: "Topic",
		hidden(props) {
			return props.hasTopic === false;
		},
	},
});
