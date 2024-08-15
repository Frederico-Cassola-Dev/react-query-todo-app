import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import './App.css'
import { useRef } from "react";

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

  const deletePostMutation = useMutation({
    mutationFn: (postId) => {
      return deletePostData(postId)
    },
    onSuccess: () => {
      // Make a refetch on postsQuery if success on the addNewPost
      queryClient.invalidateQueries(["tasks"]);
    }
  })

  if (postsQuery.isLoading) return <h1>Is Loading...</h1>;

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
        disabled={deletePostMutation.isPending}
        onClick={() => deletePostMutation.mutate(postsQuery.data[postsQuery.data.length - 1].id)
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


// function wait(duration) {
//   return new Promise(resolve => setTimeout(resolve, duration))
// };

const getPostsData = async () => {
  try {
    const response = await fetch("http://localhost:5000/tasks")
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.log(error)
  }
}
const addNewPostsData = async (inputDataNewPost) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/tasks", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: inputDataNewPost,
        is_urgent: 0,
        importance_id: "1",
      })
    })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.log(error);
  }

}

const deletePostData = async (postId) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/tasks/${postId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return response
  } catch (error) {
    console.log(error);
  }
}

export default App
