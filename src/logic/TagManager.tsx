import { createContext } from "react"

export type Tag = {
    id: number,
    name: string,
    color: string
}

class TagManager {
    static newTagColor = "#ba00ba"
    static defaultTags = [
        { id: 1, name: "Chill", color: "#90EE90" },            //lightgreen
        { id: 2, name: "Important", color: "#FFD700" },        //gold
        { id: 3, name: "Very Important", color: "#FA8072" },   //salmon
        { id: 4, name: "School", color: "#00FFFF" },           //cyan
        { id: 5, name: "Home", color: "#FFC0CB" },             //pink
    ]

    tags: Tag[]
    setTags: React.Dispatch<React.SetStateAction<Tag[]>>
    removeTagFromTasks: (idToRemove: number) => void

    constructor(tags: Tag[], setTags: any, refreshTasks: (idToRemove: number) => void) {
        this.tags = tags
        this.setTags = setTags
        this.removeTagFromTasks = refreshTasks
    }

    // getAllTags() {
    //     return [...this.tags]
    // }

    // getTags() {
    //     return this.tags.filter(tag => tag.name !== TagManager.defaultTag.name)
    // }

    reset() {
        this.setTags(TagManager.defaultTags)
    }

    getTag(id: number) {
        return this.tags.find(x => x.id === id)
    }

    generateTagId() {
        let id = -1
        while (id < 0 || this.getTag(id)) {
            id = Math.floor(Math.random() * 10000)
        }
        return id
    }

    addTag() {
        this.setTags((prevState: any[]) => [
            ...prevState,
            { id: this.generateTagId(), name: "New tag", color: TagManager.newTagColor }
        ])
    }

    removeTag(id: number) {
        this.setTags(prevState => [...prevState.filter(tag => tag.id !== id)])
        this.removeTagFromTasks(id)
    }

    renameTag(id: number, newName: string) {
        console.log(id, newName);
        const tag = this.getTag(id)
        if (!tag) return `Tag doesn't exist`
        if (this.getTagByName(newName)) return `Tag "${newName}" already exists`
        this.setTags([...this.tags.map(tag => tag.id !== id ? tag : { ...tag, name: newName })])
        return null
    }

    setTagColor(id: number, newColor: string) {
        const tag = this.getTag(id)
        if (!tag) return `Tag ${id} does not exist`
        this.setTags(prevState => [...prevState.map(tag => tag.id !== id ? tag : { ...tag, color: newColor })])
        return null
    }

    getColor(id: number) {
        return this.getTag(id)?.color || TagManager.newTagColor // Default tag
    }

    getTagByName(name: string) {
        return this.tags.find(tag => tag.name === name)
    }
}

const TagContext = createContext<{ tags: Tag[], tagManager: TagManager }>({
    tags: TagManager.defaultTags,
    tagManager: new TagManager([], [], () => { })
})

export { TagManager, TagContext }