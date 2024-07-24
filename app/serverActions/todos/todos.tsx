'use server'

import apiRequestHandler from "@/functions/apiRequestHandler"

export type GetTodosAPIResponse = {
  id: string,
  categoryId: string,
  title: string,
  text: string,
  done: boolean,
  deadline: Date
}[]

export type PostAddTodoBody = {
  categoryId: string,
  title: string,
  text: string,
  done: boolean,
  deadline: Date
}

export async function getTodos(categoryId: string) {
  return apiRequestHandler<GetTodosAPIResponse>('GET', `/categories/${categoryId}/todos`);
}

export async function addTodo(data: PostAddTodoBody) {
  return apiRequestHandler<GetTodosAPIResponse[number]>('POST', `/categories/${data.categoryId}/todos`, data);
}

export async function deleteTodo(data: { categoryId: string, todoId: string }) {
  return apiRequestHandler<GetTodosAPIResponse[number]>('DELETE', `/categories/${data.categoryId}/todos/${data.todoId}`, data);
}

export async function markAsDoneTodo(data: { categoryId: string, todoId: string }) {
  return apiRequestHandler<GetTodosAPIResponse[number]>('PUT', `/categories/${data.categoryId}/todos/${data.todoId}`, { done: true });
}