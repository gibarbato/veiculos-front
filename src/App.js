import { useEffect, useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from './server/api';

function App() {

  const [inCadastro, setInCadastro] = useState('');
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
      marca: novaMarca,
      modelo: novoModelo,
      ano: novoAno,
    })
      .then((response) => {
        setVeiculos(response.data);
        limparForm();
      })
  }

  function limparForm() {
    setNovaPlaca('');
    setNovaMarca('');
    setNovoModelo('');
    setNovoAno('');
  }

  useEffect(() => {
    carregarVeiculos();
  }, [])


  return (
    <>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <h1>LOJA DE VEÍCULOS</h1>
          </Col>
        </Row>
        </Container>
{/*         <Container>
        <Row>
          <Col xs={12} md={8}>
            <div className="containerNovo">
              <Button className="containerNovo" onClick={() => { setInCadastro(1) }} href="#/action-1">Cadastrar</Button>
              <Button className="containerNovo" onClick={() => { setInCadastro(2) }} href="#/action-2">Pesquisar</Button>
              <Button className="containerNovo" onClick={() => { setInCadastro(3) }} href="#/action-3">Tela em branco</Button>
            </div>
          </Col>
        </Row>
        <br></br>
        </Container> */}
        
        <Container>
        <Row>
          <Col xs={6} md={4}>
            <FloatingLabel
              controlId="floatingInput" label="Placa do Veículo" className="mb-3">
              <Form.Control type="text" placeholder="Placa do Veículo" value={novaPlaca} onChange={(e) => { setNovaPlaca(e.target.value) }} />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput" label="Marca do Veículo" className="mb-3">
              <Form.Control type="text" placeholder="Marca do Veículo" value={novaMarca} onChange={(e) => { setNovaMarca(e.target.value) }} />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput" label="Modelo do Veículo" className="mb-3">
              <Form.Control type="text" placeholder="Modelo do Veículo" value={novoModelo} onChange={(e) => { setNovoModelo(e.target.value) }} />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput" label="Ano do Veículo" className="mb-3">
              <Form.Control type="text" placeholder="Ano do Veículo" value={novoAno} onChange={(e) => { setNovoAno(e.target.value) }} />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={8}>
            <Button onClick={cadastrarVeiculo}>Cadastrar Veículos</Button>
          </Col>
        </Row>
      </Container>
      <br></br>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Placa</th><th>Marca</th><th>Modelo</th><th>Ano</th><th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {
                  veiculos.map((veiculo) => {
                    return (
                      <tr>
                        <td>{veiculo.placa}</td><td>{veiculo.marca}</td><td>{veiculo.modelo}</td><td>{veiculo.ano}</td><td><a>deletar</a></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </Col>
        </Row>

      </Container>
    </>
  );
}

export default App;
