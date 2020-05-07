import * as React from "react"
import {
    Frame,
    Stack,
    Scroll,
    StackProperties,
    addPropertyControls,
    ControlType,
    useMotionValue,
    useAnimation,
} from "framer"

import { Button } from "./canvas"

const items = ["Featured", "News", "Sports", "Entertainment", "Music"]

/* --------------------------- HELPER COMPONENT ------------------------------ */

const Title = ({ text, onTap, isSelected, ...props }) => {
    // Sets up ref
    const ref = React.useRef(null)

    // Initates state
    const [state, setState] = React.useState({
        isHighlighted: false,
    })

    // Sets internal state based on isSelected
    React.useEffect(() => {
        setState({
            isHighlighted: isSelected,
        })
    }, [isSelected])

    // Event handler
    const handleTap = () => {
        // OnTap bubbles ref to parent
        onTap(ref.current)
    }

    // Renders element
    return (
        <Frame
            {...props}
            ref={ref}
            width="auto"
            height="auto"
            background="transparent"
            style={{
                fontFamily: "Retina",
                fontSize: state.isHighlighted ? "28px" : "20px",
                //@ts-ignore
                fontWeight: state.isHighlighted ? "900" : "700",
                color: state.isHighlighted ? "#0D0D0D" : "#7E7E7E",
            }}
            top={state.isHighlighted ? 0 : 2}
            onTap={handleTap}
        >
            <div>{text}</div>
        </Frame>
    )
}

export function Navtitle(props) {
    const { currentlySelected, onValueChange, ...rest } = props

    /* -------------------------------- STATE ------------------------------------ */

    // Initiates state
    const [state, setState] = React.useState({
        selectedItem: 0,
        scrollPosition: 0,
    })

    /* ------------------------------ VARIABLES ---------------------------------- */
    const controls = useAnimation()
    // Animates scroll x position based on selectedItem
    controls.start({
        x: state.scrollPosition,
        transition: {
            ease: "easeOut",
            duration: 0.3,
        },
    })

    /* ---------------------------- EVENT HANDLERS ------------------------------- */

    const handleTap = (element, index) => {
        onValueChange(index)

        // Updates selectedItem with tapped item
        setState(prevState => ({
            ...prevState,
            selectedItem: index,
        }))

        // Updates scroll x position
        setState(prevState => ({
            ...prevState,
            scrollPosition: -element.offsetLeft,
        }))
    }

    /* ----------------------------- 🖼 RENDER ----------------------------------- */

    return (
        <Frame {...rest} background="transaprent">
            <Scroll
                // {...rest}
                direction="horizontal"
                width="100%"
                height="100%"
                background="transaprent"
                scrollAnimate={controls}
                x={16}
            >
                <Stack
                    direction="horizontal"
                    distribution="start"
                    alignment="center"
                    gap={20}
                    backgroundColor="white"
                    width={860}
                    paddingRight={200}
                >
                    {items.map((item, index) => {
                        return (
                            <Title
                                key={`${props.id}_option_${index}`}
                                text={item}
                                isSelected={
                                    state.selectedItem === index ? true : false
                                }
                                onTap={element => handleTap(element, index)}
                            ></Title>
                        )
                    })}
                </Stack>
            </Scroll>

            <Button right={0} />
        </Frame>
    )
}

/* ---------------------------- DEFAULT PROPS -------------------------------- */
Navtitle.defaultProps = {
    height: 52,
    width: 375,
    currentlySelected: 0,
    onValueChange: value => null,
}
