import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import './App.css';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState('');
  const [filtro, setFiltro] = useState('todas');

  useEffect(() => {
    const salvas = JSON.parse(localStorage.getItem('tarefas')) || [];
    setTarefas(salvas);
  }, []);

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  const adicionarTarefa = () => {
    if (!texto.trim()) return;
    const nova = {
      texto,
      concluida: false,
      data: new Date().toLocaleString(),
    };
    setTarefas([...tarefas, nova]);
    setTexto('');
  };

  const alternarTarefa = index => {
    const copia = [...tarefas];
    copia[index].concluida = !copia[index].concluida;
    setTarefas(copia);
  };

  const removerTudo = () => {
    setTarefas([]);
    localStorage.removeItem('tarefas');
  };

  const tarefasFiltradas = tarefas.filter(t => {
    if (filtro === 'pendentes') return !t.concluida;
    if (filtro === 'concluidas') return t.concluida;
    return true;
  });

  const [temaEscuro, setTemaEscuro] = useState(() => {
  return localStorage.getItem('tema') === 'escuro';
});

useEffect(() => {
  document.body.className = temaEscuro ? 'dark' : '';
  localStorage.setItem('tema', temaEscuro ? 'escuro' : 'claro');
}, [temaEscuro]);

const alternarTema = () => {
  setTemaEscuro(!temaEscuro);
};

  return (
    <div className="container">
      <button onClick={alternarTema} style={{ float: 'right' }}>
          {temaEscuro ? '☀️ Modo claro' : '🌙 Modo escuro'}
      </button>
      <h1>Minha To-Do List</h1>
      <div className="input-group">
        <input
          type="text"
          value={texto}
          onChange={e => setTexto(e.target.value)}
          placeholder="Digite uma tarefa"
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
        <button onClick={removerTudo}>Remover Tudo</button>
      </div>

      <div className="filtro">
        <label>Filtro:</label>
        <select value={filtro} onChange={e => setFiltro(e.target.value)}>
          <option value="todas">Todas</option>
          <option value="pendentes">Pendentes</option>
          <option value="concluidas">Concluídas</option>
        </select>
      </div>

      <ul>
        {tarefasFiltradas.map((tarefa, i) => (
          <TodoItem key={i} tarefa={tarefa} onClick={() => alternarTarefa(i)} />
        ))}
      </ul>
    </div>
  );
}

export default App;
