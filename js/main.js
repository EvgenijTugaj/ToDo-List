'use strict';

let innerTodo = document.querySelector('.header-input'),
    newTodoBtn = document.querySelector('#add'),
    todo = document.querySelector('#todo'),
    todoCompleted = document.querySelector('#completed'),
    todoButtons = document.querySelectorAll('.todo-buttons')[0].cloneNode(true),
    newTodoItem = todo.querySelectorAll('.todo-item')[0].cloneNode(true);
    console.log('newTodoItem: ', newTodoItem);
let resetAll = function(){
    let todo = document.querySelector('#todo');
    while (todo.firstChild) {
        todo.removeChild(todo.lastChild);
  }
    let todoCompleted = document.querySelector('#completed');
    while (todoCompleted.firstChild) {
        todoCompleted.removeChild(todoCompleted.lastChild);
  }
};

resetAll();

let addAllTodo = function(){
for(let i = 0; i < localStorage.length; i++) {
    let newItem = document.createElement('li'); 
    newItem.classList.add('todo-item');   
    console.log('newItem: ', newItem);
    let key = localStorage.key(i);
    newItem.textContent = localStorage.getItem(key);
    
    if(localStorage.key(i).substring(0, 4) === 'todo'){
        todo.append(newItem);
    }else{
        todoCompleted.append(newItem);
    }  
    newItem.append(todoButtons);
    }
};
addAllTodo();
newTodoBtn.addEventListener('click', function(){
    if(innerTodo.value !== ''){
        localStorage.setItem('todo-' + innerTodo.value, innerTodo.value);
    }   
});

let todoCompleteBtn = todo.querySelectorAll('.todo-complete');
todoCompleteBtn.forEach(function(item){
    item.addEventListener('click', function(){
        let innerVal = this.parentElement.parentElement.textContent.trim();
        localStorage.setItem('сomplete-' + innerVal, innerVal);
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