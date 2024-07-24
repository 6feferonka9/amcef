'use server'

import apiRequestHandler from "@/functions/apiRequestHandler";

export type GetCategoriesAPIResponse = {
  id: string,
  name: string,
}[]

export type PostAddCategoryBody = {
  name: string,
}

export async function getTodoCategories() {
  return apiRequestHandler<GetCategoriesAPIResponse>('GET', `/categories`);
}

export async function addTodoCategory(data: PostAddCategoryBody) {
  return apiRequestHandler<GetCategoriesAPIResponse[number]>('POST', `/categories`, data);
}