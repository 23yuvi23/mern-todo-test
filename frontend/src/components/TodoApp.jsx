import React, { useEffect, useState } from 'react'

function TodoApp(){
    const[todoText,setTodoText] = useState('')
    const[todos,setTodos]=useState([])

    // function to fetch all todos(when page loads)
    const fetchTodos = async () =>{
        try {
            
            const response = await fetch('http://localhost:5000/api/todos')
            const data = await response.json()

            if (data.success) {
                setTodos(data.todos)
            }

        } catch (error) {
            console.log('error fetching todos',error);
            
        }
    }

    // Add a new todo
    const handleAddTodo = async (e) => {
        e.preventDefault()

        if (!todoText.trim()) {
            alert('please enter a todo')
            return
        }
        try {

            const response = await fetch('http://localhost:5000/api/todos',{
                method:'POST',headers:{'Content-Type' : 'application/json'}, body: JSON.stringify({text: todoText})
                
            })
            const data = await response.json()

            if (data.success) {
                setTodoText('')
                fetchTodos()
            }
            
        } catch (error) {
            console.log('error adding todo',error);
        }
    }

    // page reload also fetches todo
    useEffect(()=>{
        fetchTodos()
    },[]) 

  return (
    <div>
        
        <h1>Todo App</h1>

    {/* // form */}
    <form onSubmit={handleAddTodo}> 
        <input type="text" placeholder='enter a todo' value={todoText} onChange={(e)=>setTodoText(e.target.value)}/>
        <button type='submit'>Add Todo</button>
    </form>

    {/* display todo */}
        <h2>My Todos</h2>
        <ul>
            {todos.map((todo)=>(
                <li key={todo._id}>{todo.text}</li>
            ))}
        </ul>
        </div>


  )

}
export default TodoApp