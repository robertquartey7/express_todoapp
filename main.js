import createTodo from "./createTodo.js";


const server = await createTodo()



server.listen(3000, ()=>{
    console.log('running on port 3000')
})