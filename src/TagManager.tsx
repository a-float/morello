import { createContext } from "react"

class TagManager {
    static defaultTagColor = 'grey'

    static defaultTags = [
        { name: "Default", color: TagManager.defaultTagColor },
        { name: "Chill", color: "lightgreen" },
        { name: "Important", color: "gold" },
        { name: "VeryImportant", color: "salmon" },
        { name: "School", color: "cyan" },
        { name: "Home", color: "pink" },
    ]

    tags: { name: string, color: string }[]

    constructor() {
        this.tags = TagManager.defaultTags
    }

    getAllTags() {
        return [...this.tags]
    }

    getTags() {
        return this.tags.filter(tag => tag.name != "Default")
    }

    reset() {
        this.tags = TagManager.defaultTags
    }

    getTag(name: string) {
        return this.getAllTags().find(x => x.name === name)
    }

    renameTag(oldName: string, newName: string) {
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
        return this.getTag(name)?.color || this.getTag("Default")!.color;
    }
}

const TagContext = createContext(new TagManager())

export { TagManager, TagContext }