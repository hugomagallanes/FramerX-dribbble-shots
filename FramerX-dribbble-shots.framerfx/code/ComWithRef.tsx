import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"

export function ComWithRef(props) {
    const { text, tint, ...rest } = props

    return (
        <Frame
            {...rest}
            background={tint}
            whileHover={{
                scale: 1.1,
            }}
            style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: 600,
            }}
        >
            {text}
        </Frame>
    )
}

ComWithRef.defaultProps = {
    height: 128,
    width: 240,
    text: "Get started!",
    tint: "#0099ff",
}

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(ComWithRef, {
    text: {
        title: "Text",
        type: ControlType.String,
        defaultValue: "Hello Framer!",
    },
    tint: {
        title: "Tint",
        type: ControlType.Color,
        defaultValue: "#0099ff",
    },
})
