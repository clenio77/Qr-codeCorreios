import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './App.css';

function App() {
  const [address, setAddress] = useState({
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  });
  
  const [showQR, setShowQR] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cep') {
      // Formatar CEP
      let formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 5) {
        formattedValue = formattedValue.substring(0, 5) + '-' + formattedValue.substring(5, 8);
      }
      setAddress({ ...address, [name]: formattedValue });
    } else {
      setAddress({ ...address, [name]: value });
    }
  };
  
  const searchCEP = async () => {
    const cep = address.cep.replace(/\D/g, '');
    
    if (cep.length !== 8) {
      setError('CEP deve conter 8 dígitos');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        setError('CEP não encontrado');
      } else {
        setAddress({
          ...address,
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf
        });
      }
    } catch (err) {
      setError('Erro ao buscar CEP');
    } finally {
      setLoading(false);
    }
  };
  
  const generateQR = () => {
    if (!address.cep || !address.street || !address.number || !address.city || !address.state) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }
    
    setError('');
    setShowQR(true);
  };
  
  const formatAddress = () => {
    return `${address.street}, ${address.number}
${address.complement ? address.complement + '\n' : ''}${address.neighborhood}
${address.city} - ${address.state}
CEP: ${address.cep}`;
  };
  
  return (
    <div className="app-container">
      <header>
        <h1>Endereçador QR Code</h1>
      </header>
      
      <main>
        <div className="card">
          <h2>Dados do Destinatário</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="cep">CEP*</label>
            <div className="cep-input-group">
              <input
                type="text"
                id="cep"
                name="cep"
                value={address.cep}
                onChange={handleChange}
                maxLength="9"
                placeholder="00000-000"
              />
              <button 
                onClick={searchCEP} 
                disabled={loading}
                className="search-button"
              >
                {loading ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="street">Logradouro*</label>
            <input
              type="text"
              id="street"
              name="street"
              value={address.street}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="number">Número*</label>
              <input
                type="text"
                id="number"
                name="number"
                value={address.number}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="complement">Complemento</label>
              <input
                type="text"
                id="complement"
                name="complement"
                value={address.complement}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="neighborhood">Bairro</label>
            <input
              type="text"
              id="neighborhood"
              name="neighborhood"
              value={address.neighborhood}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-row">
            <div className="form-group city-group">
              <label htmlFor="city">Cidade*</label>
              <input
                type="text"
                id="city"
                name="city"
                value={address.city}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group state-group">
              <label htmlFor="state">Estado*</label>
              <input
                type="text"
                id="state"
                name="state"
                value={address.state}
                onChange={handleChange}
                maxLength="2"
              />
            </div>
          </div>
          
          <button 
            onClick={generateQR} 
            className="generate-button"
          >
            Gerar QR Code
          </button>
        </div>
        
        {showQR && (
          <div className="card qr-card">
            <h2>QR Code Gerado</h2>
            <div className="qr-container">
              <QRCodeCanvas 
                value={JSON.stringify(address)} 
                size={200}
                level="H"
              />
            </div>
            <div className="address-display">
              <h3>Endereço Formatado:</h3>
              <p>{formatAddress()}</p>
            </div>
          </div>
        )}
      </main>
      
      <footer>
        <p>© 2023 Endereçador QR Code - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default App;