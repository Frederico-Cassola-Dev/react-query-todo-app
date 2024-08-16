import { useRef } from "react";
import useGetAllTasks from "./hooks/useGetAllTasks";
import useDeleteTask from "./hooks/useDeleteTask";
import useAddTask from "./hooks/useAddTask";

import './App.css'

function App() {
  const titleRef = useRef();

  const getAllTasks = useGetAllTasks();
  const addTask = useAddTask();
  const deleteTask = useDeleteTask();

  return (
    <>
      <h1>React-Query Learning</h1>
      <input type="text" name="" ref={titleRef} />
      <button
        disabled={addTask.isPending}
        onClick={
          () => {
            addTask.mutate(titleRef.current.value)
          }
        }
      >
        Add new post
      </button>
      <button
        disabled={deleteTask.isPending}
        onClick={() => deleteTask.mutate(getAllTasks.data[getAllTasks.data.length - 1]?.id)
        }
      >
        Delete last post
      </button>
      {addTask.isPending || deleteTask.isPending ?
        (<h1>Is Loading...</h1>) :
        getAllTasks.data && getAllTasks.data.map((post) =>
        (<div key={post.id}>
          {post.title}
        </div>)
        )
      }
    </>
  )
}


export default App
