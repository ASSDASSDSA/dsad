const API_URL = 'http://localhost:3000/api/todos';

async function fetchTodos() {
  const res = await fetch(API_URL);
  const todos = await res.json();
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    const btn = document.createElement('button');
    btn.textContent = 'Delete';
    btn.onclick = () => deleteTodo(todo.id);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

async function addTodo(text) {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  fetchTodos();
}

async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchTodos();
}

document.getElementById('todo-form').addEventListener('submit', e => {
  e.preventDefault();
  const input = document.getElementById('todo-input');
  const text = input.value.trim();
  if (text) addTodo(text);
  input.value = '';
});

fetchTodos();
