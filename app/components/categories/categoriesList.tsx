'use client';

import { Button } from "@/components/ui/button"
import useTodoCategories from "@/hooks/useTodoCategories";
import { GetCategoriesAPIResponse } from "@/serverActions/todos/categories";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card } from "../ui/card";
import AddNewCategoryForm from "./addNewForm";

export default function CategoriesList({ initialData }: { initialData: GetCategoriesAPIResponse }) {
  const { queryData } = useTodoCategories(initialData);
  //@ts-expect-error ... useParams does not want to accept id as undefined, altho in my case it can be because it is also imported outside of the dynamic route
  const { id: categoryId } = useParams<{ id: string | undefined }>()

  return (
    <Card className="p-2 mt-2">
      <ul className="flex gap-1 flex-col mb-2">
        <li>
          <Link href="/"><Button className="w-full" variant={categoryId === undefined ? 'default' : 'outline'}>All</Button></Link>
        </li>
        {queryData.data?.map(category => (
          <li key={category.id}>
            <Link href={`/category/${category.id}`} ><Button className="w-full" variant={categoryId === category.id ? 'default' : 'outline'}>{category.name}</Button></Link>
          </li>
        ))}
      </ul>

      <AddNewCategoryForm />
    </Card>
  )
}