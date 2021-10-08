import { TaskData } from "./components/Task"

export const defaultTask =
{
    name: "Task Name",
    descr: "Description",
    tags: []
}

export const data: TaskData[] = [
    {
        columnName: "Done",
        name: "task1",
        descr: "descr1",
        tags: [],
        id:"1"
    },
    {
        columnName: "Done",
        name: "task2",
        tags: [],
        id:"2"
    },

    {
        columnName: "In Progress",
        name: "task1",
        descr: "descr1",
        tags: [],
        id:"3"
    },
    {
        columnName: "In Progress",
        name: "task2",
        descr: "descr2",
        tags: [],
        id:"4"
    },
    {
        columnName: "In Progress",
        name: "task3",
        tags: ["Home"],
        id:"5"
    },
    {
        columnName: "In Progress",
        name: "task4",
        descr: "descr4",
        tags: [],
        id:"6"
    },
    {
        columnName: "To Do",
        name: "task5",
        descr: "descr5",
        tags: ["VeryImportant"],
        id:"7"
    },

    {
        columnName: "To Do",
        name: "Walk the dog",
        descr: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        tags: ["Home", "Important"],
        id:"8"
    },
    {
        columnName: "To Do",
        name: "task2",
        descr: "descr2",
        tags: ["Chill", "School"],
        id:"9"
    },
]