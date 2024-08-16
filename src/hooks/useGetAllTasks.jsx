import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTaskData } from "../services/allFetch";

const useGetAllTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => {
      return getTaskData();
    },
    // NOTE: Need to learn about placeholderData from useQuery()
    // NOTE: youtube video in play list React-Query;
    placeholderData: keepPreviousData
  })
}

export default useGetAllTasks;
