import * as React from "react";
import { Frame } from "framer";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

export const Span = () => {

	const { loading, error, data } = useQuery(QUERY);

	if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
        
    console.log("Span log data", data)
    console.log(data.video.title)

	return <Frame backgroundColor="orange">{data.video.title}</Frame>;
};
