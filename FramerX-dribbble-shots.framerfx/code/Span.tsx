import * as React from "react";
import { Frame } from "framer";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

export const Span = () => {
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

	const { loading, error, data } = useQuery(QUERY);

	if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
        
    console.log("Span log data", data)
    console.log(data.video.title)

    // const [title, setTitle] = React.useState("Hello neighbour")


	return <Frame backgroundColor="orange">{data.video.title}</Frame>;
};
