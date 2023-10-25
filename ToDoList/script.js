// Verileri Local Storage'dan al
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Sayfa yüklendiğinde mevcut görevleri görüntüle
function displayTodos() {
  const list = document.getElementById('list');
  list.innerHTML = '';

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    li.className = todo.done ? 'checked' : '';
    li.setAttribute('data-index', index);

    // Silme düğmesi oluştur
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close';
    closeBtn.textContent = '\u00D7';
    closeBtn.addEventListener('click', deleteTodo);

    // Görevi işaretleme için tıklama olayını ekleyin
    li.addEventListener('click', markAsDone);

    li.appendChild(closeBtn);
    list.appendChild(li);
  });
}

// Yeni görev eklemek için bu fonksiyonu kullan
function newElement() {
  const input = document.getElementById('task');
  const text = input.value.trim();

  if (text === '') {
    showErrorToast('Listeye boş ekleme yapamazsınız!');
    return;
  }

  const newTodo = {
    text,
    done: false,
  };

  todos.push(newTodo);
  input.value = '';

  displayTodos();
  updateLocalStorage();
  showSuccessToast('Listeye eklendi.');
}

// Görevi silmek için bu fonksiyonu kullan
function deleteTodo() {
  const index = parseInt(this.parentElement.getAttribute('data-index'));
  todos.splice(index, 1);
  displayTodos();
  updateLocalStorage();
}

// Görevi işaretleme için bu fonksiyonu kullan
function markAsDone() {
  const index = parseInt(this.getAttribute('data-index'));
  todos[index].done = !todos[index].done;
  displayTodos();
  updateLocalStorage();
}

// Birden fazla işaretleme için bu fonksiyonu kullan
function markMultipleAsDone() {
  const selectedIndexes = Array.from(document.querySelectorAll('li.checked')).map(li => parseInt(li.getAttribute('data-index')));
  todos.forEach((todo, index) => {
    if (selectedIndexes.includes(index)) {
      todo.done = true;
    }
  });
  displayTodos();
  updateLocalStorage();
}

// Local Storage'daki verileri güncelle
function updateLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Toast bildirimi gösterme
function showToast(type, message) {
  const toast = document.getElementById('liveToast');
  toast.className = `toast ${type}`;
  const toastBody = toast.querySelector('.toast-body');
  toastBody.textContent = message;
  new bootstrap.Toast(toast).show();
}

// Başarılı işlem bildirimi
function showSuccessToast(message) {
  showToast('success', message);
}

// Hata bildirimi
function showErrorToast(message) {
  showToast('error', message);
}

// Sayfa yüklendiğinde mevcut görevleri görüntüle
displayTodos();
