import { createClient } from '@/utils/supabase/server';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

export default async function Page() {
  const supabase = await createClient();

  const { data: todos } = await supabase.from('todos').select();

  return <ul>{todos?.map((todo: Todo) => <li key={todo.id}>{todo.task}</li>)}</ul>;
}
