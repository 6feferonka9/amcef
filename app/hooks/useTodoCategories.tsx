'use client';

import { addTodoCategory, GetCategoriesAPIResponse, getTodoCategories } from "@/serverActions/todos/categories";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

export default function useTodoCategories(initialData?: GetCategoriesAPIResponse) {
  const queryClient = useQueryClient();

  const queryData = useQuery({
    queryKey: ['todoCategories'], queryFn: async () => {
      return await getTodoCategories();
    },
    initialData,
  });

  const addCategory = useMutation({
    mutationFn: addTodoCategory,
    onSuccess: (data: GetCategoriesAPIResponse[number]) => {
      queryClient.setQueryData(['todoCategories'], (prev: GetCategoriesAPIResponse) => [...prev, data]);
    },
    onError: () => {console.error('Handling error, maybe some notification')}
  })

  return {
    queryData,
    addCategory
  }
}