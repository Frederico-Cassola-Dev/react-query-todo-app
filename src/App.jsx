import { useRef } from "react";
import useGetAllTasks from "./hooks/useGetAllTasks";
import useDeleteTask from "./hooks/useDeleteTask";
import useAddTask from "./hooks/useAddTask";
import { Box, Button, Stack, TextField } from "@mui/material";
import { AddTask, Delete, AssignmentTurnedIn } from '@mui/icons-material';
import './App.css'

function App() {
  const titleRef = useRef();

  const getAllTasks = useGetAllTasks();
  const addTask = useAddTask();
  const deleteTask = useDeleteTask();

  return (
    <>
      <h1>React-Query Learning</h1>
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <AssignmentTurnedIn sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Insert your new task" variant="standard" type="text" name="" inputRef={titleRef} />
        </Box>
        <Button
          variant="contained"
          startIcon={<AddTask />}
          size="small"
          disabled={addTask.isPending}
          onClick={
            // INFO: Simulate error on useMutation query
            // () => addTask.mutate()
            () => addTask.mutate(titleRef.current.value)
          }
        >
          Add new post
        </Button>
        <Button
          variant="outlined"
          startIcon={<Delete />}
          size="small"
          disabled={deleteTask.isPending}
          onClick={() => deleteTask.mutate(getAllTasks.data[getAllTasks.data.length - 1]?.id)
          }
        >
          Delete last post
        </Button>
      </Stack>
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
