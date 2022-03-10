import { createContext } from "react"

class TagManager {
    static defaultTag = { name: "Default", color: '#bababa' }

    static defaultTags = [
        TagManager.defaultTag,
        { name: "Chill", color: "#90EE90" },            //lightgreen
        { name: "Important", color: "#FFD700" },        //gold
        { name: "VeryImportant", color: "#FA8072" },    //salmon
        { name: "School", color: "#00FFFF" },           //cyan
        { name: "Home", color: "#FFC0CB" },             //pink
    ]

    tags: { name: string, color: string }[]

    constructor() {
        this.tags = TagManager.defaultTags
    }

    getAllTags() {
        return [...this.tags]
    }

    getTags() {
        return this.tags.filter(tag => tag.name !== TagManager.defaultTag.name)
    }

    reset() {
        this.tags = TagManager.defaultTags
    }

    getTag(name: string) {
        return this.getAllTags().find(x => x.name === name)
    }

    renameTag(oldName: string, newName: string) {
        if (oldName === TagManager.defaultTag.name) return "Can not modify the default tag name"
        if (this.getTag(newName)) return `Tag "${newName}" already exists`
        const oldTag = this.getTag(oldName)
        if (!oldTag) return `Tag "${oldName} does not exist`
        oldTag.name = newName
        return null
    }

    setTagColor(tagName: string, newColor: string) {
        const tag = this.getTag(tagName)
        if (!tag) return `Tag "${tagName} does not exist`
        tag.color = newColor
        return null
    }

    getColor(name: string) {
        return this.getTag(name)?.color || this.tags[0].color // Default tag
    }
}

const TagContext = createContext(new TagManager())

export { TagManager, TagContext }