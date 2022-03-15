import { useTheme } from "@mui/material/styles"
import { FunctionComponent } from "react"

const ThemePreview: FunctionComponent<{}> = () => {
    const theme = useTheme()
    return (
        <div className="theme-preview" style={{
            position: 'relative', width: "100px", height: "80px",
            background: theme.palette.background.default,
            borderRadius: "2px", boxShadow: "1px 1px 1px 0px rgba(0,0,0,.4)"
        }}>
            <div style={{ position: "absolute", width: "100%", top: "0px", height: "16px", background: theme.palette.secondary.main }}></div>
            {/* left dot */}
            <div style={{
                right: "5%", position: "absolute", borderRadius: "100%", top:"4px",
                width: "8px", height: "8px", background: theme.palette.primary.main
            }}></div>
            {/* right dot */}
            <div style={{
                left: "5%", position: "absolute", borderRadius: "100%", top:"4px",
                width: "8px", height: "8px", background: theme.palette.primary.main
            }}></div>
            {/* title*/}
            <div style={{
                left: "43%", position: "absolute", borderRadius: "5px", top:"5px",
                width: "15px", height: "6px", background: theme.palette.primary.main
            }}></div>
        </div >
    )
}

export default ThemePreview