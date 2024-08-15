import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react";
import useDeleteTask from "./hooks/useDeleteTask";
import { getPostsData, addNewPostsData, deletePostData } from "./services/allFetch"

import './App.css'

function App() {
  const titleRef = useRef();

  const queryClient = useQueryClient();
  const postsQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: () => {
      return getPostsData();
    }
  });

  const newPostMutation = useMutation({
    mutationFn: () => {
      return addNewPostsData(titleRef.current.value);
    },
    onSuccess: () => {
      // Make a refetch on postsQuery if success on the addNewPost
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const deleteTask = useDeleteTask();

  //TODO: In case slow net manage the loading message
  // if (newPostMutation.isPending || deleteTask.isPending) return <h1>Is Loading...</h1>;

  return (
    <>
      <h1>React-Query Learning</h1>
      <input type="text" name="" ref={titleRef} />
      <button
        disabled={newPostMutation.isPending}
        onClick={
          () => {
            newPostMutation.mutate(titleRef.current.value)
          }
        }
      >
        Add new post
      </button>
      <button
        // disabled={deletePostMutation.isPending}
        onClick={() => deleteTask.mutate(postsQuery.data[postsQuery.data.length - 1]?.id)
        }
      >
        Delete last post
      </button>
      {postsQuery.data && postsQuery.data.map((post) =>
      (<div key={post.id}>
        {post.title}
      </div>)
      )}
    </>
  )
}


export default App
