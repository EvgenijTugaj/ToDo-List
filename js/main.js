'use strict';

let innerTodo = document.querySelector('.header-input'),
    newTodoBtn = document.querySelector('#add'),
    todo = document.querySelector('#todo'),
    todoCompleted = document.querySelector('#completed'),
    newTodoItem = todo.querySelectorAll('.todo-item')[0];

while (todo.firstChild) {
    todo.removeChild(todo.lastChild);
}
while (todoCompleted.firstChild) {
    todoCompleted.removeChild(todoCompleted.lastChild);
}

for(let i = 0; i < localStorage.length; i++) {
    newTodoItem.innerHTML = localStorage.getItem(localStorage.key(i))+'<div class="todo-buttons"><button class="todo-remove"></button><button class="todo-complete"></button></div>';
    let newItem = newTodoItem.cloneNode(true);
    if(localStorage.key(i).substring(0, 4) === 'todo'){
        todo.append(newItem);
    }else{
        todoCompleted.append(newItem);
    }  
}

newTodoBtn.addEventListener('click', function(){
    if(innerTodo.value !== ''){
        localStorage.setItem('todo-' + innerTodo.value, innerTodo.value);
    }   
});

let todoCompleteBtn = todo.querySelectorAll('.todo-complete');
todoCompleteBtn.forEach(function(item){
    item.addEventListener('click', function(){
        let innerVal = this.parentElement.parentElement.textContent.trim();
        localStorage.setItem('completed-' + innerVal, innerVal);
        localStorage.removeItem('todo-' + innerVal, innerVal);
        console.log(this.parentElement.parentElement.textContent);
        todoCompleted.appendChild(this.parentElement.parentElement);
    });
});

let todoRemoveBtn = document.querySelectorAll('.todo-remove');
todoRemoveBtn.forEach(function(item){
    item.addEventListener('click', function(){
        localStorage.removeItem(this.parentElement.parentElement.parentElement.id + '-' + this.parentElement.parentElement.textContent, this.parentElement.parentElement.textContent.trim());
        console.log(this.parentElement.parentElement.parentElement.id + '-' + this.parentElement.parentElement.textContent, this.parentElement.parentElement.textContent.trim());
        this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
    });
});