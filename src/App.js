import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    // DONE
    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: 'github.com',
      techs: ['React', 'Node']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // DONE
    await api.delete(`repositories/${id}`);

    const newRepositories = [...repositories];
    const repositoryIndex = repositories.findIndex(repo => repo.id === id); 

    newRepositories.splice(repositoryIndex, 1);
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
