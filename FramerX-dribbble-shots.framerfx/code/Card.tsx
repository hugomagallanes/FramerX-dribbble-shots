import * as React from "react";
import {
	Frame,
	Stack,
	addPropertyControls,
	ControlType,
	useMotionValue,
} from "framer";
import { Image, Check_icon } from "./canvas";

// Apollo Client setup
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

// Apollo Provider setup
import gql from "graphql-tag";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";

/* -------------------------- FETCH OAUTH TOKEN  ----------------------------- */
const fetchToken = async () => {
	let key = "3cce59be389016683058";
	let secret = "4c90b07044ea0ff78c9bc6157c4b9c69a4e8d455";

	// Connects to server
	let response = await fetch(
		"https://graphql.api.dailymotion.com/oauth/token",
		{
			method: "POST",
			body:
				"grant_type=client_credentials&client_id=" +
				key +
				"&client_secret=" +
				secret,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		}
	);

	// Parses response into JSON
	let data = await response.json();

	// Stores token in local storage
	localStorage.setItem("token", data.access_token);


	console.log(`Bearer ${data.access_token}`)
	// Returns oauth token
	return `Bearer ${data.access_token}`;
};

// fetchToken()

/* ------------------------- APOLLO CLIENT SETUP  ---------------------------- */

// Establishes link
const httpLink = createHttpLink({
	uri: "https://graphql.api.dailymotion.com",
});


// Gets oauth token from api
const asyncAuthLink = setContext((request) => fetchToken());


// Passes oauth token to header
const authLink = setContext((request, previousContext) => ({
	headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
}));

// Builds Apollo client request
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

const QUERY = gql`
{
	video(xid: "x7tn87a") {
	  id
	  title
	  thumbnailURL(size: "x1080")
	  xid
	  duration
	  channel {
		name
		accountType
	  }
	  topics(whitelistedOnly: true, first: 2, page: 1) {
		edges {
		  node {
			name
		  }
		}
	  } 
	}
  }
`;

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

			<Frame
				size={24}
				borderRadius="100%"
				background="#0d0d0d"
				right={16}
				bottom={16}
			>
				<svg viewBox="-5 -7 25 25">
					<path
						d="M12.5181424,0.195333333 C15.3809432,3.05899891 15.3809432,7.70100109 12.5181424,10.5646667 C12.2578322,10.8250555 11.8357222,10.8251192 11.5753333,10.564809 C11.3149445,10.3044988 11.3148808,9.88238884 11.575191,9.622 C13.9174826,7.27900089 13.9174826,3.48099911 11.575191,1.138 C11.3148808,0.877611162 11.3149445,0.455501181 11.5753333,0.195190969 C11.8357222,-0.0651192429 12.2578322,-0.0650555043 12.5181424,0.195333333 Z M7.33333333,0.713333333 L7.33333333,10.0466667 C7.33333333,10.6056708 6.6867122,10.916453 6.2502033,10.5672459 L3.09947929,8.04666667 L0.666666667,8.04666667 C0.298476833,8.04666667 0,7.74818983 0,7.38 L0,3.38 C0,3.01181017 0.298476833,2.71333333 0.666666667,2.71333333 L3.09947929,2.71333333 L6.2502033,0.192754127 C6.6867122,-0.15645299 7.33333333,0.154329194 7.33333333,0.713333333 Z M6,2.10041657 L3.7497967,3.90057921 C3.631588,3.99514617 3.48471433,4.04666667 3.33333333,4.04666667 L1.33333333,4.04666667 L1.33333333,6.71333333 L3.33333333,6.71333333 C3.48471433,6.71333333 3.631588,6.76485383 3.7497967,6.85942079 L6,8.65958344 L6,2.10041657 Z M10.164809,2.54866667 C11.7263368,4.11066607 11.7263368,6.64266726 10.164809,8.20466667 C9.90449882,8.4650555 9.48238884,8.46511924 9.222,8.20480903 C8.96161116,7.94449882 8.96154742,7.52238884 9.22185764,7.262 C10.2628761,6.22066706 10.2628761,4.53266627 9.22185764,3.49133333 C8.96154742,3.2309445 8.96161116,2.80883451 9.222,2.5485243 C9.48238884,2.28821409 9.90449882,2.28827783 10.164809,2.54866667 Z"
						fill="#FFFFFF"
					></path>
				</svg>
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
			style={{
				marginTop: 12,
			}}
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

const Title = (props) => {
	const { loading, error, data } = useQuery(QUERY);

	console.log("Show data? Yes?");
	console.log(data);

	return (
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
			{props.text}
			{/* {data.dog[0].breed} */}
		</div>
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
	}

	/* ---------------------------- STATE GRAPHQL --------------------------------- */



	/* -------------------------------- STATE ------------------------------------ */

	// const [state, setState] = React.useState({
	// 	// id: "x7tlu48",
	// 	id: videoID,
	// 	image: "",
	// 	timestamp: "",
	// 	uploadTime: "10 hours ago",
	// 	title: "Once Upon a Time in Hollywood - Official Trailer",
	// 	channel: "FanReviews",
	// 	duration: "01:01",
	// 	cardHeight: 300,
	// });

	// React.useEffect(() => {

	// }, [videoID]);


	// Fetches content from API
	// React.useEffect(() => {
	// 	fetch(
	// 		`https://api.dailymotion.com/video/${videoID}}?fields=title%2Cthumbnail_1080_url%2Cowner.screenname%2Cid%2Cduration`
	// 	)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			setState((prevState) => ({
	// 				...prevState,
	// 				id: `${videoID}`,
	// 				image: data["thumbnail_1080_url"],
	// 				title: data.title,
	// 				channel: data["owner.screenname"],
	// 				duration: formatDuration(data.duration),
	// 			}));
	// 			// console.log(formatDuration(data.duration));
	// 		})
	// 		.then(() => {
	// 			// Adjusts card height based on content

	// 			// Check if components has been mounted
	// 			if (!channelDetail.current) return;

	// 			let updatedHeight;
	// 			let channelDetailHeight = 17;
	// 			let channelDetailMaxY =
	// 				channelDetail.current.offsetParent.offsetTop + channelDetailHeight;
	// 			let marginBottom = 20;

	// 			updatedHeight = channelDetailMaxY;

	// 			// Adds extra height if topic button is visible
	// 			// hasTopic ? (updatedHeight += 43) : (updatedHeight + marginBottom)
	// 			if (props.hasTopic) {
	// 				updatedHeight += 43 + marginBottom;
	// 			} else {
	// 				updatedHeight += marginBottom;
	// 			}

	// 			// Updates state
	// 			setState((prevState) => ({
	// 				...prevState,
	// 				cardHeight: updatedHeight,
	// 			}));

	// 			// console.log(
	// 			// 	`Total height: ${channelDetail.current.offsetParent.offsetTop}`
	// 			// );
	// 			// console.log(`Total height: ${updatedHeight}`);
	// 		});
	// }, [videoID, hasTopic]);

	/* ----------------------------- 🖼 RENDER ----------------------------------- */

	return (
		<Frame {...rest} height={state.cardHeight}>
			<ApolloProvider client={client}>
				<Stack
					direction="vertical"
					alignment="start"
					distribution="start"
					backgroundColor="white"
					gap={4}
					height="100%"
					width="100%"
					// paddingTop = {80}
				>
					<Thumbnail image={state.image} duration={state.duration}></Thumbnail>

					{/* Card details */}
					<div
						style={{
							display: "inline-block",
							// background: "lightgrey",
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
					<Title text={state.title}></Title>

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
			</ApolloProvider>
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
