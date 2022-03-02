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
        name: "Forest",
        options: {
            ...common,
            ...{
                palette:
                {
                    primary: {
                        main: "#4da029",
                        light: "#939678",
                        dark: "#031105"
                    },
                    secondary: {
                        main: "#fafafa"
                    },
                    background: {
                        default: "url(https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrg&w=1260&h=750&dpr=2);"
                    }

                }
            }
        }
    }
]

myThemes.forEach(t => t.options.palette.text = { disabled: t.options.palette.primary.dark })
console.log(myThemes);
export default myThemes