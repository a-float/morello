// import { ThemeOptions } from "@mui/material/styles/createTheme";

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
                    secondary: {
                        main: "#fafafa"
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
                        main: "#d32f2f",
                        light: "#ef5350",
                        dark: "#c62828"
                    },
                    secondary: {
                        main: "#fafafa"
                    },
                    background: {
                        default: "linear-gradient(to right, #ed213a, #93291e)"
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
                    secondary: {
                        main: "#fafafa"
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
                        default:"linear-gradient(90deg, rgba(255,212,52,1) 0%, rgba(255,79,216,1) 100%)"
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
                    secondary: {
                        main: "#fafafa"
                    },
                    background: {
                        default: "linear-gradient(to right, #ef32d9, #89fffd)"
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
                        main: "#818181",
                        light: "#bfbfbf",
                        dark: "#737373"
                    },
                    secondary: {
                        main: "#fafafa"
                    },
                    background: {
                        default: "linear-gradient(180deg, rgba(160,160,160,1) 0%, rgba(90,90,90,1) 100%)"
                    }

                }
            }
        }
    }
]

myThemes.forEach(t => t.options.palette.text = { disabled: t.options.palette.primary.dark })
console.log(myThemes);
export default myThemes