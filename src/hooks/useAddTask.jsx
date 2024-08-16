import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTaskData } from "../services/allFetch";

const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addTask"],
    mutationFn: async (inputDataTask) => addTaskData(inputDataTask),
    onSuccess: () => console.log("Added task succefully"),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries(["tasks"]);
      }
    },
    onError: (error) => console.log("Add task error:", error.json())
  })
}

export default useAddTask;
