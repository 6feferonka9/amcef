'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

export default function TodosFiltering() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterValue = searchParams.get('filter');

  return (
    <div className="flex gap-3">
      <Button variant={(filterValue === 'all' || filterValue === null) ? 'default' : 'outline'} onClick={() => { router.push('?filter=all') }}>All</Button>
      <Button variant={filterValue === 'active' ? 'default' : 'outline'} onClick={() => { router.push('?filter=active') }}>Active</Button>
      <Button variant={filterValue === 'done' ? 'default' : 'outline'} onClick={() => { router.push('?filter=done') }}>Done</Button>
    </div>
  )
}