'use client';

import { Button } from "@/components/ui/button"
import { Card } from "../ui/card";
import useTodos from "@/hooks/useTodos";
import TodosFiltering from "./todosFiltering";
import { useSearchParams } from "next/navigation";
import { GetTodosAPIResponse } from "@/serverActions/todos/todos";
import AddNewTodoForm from "./addNewForm";

const filterTodosByFilterSettings = (todos: GetTodosAPIResponse | undefined | null, filterValue: string | null) => {
  if (!todos) return [];

  switch (filterValue) {
    case 'all': {
      return todos;
    }
    case 'active': {
      return todos.filter(item => !item.done);
    }
    case 'done': {
      return todos.filter(item => item.done);
    }
    default: {
      return todos;
    }
  }
}

export default function TodosList({ categoryId }: { categoryId: string }) {
  const { queryData, deleteTodoMutation, markDoneTodoMutation } = useTodos(categoryId);

  const searchParams = useSearchParams();
  const filterValue = searchParams.get('filter');

  const filteredTodos = filterTodosByFilterSettings(queryData.data, filterValue);

  return (
    <>
      <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
        TODOS
      </h1>

      <TodosFiltering />

      <Card className="p-2 mt-2">
        <ul className="flex gap-1 flex-col mb-2">
          {filteredTodos.map(todoItem => (
            <li key={todoItem.id}>
              <Card className="p-2 flex justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-xl text-muted-foreground">{todoItem.done && '✅'} {todoItem.title}</span>
                  <span className="text-sm font-medium leading-none">{todoItem.text}</span>
                  <span className="text-sm font-medium leading-none">Deadline: {new Date(todoItem.deadline).toLocaleDateString()}</span>
                </div>

                <div className="flex gap-2">
                  {!todoItem.done && <Button onClick={() => { markDoneTodoMutation.mutate({ categoryId, todoId: todoItem.id }) }}>Done</Button>}
                  <Button variant="destructive" onClick={() => { deleteTodoMutation.mutate({ categoryId, todoId: todoItem.id }) }}>Delete</Button>
                </div>
              </Card>
            </li>
          ))}
        </ul>

        <AddNewTodoForm categoryId={categoryId}/>
      </Card>
    </>
  )
}