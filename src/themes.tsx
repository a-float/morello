// import { ThemeOptions } from "@mui/material/styles/createTheme";

const secondaryColor = {
    dark: {
        light: "#262626",
        main: "#171717",
        dark: "#040404"
    },
    light: {
        light: "#fefefe",
        main: "#fafafa",
        dark: "#bebebe"
    }
}

export const createOptions = (options: any, isDarkMode: boolean): any => {
    const mode = isDarkMode ? "dark" : "light"
    const newOptions = { ...options, palette: { ...options.palette, mode, secondary: secondaryColor[mode] } }
    return newOptions
}

const common = {
    palette: {
        action: {
            hoverOpacity: 0.12
        }
    }
}
// the secondary main color is used as the top bar background
const myThemes: { name: string, options: any }[] = [
    {
        name: "Sky",
        options: {
            ...common,
            ...{
                palette:
                {
                    primary: {
                        main: "#696edd",
                        light: "#8f94fb",
                        dark: "#4e54c8"
                    },
                    background: {
                        default: "linear-gradient(135deg, #8f94fb, #4e54c8)"
                    }
                }
            }
        }
    },
    {
        name: "Crimson",
        options: {
            ...common,
            ...{
                palette:
                {
                    primary: {
                        main: "#dc3a3c",
                        light: "#ef473a",
                        dark: "#cb2d3e"
                    },
                    background: {
                        default: "linear-gradient(to right, #cb2d3e, #ef473a)"
                    },

                }
            }
        }
    },
    {
        name: "Summer",
        options: {
            ...common,
            ...{
                palette:
                {
                    primary: {
                        main: "#29c1be",
                        light: "#fdbb2d",
                        dark: "#22c1c3"
                    },
                    secondary: {
                        main: "#fafafa"
                    },
                    background: {
                        default: "linear-gradient(to right, #22c1c3, #fdbb2d)"
                    }

                }
            }
        }
    },
    {
        name: "Spring",
        options: {
            ...common,
            ...{
                palette:
                {
                    primary: {
                        main: "#ffb7b2",
                        light: "#ffc3a0",
                        dark: "#ffafbd"
                    },
                    background: {
                        default: "linear-gradient(to right, #ffafbd, #ffc3a0)"
                    }

                }
            }
        }
    },
    {
        name: "Dawn",
        options: {
            ...common,
            ...{
                palette:
                {
                    primary: {
                        main: "#ff8e8a",
                        light: "#ffd236",
                        dark: "#ff50d7"
                    },
                    secondary: {
                        main: "#fafafa"
                    },
                    background: {
                        default: "linear-gradient(90deg, rgba(255,212,52,1) 0%, rgba(255,79,216,1) 100%)"
                    }

                }
            }
        }
    },
    {
        name: "JellyBean",
        options: {
            ...common,
            ...{
                palette:
                {
                    primary: {
                        main: "#bd97eb",
                        light: "#8bfafc",
                        dark: "#ed35da"
                    },
                    background: {
                        default: "linear-gradient(70deg, #ef32d9, #89fffd)"
                    }

                }
            }
        }
    },
    {
        name: "Office",
        options: {
            ...common,
            ...{
                palette:
                {
                    primary: {
                        main: "#5f6b78",
                        light: "#859398",
                        dark: "#283048"
                    },
                    background: {
                        default: "linear-gradient(0deg, #283048, #859398)"
                    }

                }
            }
        }
    }
]

myThemes.forEach(t => t.options.palette.text = { disabled: t.options.palette.primary.dark })
export default myThemes