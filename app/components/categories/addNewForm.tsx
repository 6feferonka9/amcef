import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import useTodoCategories from "@/hooks/useTodoCategories";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  name: z.string(),
})

export default function AddNewCategoryForm() {
  const { addCategory } = useTodoCategories();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const submitAddCategory: SubmitHandler<z.infer<typeof formSchema>> = (data) => { addCategory.mutate(data) }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full">New +</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <form method="submit" onSubmit={form.handleSubmit(submitAddCategory)} className="flex gap-2 items-end">
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Work" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="default" >Add</Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}