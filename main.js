const button = document.querySelector('.create-button');
const searchInput = document.querySelector('.search');
const lightbox = document.querySelector('.js-lightbox');
const lightboxContent = document.querySelector('.lightbox__content');
const overlay = document.querySelector('.lightbox__overlay');
const todoContainer = document.querySelector('.todo-container');
const selectStatus = document.querySelector('.js-status');
const selectPriority = document.querySelector('.js-priority');
const markup = createMenu();
button.addEventListener('click', openTodoCreation);
overlay.addEventListener('click', closeOverlay);
searchInput.addEventListener('input', filterByName);
selectStatus.addEventListener('change', filterByStatus);
selectPriority.addEventListener('change', filterByPriority);


function createTodoMarkup(title, description, priority) {
    return `<div class="todo-item">
    <div class="todo-item__done-img hide"></div>
    <p class="todo-item__title">${title}</p>
    <p class="todo-item__description">${description}</p>
    <p class="todo-item__priority">${priority}</p>
    <select class="todo-item__select">
       <option value="none" hidden="">...</option>
       <option>Open</option>
       <option>Done</option>
       <option>Delete</option>
        </select>
</div>`
}

function createMenu() {
    return `<div class="create-menu">
    <p class="title">Title</p>
    <input type="text" class="title-input" placeholder="Title..." maxlength="25" required>
    <p class="description">Description</p>
    <input type="text" class="description-input" placeholder="Description..." required>
    <p class="priority">Priority</p>
    <select class="create-menu-select ">
        <option>High</option>
        <option>Normal</option>
        <option>Low</option>
    </select>
    <button class="cancel-todo">Cancel</button>
    <button class="save-todo">Save</button>
</div>`
}


function openTodoCreation(e) {
    if(e.target === e.currentTarget){
        return;
    }
    lightbox.classList.add('is-open');
    window.addEventListener('keydown', closeOverlayByEsc);
    lightboxContent.insertAdjacentHTML('afterbegin', markup);
    const title = document.querySelector('.title-input');
    const description = document.querySelector('.description-input');
    const priority = document.querySelector('.create-menu select');
    const save = document.querySelector('.save-todo');
    save.addEventListener('click', saveNewTodo);
    save.addEventListener('keydown', saveNewTodo);
    function saveNewTodo() {
        const menu = document.querySelector('.create-menu');
        if(title.value.length !== 0 && description.value.length !==0){
            const newTodoItem = createTodoMarkup(title.value,description.value,priority.value);
            todoContainer.insertAdjacentHTML('beforeend', newTodoItem);
            lightbox.classList.remove('is-open');
            menu.remove();
            const todoSelect = document.querySelectorAll('.todo-item__select');
            todoSelect.forEach(select=>{
                select.addEventListener('change', () =>{
                    if(select.value === 'Done'){
                        select.closest('.todo-item').classList.add('done-todo');
                        select.closest('.todo-item').firstElementChild.classList.remove('hide');
                    }
                    else if(select.value === 'Delete'){
                        select.closest('.todo-item').remove();
                    }
                    else {
                        select.closest('.todo-item').classList.remove('done-todo');
                        select.closest('.todo-item').firstElementChild.classList.add('hide');
                    }
                })
            })
        }
        else {
            alert('TITLE AND DESCRIPTION FIELD ARE REQUIRED');
        }
    }
}

function closeOverlay(e) {
    const menu = document.querySelector('.create-menu');
    window.removeEventListener('keydown', closeOverlayByEsc);
    if(e.target === e.currentTarget || e.target === document.querySelector('.cancel-todo')){
        lightbox.classList.remove('is-open');
        menu.remove();
    }
}

function filterByStatus() {
        const todoItems = document.querySelectorAll('.todo-item');
        todoItems.forEach(item => {
            if (!item.classList.contains('done-todo') && selectStatus.value ==='Done') {
                item.closest('.todo-item').classList.add('none-status');
            }
            else if(selectStatus.value ==='Open' && item.classList.contains('done-todo')){
                item.closest('.todo-item').classList.add('none-status');
            }
            else {
                item.closest('.todo-item').classList.remove('none-status');
            }
        });
}

function filterByPriority() {
    const todoItemsPriority = document.querySelectorAll('.todo-item__priority');
    todoItemsPriority.forEach(item => {
       if(item.textContent !== selectPriority.value){
           item.closest('.todo-item').classList.add('none-priority');
       }
       else{
           item.closest('.todo-item').classList.remove('none-priority');
       }
    });
}

function filterByName(e) {
    if(todoContainer.children.length >= 2) {
        const allItems = document.querySelectorAll('.todo-item__title');
        allItems.forEach(item => {
            if (!item.textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
                item.closest('.todo-item').classList.add('none-search');
            }
            else{
                item.closest('.todo-item').classList.remove('none-search');
            }
        })
    }
    else {
        alert('NOTHING TO FILTER');
        searchInput.value = '';
    }
}

function closeOverlayByEsc(e) {
    const menu = document.querySelector('.create-menu');
    if(e.code === 'Escape'){
        lightbox.classList.remove('is-open');
        menu.remove();
        window.removeEventListener('keydown', closeOverlayByEsc);
    }
}
