import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTaskData } from "../services/allFetch";

const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteTask'],
    mutationFn: async (taskId) => await deleteTaskData(taskId),
    onSuccess: async () => {
      console.log("Delete Task Query Succefull"),
        await queryClient.invalidateQueries(["tasks"]);
    },
    onError: (error) => {
      return console.error(JSON.parse(error.message))
    }
  });
};

export default useDeleteTask;

