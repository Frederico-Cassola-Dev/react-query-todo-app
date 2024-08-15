import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import './App.css'
import { useRef } from "react";


const postsData = [
  { id: 1, title: "first post" },
  { id: 2, title: "second post" }
];


function App() {
  const titleRef = useRef();

  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: () => {
      return getPostsData();
    }
  });
  console.log("length of postsQueryData", postsQuery.data?.lenght)
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
    mutationFn: async (postId) => {
      return deletePostData(postId)
    },
    onSuccess: () => {
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
      {postsQuery.data && postsQuery.data.map((post) =>
      (<div key={post.id}>
        {post.title}
      </div>)
      )}
      <button
        disabled={deletePostMutation.isPending}
        onClick={() => deletePostMutation.mutate(postsQuery.data[postsQuery.data.length - 1].id)
        }

      >
        Delete last post
      </button>
    </>
  )
}

function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
};

const getPostsData = async () => {
  const response = await fetch("http://localhost:5000/tasks")
  return response.json();
}
const addNewPostsData = async (inputDataNewPost) => {
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
  return response;
}

const deletePostData = async (postId) => {
  console.log("hello from deletePostData");
  console.log("postId", postId);
  const response = await fetch(`http://127.0.0.1:5000/tasks/${postId}`, {
    method: "DELETE"
  });
  return response
}
export default App
