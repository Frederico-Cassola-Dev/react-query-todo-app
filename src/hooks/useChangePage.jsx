import { useQueryClient, useMutation } from "@tanstack/react-query"
import { getPageData } from "../services/allFetch";

const useChangePage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["changePage"],
    mutationFn: async (pageNumber) => {
      return await getPageData(pageNumber)
    },
    onSuccess: async (data) => {
      console.log("Page change: ", data)
      await queryClient.invalidateQueries(["tasks"]);
    },
    onError: (error) => {
      return console.error(JSON.parse(error.message))
    }
  })
}

export default useChangePage;
