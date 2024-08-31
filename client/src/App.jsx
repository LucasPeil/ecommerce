import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import axios from 'axios';
function App() {
  const [count, setCount] = useState(0);
  const id = '300';
  const query = `query getProduct($id: String!) {
    getProduct(id: $id) {
      id
      image
      descricao
      preco
      disponibilidade
      qtdDisponibilidade
    }
  
  }`;
  const url = new URL('http://localhost:4000/teste');
  url.searchParams.append('query', query);
  url.searchParams.append('variables', JSON.stringify({ id: id }));

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={async () => {
            const response = await axios.get(
              `/teste?query=${query}&variables=${JSON.stringify({ id: id })}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            console.log(response.data);
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
