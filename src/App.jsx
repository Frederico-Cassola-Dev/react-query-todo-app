import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query"
import { useRef } from "react";
import useDeleteTask from "./hooks/useDeleteTask";
import useAddTask from "./hooks/useAddTask";
import { getTaskData } from "./services/allFetch"

import './App.css'

function App() {
  const titleRef = useRef();

  const postsQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: () => {
      return getTaskData();
    },
    // NOTE: Need to learn about placeholderData from useQuery()
    // NOTE: youtube video in play list React-Query;
    placeholderData: keepPreviousData
  });

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
        onClick={() => deleteTask.mutate(postsQuery.data[postsQuery.data.length - 1]?.id)
        }
      >
        Delete last post
      </button>
      {addTask.isPending || deleteTask.isPending ?
        (<h1>Is Loading...</h1>) :
        postsQuery.data && postsQuery.data.map((post) =>
        (<div key={post.id}>
          {post.title}
        </div>)
        )
      }
    </>
  )
}


export default App
