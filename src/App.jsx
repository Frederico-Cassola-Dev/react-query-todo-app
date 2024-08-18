import { useRef, useState } from "react";
import useGetAllTasks from "./hooks/useGetAllTasks";
import useDeleteTask from "./hooks/useDeleteTask";
import useAddTask from "./hooks/useAddTask";
import { Box, Button, Stack, TextField, Card } from "@mui/material";
import { AddTask, Delete, AssignmentTurnedIn } from '@mui/icons-material';
import './App.css'
import useChangePage from "./hooks/useChangePage";

function App() {
  const titleRef = useRef();
  const [pageNumber, setPageNumber] = useState(1);
  // const getAllTasks = useGetAllTasks();
  const addTask = useAddTask();
  const deleteTask = useDeleteTask();
  const changePage = useChangePage();
  // console.log(changePage?.data?.length)
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
          onClick={() => deleteTask.mutate(changePage.data[changePage.data.length - 1]?.id)
          }
        >
          Delete last post
        </Button>
      </Stack>
      <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap" justifyContent="center">
        {addTask.isPending || deleteTask.isPending ?
          (<h1>Is Loading...</h1>) :
          // getAllTasks.data && getAllTasks.data.map((post) => (
          changePage.data && changePage.data.map((post) => (
            <Box
              key={post.id}
              height={100}
              width={100}
              my={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={4}
              p={2}
              sx={{ border: '2px solid grey' }}>
              <Card variant="outlined" >
                {post.title}
              </Card>
            </Box>
          ))
        }
      </Stack>
      <Box display="flex" justifyContent="center">
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            if (pageNumber > 1) {
              setPageNumber(pageNumber - 1);
              changePage.mutate(pageNumber);
            }
          }}
        >
          previous
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            // TODO: Not correctly implemented
            if (changePage?.data?.length < 3 || pageNumber < 3) {
              setPageNumber(pageNumber + 1);
              changePage.mutate(pageNumber);
            }
          }
          }
        >
          next
        </Button>
      </Box >
    </>
  )
}


export default App
