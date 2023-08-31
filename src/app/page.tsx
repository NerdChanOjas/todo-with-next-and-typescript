import { TodoItem } from "@/components/TodoItem"
import { prisma } from "@/db"
import Link from "next/link"

async function toggleTodo(id: string, complete: boolean){
	"use server"

	await prisma.todo.update({ where: { id }, data: { complete }})

	console.log(id, complete)
}

export default async function Home() {

	const todos = await prisma.todo.findMany()
	// await prisma.todo.create({ data: { title: "test", complete: false }})

	return (
		<>
		<header className="flex justify-between items-center mb-4">
			<h1 className="text-2xl">Todos</h1>
			<Link href="./new" className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">New Todo</Link>
		</header>

		<ul className="pl-4">
			{todos.map(todo => (
				<TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}></TodoItem>
			))}
		</ul>
		</>
	)
}