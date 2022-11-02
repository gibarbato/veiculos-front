import { useEffect, useState } from 'react';
import './App.css';
import api from './server/api';

function App() {
  const [novaPlaca, setNovaPlaca] = useState();
  const [novaMarca, setNovaMarca] = useState();
  const [novoModelo, setNovoModelo] = useState();
  const [novoAno, setNovoAno] = useState();
  const [veiculos, setVeiculos] = useState([{
    "placa": "qwe1234",
    "marca": "chery",
    "modelo": "celer",
    "ano": 2015
  },
  {
    "placa": "asd1234",
    "marca": "palio",
    "modelo": "uno",
    "ano": 2000
  },
  ])

  function carregarVeiculos() {
    api.get('/veiculos')
      .then((response) => {
        setVeiculos(response.data);
      })
  }

  function cadastrarVeiculo() {
    api.post('/veiculos', {
      placa: novaPlaca,
      marca : novaMarca,
      modelo: novoModelo,
      ano: novoAno,
    })
    .then((response)=>{
      setVeiculos(response.data);
    })
  }

  useEffect(() => {
    carregarVeiculos();
  }, [])


  return (
    <>
      <div>
        <div>
          <input value={novaPlaca} onChange={(e) => { setNovaPlaca(e.target.value) }} placeholder='Placa do Veículo'></input>
        </div>
        <div>
          <input value={novaMarca} onChange={(e) => { setNovaMarca(e.target.value) }} placeholder='Marca do Veículo'></input>
        </div>
        <div>
          <input value={novoModelo} onChange={(e) => { setNovoModelo(e.target.value) }} placeholder='Modelo do Veículo'></input>
        </div>
        <div>
          <input value={novoAno} onChange={(e) => { setNovoAno(e.target.value) }} placeholder='Ano do Veículo'></input>
        </div>
        <button onClick={cadastrarVeiculo}>Cadastrar Veículos</button>
      </div>

      <table>
        <tr>
          <th>Placa</th><th>Marca</th><th>Modelo</th><th>Ano</th>
        </tr>
        {
          veiculos.map((veiculo) => {
            return (
              <tr>
                <td>{veiculo.placa}</td><td>{veiculo.marca}</td><td>{veiculo.modelo}</td><td>{veiculo.ano}</td>
              </tr>
            )
          })
        }
      </table>
    </>
  );
}

export default App;
