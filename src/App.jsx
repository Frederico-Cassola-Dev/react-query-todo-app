import { useQuery, useMutation } from "@tanstack/react-query"
import './App.css'


const postsData = [
  { id: 1, title: "first post" },
  { id: 2, title: "second post" }
];

function App() {

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      wait(2000).then(() => [...postsData])
    ,
  });

  if (postsQuery.isLoading) return (
    <h1>
      Is Loading...
    </h1>);

  return (
    <>
      <h1>React-Query Learning</h1>
      {postsQuery.data && postsQuery.data.map((post) =>
      (<div key={post.id}>
        {post.title}
      </div>)
      )}
    </>
  )
}

function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
};

export default App
