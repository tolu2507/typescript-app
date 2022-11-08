import { v4 as uuidV4 } from "uuid";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};
const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form")
const input = document.querySelector<HTMLInputElement>("#new-task-title");

const tasks: Task[] = loadTasks();
tasks.forEach(addNewTask)
form?.addEventListener('submit', e => {
  e.preventDefault()

  if (input?.value == "" || input?.value == null) return
  
  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
  tasks.push(newTask)
  saveTasks()
  addNewTask(newTask)
  input.value = ""
})

function addNewTask(task: Task) {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement('input')
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked
    saveTasks()
    console.log(tasks);
  })
  checkbox.type = 'checkbox'
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}
function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  const JsonParser = localStorage.getItem("TASKS")
  if (JsonParser == null) return []
  return JSON.parse(JsonParser)
}

export { }