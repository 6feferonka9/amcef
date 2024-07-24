import TodosList from "@/components/todos/todosList";

export default function CategoryPage({ params }: { params: { id: string } }) {
  return (
    <TodosList categoryId={params.id}></TodosList>
  )
}