import { SxProps, Theme } from "@mui/material";
import React from "react";
import { FunctionComponent } from "react";

// TODO not actually usefull, could be removed
interface IconProps {
    color?: string,
    hoverColor?: string,
    onClick?: (event: any) => void,
    sx?: SxProps<Theme> | undefined,
    children: JSX.Element
}

const MyIcon: FunctionComponent<IconProps> = (props) => {
    const propsToPass: any = {}
    if ("color" in props) propsToPass.sx = { color: props.color, "&:hover": {color: props.color} }
    if ("hoverColor" in props) propsToPass.sx = { ...propsToPass.sx, "&:hover": {color: props.hoverColor} }
    if ("onClick" in props) propsToPass.onClick = props.onClick
    if ("sx" in props) propsToPass.sx = { ...propsToPass.sx, ...props.sx}
    return (
        React.cloneElement(props.children, propsToPass)
    )
}

export default MyIcon