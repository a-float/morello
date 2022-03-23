
export const generateId = () => Math.floor(Math.random() * 10000)

export interface ColumnData {
    name: string,
    id: number
}