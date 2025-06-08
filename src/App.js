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
    return `Logradouro: ${address.street}
Número: ${address.number}
${address.complement ? `Complemento: ${address.complement}\n` : ''}Bairro: ${address.neighborhood}
Cidade: ${address.city}
Estado: ${address.state}
CEP: ${address.cep}`;
  };
  
  // Renderizar partículas de fundo
  const renderParticles = () => {
    const particles = [];
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 10 + 5;
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 0.2)`,
        animationDuration: `${Math.random() * 10 + 5}s`,
        animationDelay: `${Math.random() * 5}s`
      };
      particles.push(<div key={i} className="particle" style={style}></div>);
    }
    return particles;
  };
  
  return (
    <div className="app-container">
      <div className="particles">
        {renderParticles()}
      </div>
      
      <header>
        <h1>Gerador de QR Code para Endereços</h1>
        <p className="subtitle">Crie QR Codes para facilitar o endereçamento de correspondências</p>
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
                value={formatAddress()} 
                size={200}
                level="H"
                bgColor="#FFFFFF"
                fgColor="#000000"
                includeMargin={true}
              />
            </div>
            <div className="address-display">
              <h3>Endereço Formatado:</h3>
              <div className="formatted-address">
                <p><strong>Logradouro:</strong> {address.street}</p>
                <p><strong>Número:</strong> {address.number}</p>
                {address.complement && <p><strong>Complemento:</strong> {address.complement}</p>}
                <p><strong>Bairro:</strong> {address.neighborhood}</p>
                <p><strong>Cidade:</strong> {address.city}</p>
                <p><strong>Estado:</strong> {address.state}</p>
                <p><strong>CEP:</strong> {address.cep}</p>
              </div>
              <button 
                onClick={() => window.print()} 
                className="print-button"
              >
                Imprimir QR Code
              </button>
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
