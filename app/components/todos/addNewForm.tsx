import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useForm, SubmitHandler } from "react-hook-form"
import useTodos from "@/hooks/useTodos";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  title: z.string(),
  text: z.string(),
  deadline: z.date()
})

export default function AddNewTodoForm({ categoryId }: { categoryId: string }) {
  const { addTodoMutation } = useTodos(categoryId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const addTodoFormSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    addTodoMutation.mutate({
      ...data,
      done: false,
      categoryId
    })
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>New +</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(addTodoFormSubmit)} className="flex gap-2 flex-col">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <div className="grid w-full max-w-sm items-center gap-2">
                      <Input type="text" placeholder="Work" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text</FormLabel>
                  <FormControl>
                    <div className="grid w-full max-w-sm items-center gap-2">
                      <Input type="text" placeholder="Text" {...field} />
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid w-full max-w-sm items-center gap-2">
              <FormField
                name="deadline"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="grid w-full max-w-sm items-center gap-2">
                          {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
                          {field.value ? <Button variant="outline">{field.value.toLocaleDateString()}</Button> : <Button variant="outline">Pick deadline</Button>}
                        </div>
                      </PopoverTrigger>
                      <PopoverContent>
                        <FormControl>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </FormControl>
                      </PopoverContent>
                      <FormMessage />
                    </Popover>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" variant="default">Add</Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}