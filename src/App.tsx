import './App.css';
import { TaskColumnProps } from './components/TaskColumn';
import { TaskDisplay } from './components/TaskDisplay'
// import './assets/css/fonts.css'

const data : TaskColumnProps[] = [
  {
    name: "Done",
    tasks: [
      {
        name: "task1",
        descr: "descr1",
        tags: []
      },
      {
        name: "task2",
        tags: []
      },
    ]
  },
  {
    name: "In progress",
    tasks: [
      {
        name: "task1",
        descr: "descr1",
        tags: []
      },
      {
        name: "task2",
        descr: "descr2",
        tags: []
      },
      {
        name: "task3",
        tags: ["Home"]
      },
      {
        name: "task4",
        descr: "descr4",
        tags: []
      },
      {
        name: "task5",
        descr: "descr5",
        tags: ["VeryImportant"]
      },
    ]
  },
  {
    name: "To Do",
    tasks: [
      {
        name: "Walk the dog",
        descr: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        tags: ["Home", "Important"]
      },
      {
        name: "task2",
        descr: "descr2",
        tags: ["Chill", "School"]
      },
    ]
  }
]

function App() {
  return (
    <div className="App">
      <TaskDisplay columns={data}/>
    </div>
  );
}

export default App;
