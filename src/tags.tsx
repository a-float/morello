import { createContext } from "react"

export const defaultTagColors : Map<string, string> = new Map([
    ["Chill", "lightgreen",],
    ["Important", "gold",],
    ["VeryImportant", "salmon",],
    ["School", "cyan",],
    ["Home", "pink"]
])

export const TagColorContext = createContext(defaultTagColors)
