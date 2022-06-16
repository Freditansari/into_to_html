let todoItems =[]

let renderTodo =(todo) =>{
    localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));
    const list = document.getElementById('todoList')
    let tag = document.createElement('li');

    const item = document.querySelector(`[data-key='${todo.id}']`);
    
    let isChecked
    if(todo.deleted){
        item.remove(todo)
        return
    }

    if(todo.checked){
        isChecked= 'text-decoration-line-through'
    }else {
        isChecked=''
    }

    tag.setAttribute('class', isChecked)
    tag.setAttribute('data-key', todo.id)
    tag.innerHTML=`
        <input id="${todo.id}" onclick="toggleDone(${todo.id})" type="checkbox"/>
        <span>${todo.task}</span>

        <i class="bi bi-x" onclick="deleteTodo(${todo.id})"></i>

    `

    if(item){
        list.replaceChild(tag, item)
    }else{
        list.append(tag)
    }
    
}

let addTodo =() =>{
   let newTodo= document.getElementById("todoInput").value;

   const todo = {
        task: newTodo,
        checked: false,
        id: Date.now()
   }
   todoItems.push(todo);
   renderTodo(todo)
  
}

let toggleDone = (id) =>{
    const index = todoItems.findIndex(item => item.id === Number(id))

    todoItems[index].checked = true;
    // console.log(todoItems)
    renderTodo(todoItems[index])
}

let deleteTodo = (id) =>{
    const index = todoItems.findIndex(item => item.id === Number(id))
    const todo = {
        deleted: true,
        ...todoItems[index]
      };
    //   console.log(todoItems)
      todoItems = todoItems.filter(item => item.id !== Number(id));
     renderTodo(todo)
}

document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoItemsRef');
    if (ref) {
      todoItems = JSON.parse(ref);
      todoItems.forEach(t => {
        renderTodo(t);
      });
    }
  });



