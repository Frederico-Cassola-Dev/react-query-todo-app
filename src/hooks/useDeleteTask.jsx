import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostData } from "../services/allFetch";

const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteTask'],
    mutationFn: async (taskId) => await deletePostData(taskId),
    onSuccess: () => console.log("Delete Task Query Succefull"),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries(["tasks"]);
      }
    },
    onError: (error) => console.log('Delete task error:', error.json())
  });
};

export default useDeleteTask;



