# Endereçador QR Code

Aplicativo para geração de QR codes para endereçamento postal, desenvolvido como Progressive Web App (PWA) para máxima acessibilidade e usabilidade.

![QR Code](https://img.shields.io/badge/QR%20Code-Endere%C3%A7amento-blue)
![PWA](https://img.shields.io/badge/PWA-Ready-brightgreen)
![Licença](https://img.shields.io/badge/Licen%C3%A7a-MIT-green)

## Funcionalidades

- Validação de CEP via API ViaCEP
- Preenchimento automático de endereço
- Geração de QR code com dados do endereço
- Interface responsiva e intuitiva
- Funciona offline após primeiro carregamento
- Instalável como aplicativo nativo (PWA)
- Design moderno com animações e transições suaves
- Compartilhamento fácil de endereços via QR code
- Armazenamento de endereços recentes

## Como executar

1. Instale as dependências:
```
npm install
```

2. Execute o projeto:
```
npm start
```

3. Acesse o aplicativo em [http://localhost:3000](http://localhost:3000)

## Como usar

1. Digite o CEP e clique em "Buscar" para validar e preencher automaticamente os campos de endereço
2. Complete os campos restantes (número, complemento, etc.)
3. Clique em "Gerar QR Code" para criar o código QR com os dados do endereço
4. O QR code gerado pode ser escaneado para obter os dados do endereço
5. Opcionalmente, salve ou compartilhe o QR code gerado

## Tecnologias utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces
- **PWA (Progressive Web App)**: Tecnologia que permite experiência similar a aplicativos nativos
- **Service Workers**: Para funcionalidade offline e cache de recursos
- **API ViaCEP**: Validação e busca automática de endereços por CEP
- **qrcode.react**: Biblioteca para geração de QR codes
- **CSS3 Avançado**: Animações, transições e layout responsivo
- **LocalStorage**: Armazenamento local de dados recentes
- **Vercel**: Plataforma de hospedagem e deploy

## Benefícios

### Para Usuários
- **Acesso Universal**: Funciona em qualquer dispositivo com navegador web
- **Sem Instalação Obrigatória**: Uso imediato sem necessidade de download de app
- **Experiência Offline**: Continua funcionando mesmo sem conexão à internet
- **Economia de Dados**: Baixo consumo de dados móveis
- **Atualizações Automáticas**: Sempre com a versão mais recente
- **Instalação Opcional**: Pode ser adicionado à tela inicial como app nativo

### Para Empresas e Correios
- **Redução de Erros**: Minimiza erros de endereçamento com validação automática
- **Economia de Tempo**: Preenchimento rápido e preciso de endereços
- **Padronização**: Formato consistente de endereços
- **Rastreabilidade**: Facilita a identificação e rastreamento de encomendas
- **Modernização**: Adoção de tecnologias digitais no processo postal
- **Custo-Benefício**: Desenvolvimento e manutenção mais econômicos que apps nativos

## Requisitos do Sistema

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexão à internet para primeiro acesso e busca de CEPs
- Para funcionalidades de câmera (leitura de QR codes): permissão de acesso à câmera

## Instalação como PWA

1. Acesse o aplicativo pelo navegador
2. No Chrome/Edge: Clique nos três pontos do menu > "Instalar aplicativo"
3. No Safari (iOS): Toque no ícone de compartilhamento > "Adicionar à Tela de Início"

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

## Contato

Para sugestões, dúvidas ou suporte, entre em contato através das issues do GitHub ou pelo email: [clenioti@gmail.com]
