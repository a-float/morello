import React from "react";
import { FunctionComponent } from "react";

interface IconProps {
    color?: string,
    hoverColor?: string,
    onClick?: (event: any) => void,
    children: JSX.Element
}

const MyIcon: FunctionComponent<IconProps> = (props) => {
    const propsToPass: any = {}
    if ("color" in props) propsToPass.sx = { color: props.color, "&:hover": {color: props.color} }
    if ("hoverColor" in props) propsToPass.sx = { ...propsToPass.sx, "&:hover": {color: props.hoverColor} }
    if ("onClick" in props) propsToPass.onClick = props.onClick
    return (
        React.cloneElement(props.children, propsToPass)
    )
}

export default MyIcon