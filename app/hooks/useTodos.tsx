'use client';

import { addTodo, deleteTodo, getTodos, GetTodosAPIResponse, markAsDoneTodo } from "@/serverActions/todos/todos";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

export default function useTodos(categoryId: string) {
  const queryClient = useQueryClient();

  const queryData = useQuery({
    queryKey: ['todos', categoryId], queryFn: async () => {
      return await getTodos(categoryId);
    },
  });

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: (data: GetTodosAPIResponse[number]) => {
      queryClient.setQueryData(['todos', categoryId], (prev: GetTodosAPIResponse) => [...prev, data]);
    },
    onError: () => { console.error('Handling error, maybe some notification') }
  })

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (data: GetTodosAPIResponse[number]) => {
      queryClient.setQueryData(['todos', categoryId], (prev: GetTodosAPIResponse) => prev.filter(item => item.id !== data.id));
    },
    onError: () => { console.error('Handling error, maybe some notification') }
  })

  const markDoneTodoMutation = useMutation({
    mutationFn: markAsDoneTodo,
    onSuccess: (data: GetTodosAPIResponse[number]) => {
      queryClient.setQueryData(['todos', categoryId], (prev: GetTodosAPIResponse) => prev.map(item => item.id === data.id ? data : item));
    },
    onError: () => { console.error('Handling error, maybe some notification') }
  })

  return {
    queryData,
    addTodoMutation,
    deleteTodoMutation,
    markDoneTodoMutation
  }
}