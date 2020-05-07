import * as React from "react";
import {
	Frame,
	Stack,
	addPropertyControls,
	ControlType,
	useMotionValue,
} from "framer";


/* ------------------------------- IMPORTS  ---------------------------------- */

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

	// console.log(`Bearer ${data.access_token}`);
	// Returns oauth token
	return `Bearer ${data.access_token}`;
};

// Runs function
fetchToken();

/* ------------------------- APOLLO CLIENT SETUP  ---------------------------- */

// localStorage.setItem(
// 	"token",
// 	"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhaWQiOiIzY2NlNTliZTM4OTAxNjY4MzA1OCIsInJvbCI6IiIsInNjbyI6IiIsImx0byI6ImIzTmRXMUlFQVIwSldoc0FEZ0lHVUJSSVRSZ0RDMEJYWHhBWURBIiwiYWluIjowLCJhZGciOjAsImlhdCI6MTU4ODY3NDA5OSwiZXhwIjoxNTg4NzEwMDY1LCJkbXYiOiIxIiwiYXRwIjpudWxsLCJjYWQiOjIsImN4cCI6MiwiY2F1IjoyLCJraWQiOiJBRjg0OURENzNBNTg2M0NEN0Q5N0QwQkFCMDcyMjQzQiJ9.iI5g1gtJHTJgI6tkPPz3Lug2UK_bjfzRPPl7SrMGvlU"
// );

// Establishes link
const httpLink = createHttpLink({
	uri: "https://graphql.api.dailymotion.com",
});

// Gets oauth token from api
const asyncAuthLink = setContext((request) => fetchToken());

// Passes oauth token to header
const authLink = setContext((request, previousContext) => ({
	// headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
	headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
}));

// Builds Apollo client request
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

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

/* ------------------------------ VARIABLES ---------------------------------- */

let channelYPos;

/* -------------------------- RENDER VARIABLES ------------------------------- */

const VideoPlayer = (props) => {
	return (
		<iframe
			//@ts-ignore
			frameborder="0"
			width="100%"
			height="100%"
			src={`https://www.dailymotion.com/embed/video/${props.videoid}?autoplay=1`}
			allowfullscreen=""
			allow="autoplay"
		></iframe>
	);
};

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
			// height={24 + 15 + 2 + 24}
			height={24 + 15 + 2}
			width="100%"
			style={{
				marginTop: 8,
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
			<Frame
				opacity={props.showMargins ? 1 : 0}
				width="100%"
				height={24}
				background="rgba(0, 123, 255, 0.5)"
				style={{ color: "#4478AF", fontFamily: "Retina", fontWeight: 700 }}
				top={-4}
			>
				24px
			</Frame>
		</Stack>
	);
};

const Info = (props) => {
	const fontStyle = {
		fontFamily: "Retina",
	};

	// const channelDetail = React.useRef(null);
	const ref = React.useRef(null);

	const [state, setState] = React.useState({
		height: 100,
	});

	React.useEffect(() => {
		console.log("Update card info height");

		let updatedHeight = ref.current.offsetTop + ref.current.offsetHeight;

		setState({
			height: updatedHeight,
		});

		//@ts-ignore
		console.log(ref.current.offsetTop + ref.current.offsetHeight);
	}, [props]);

	return (
		<Stack
			direction="vertical"
			alignment="start"
			distribution="start"
			background="transparent"
			// backgroundColor="transparent"
			gap={4}
			height="auto"
			// height={state.height}
			width="100%"
		>
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
				{props.uploadTime}
			</div>

			<div
				style={{
					display: "inline-block",
					// background: "lightgrey",
					width: 343,
					fontFamily: "Retina",
					fontSize: 18,
					fontWeight: 700,
					lineHeight: "20px",
					textAlign: "left",
					color: "#0D0D0D",
					marginLeft: 16,
					marginRight: 16,
				}}
				ref={ref}
			>
				{props.title}
			</div>

			{/* Channel & Verified icon */}
			<Stack
				direction="horizontal"
				alignment="start"
				distribution="start"
				gap={2}
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
						marginLeft: 16,
					}}
				>
					{props.channel}
				</div>

				<Frame
					name="check-icon"
					size={8}
					borderRadius="100%"
					background="transparent"
				>
					<svg viewBox="0 0 10 10">
						<path
							d="M5,0.833333333 C7.30118646,0.833333333 9.16666667,2.69881354 9.16666667,5 C9.16666667,7.30118646 7.30118646,9.16666667 5,9.16666667 C2.69881354,9.16666667 0.833333333,7.30118646 0.833333333,5 C0.833333333,2.69881354 2.69881354,0.833333333 5,0.833333333 Z M6.97014843,3.66370551 C6.80742998,3.50098705 6.54361124,3.50098705 6.38089278,3.66370551 L6.38089278,3.66370551 L4.17552061,5.86907768 L3.41962783,5.1131849 C3.25690937,4.95046645 2.99309063,4.95046645 2.83037217,5.1131849 C2.66765372,5.27590335 2.66765372,5.5397221 2.83037217,5.70244055 L2.83037217,5.70244055 L3.88089278,6.75296116 C4.04361124,6.91567961 4.30742998,6.91567961 4.47014843,6.75296116 L4.47014843,6.75296116 L6.97014843,4.25296116 C7.13286689,4.0902427 7.13286689,3.82642396 6.97014843,3.66370551 Z"
							fill="#7E7E7E"
						></path>
					</svg>
				</Frame>


			</Stack>

			{props.topic != null && (
				<Topic label={props.topic} showMargins={props.showMargins}></Topic>
			)}
		</Stack>
	);
};

// Card structure
const Content = (props) => {
	/* ---------------------------- GRAPHQL QUERY  ------------------------------- */
	const QUERY = gql`
		{
			video(xid: ${props.videoID}) {
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

	const { loading, error, data } = useQuery(QUERY);

	// console.log(data);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	/* ----------------------------- 🖼 RENDER ----------------------------------- */

	return (
		<Stack
			direction="vertical"
			alignment="start"
			distribution="start"
			backgroundColor="transparent"
			gap={4}
			height="100%"
			width="100%"
		>
			{/* Card thumbnail */}
			{props.autoplay ? (
				<VideoPlayer videoid={data.video.xid}></VideoPlayer>
			) : (
				<Thumbnail
					image={data.video.thumbnailURL}
					duration={formatDuration(data.video.duration)}
				></Thumbnail>
			)}

			{/* Card info */}
			<Info
				uploadTime="10 hours ago"
				title={data.video.title}
				channel={data.video.channel.name}
				showMargins={props.showMargins}
				topic={
					data.video.topics.edges.length > 0
						? data.video.topics.edges[0].node.name
						: null
				}
			></Info>
			{data.video.topics.edges.length > 0 ? null : (
				<Frame
					opacity={props.showMargins ? 1 : 0}
					width="100%"
					height={24}
					background="rgba(0, 123, 255, 0.5)"
					style={{ color: "#4478AF", fontFamily: "Retina", fontWeight: 700 }}
					top={-4}
				>
					24px
				</Frame>
			)}
		</Stack>
	);
};

/* ----------------------------- CONTAINER ----------------------------------- */

export const Card = (props) => {
	const {
		videoID,
		autoplay: autoplayProp,
		height: heightProps,
		showMargins,
		...rest
	} = props;

	// Initiates state
	const [state, setState] = React.useState({
		height: heightProps,
		autoplay: autoplayProp,
	});

	// Updates autoplay state
	React.useEffect(() => {
		let updatedValue = autoplayProp;
		setState((prevState) => ({
			...prevState,
			autoplay: updatedValue,
		}));
	}, [autoplayProp]);

	/* ----------------------------- 🖼 RENDER ----------------------------------- */
	return (
		<Frame {...rest} height={heightProps}>
			<ApolloProvider client={client}>
				<Content
					videoID={videoID}
					autoplay={state.autoplay}
					showMargins={showMargins}
				></Content>
			</ApolloProvider>
		</Frame>
	);
};

Card.defaultProps = {
	height: 250,
	width: 375,
	background: "transparent",
	videoID: "x7tlu48",
	autoplay: false,
	showMargins: false,
};

addPropertyControls(Card, {
	videoID: {
		title: "Video ID",
		type: ControlType.String,
		placeholder: "Enter video id",
		defaultValue: "x7tlu48",
	},
	autoplay: {
		title: "Autoplay",
		type: ControlType.Boolean,
		enabledTitle: "Yes",
		disabledTitle: "No",
		defaultValue: false,
	},
	showMargins: {
		title: "Show margins",
		type: ControlType.Boolean,
		enabledTitle: "Yes",
		disabledTitle: "No",
		defaultValue: false,
	},
});
