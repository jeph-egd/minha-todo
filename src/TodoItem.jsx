import './TodoItem.css';

function TodoItem({ tarefa, onClick }) {
  return (
    <li className={`todo-item ${tarefa.concluida ? 'concluida' : ''}`} onClick={onClick}>
      <strong>{tarefa.texto}</strong>
      <br />
      <small>{tarefa.data}</small>
    </li>
  );
}

export default TodoItem;
