import { useRef, useContext } from "react";
import { useTheme } from "./hooks/useContext.jsx"
import useGetAllTasks from "./hooks/useGetAllTasks";
import useDeleteTask from "./hooks/useDeleteTask";
import useAddTask from "./hooks/useAddTask";
import Button from "./components/button.jsx";

import './App.css'

export default function App() {
  const titleRef = useRef();

  const getAllTasks = useGetAllTasks();
  // const addTask = useAddTask();
  const { isLoading, mutate: mutateAddTask } = useAddTask();
  const deleteTask = useDeleteTask();
  return (
    <>
      <h1>React-Query Learning</h1>
      <ThemeSwitcher />
      <input type="text" name="" ref={titleRef} />
      <Button
        titleRef={titleRef.current?.value}
        mutate={mutateAddTask}
      >
        Add task
      </Button>
      <Button
        titleRef={titleRef.current?.value}
        mutate={mutateAddTask}
      >
        Add task
      </Button>
      <button
        onClick={() => deleteTask.mutate(getAllTasks.data[getAllTasks.data.length - 1]?.id)}
      >
        Delete task
      </button>
      {/* {addTask.isPending || deleteTask.isPending ? */}
      {/* (<h1>Is Loading...</h1>) : */}
      {getAllTasks.data && getAllTasks.data.map((post) =>
      (<div key={post.id}>
        {post.title}
      </div>)
      )
      }
    </>
  )
}



function ThemeSwitcher() {
  // const { toggleTheme } = useContext(ThemeContext);
  const { toggleTheme } = useTheme();
  return <button type="button" onClick={toggleTheme} >Toggle Theme</button>
}
