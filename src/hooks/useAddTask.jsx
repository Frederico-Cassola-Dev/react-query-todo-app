import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTaskData } from "../services/allFetch";

const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addTask"],
    mutationFn: async (inputDataTask) => addTaskData(inputDataTask),
    onSuccess: async () => {
      console.log("Added task succefully")
      await queryClient.invalidateQueries(["tasks"]);
    },
    onError: (error) => {
      return console.error(JSON.parse(error.message))
    }
  })
}

export default useAddTask;
