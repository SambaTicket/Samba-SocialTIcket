# Samba Social Ticket

Uma plataforma descentralizada para eventos e ingressos sociais construída na
 blockchain Sui, oferecendo posse real de ativos digitais e novas formas de interação.

## 🏗️ Arquitetura do Projeto
Este projeto utiliza uma arquitetura modular com três componentes principais:

* **Contratos Inteligentes (contracts/)** - O núcleo do protocolo, escrito em Sui Move.
* **Cliente Web (client/)** - A interface do usuário, construída com Next.js e React.
* **SDK TypeScript (sdk/)** - Uma biblioteca para facilitar a interação entre o cliente e os contratos.

## 📁 Estrutura do Projeto
```
samba-social-ticket/
├── contracts/          # Smart contracts Sui Move
│   ├── sources/
│   │   ├── event/      # Módulo para criação e gerenciamento de eventos
│   │   ├── ticket/     # Módulo para a lógica de ingressos (NFTs)
│   │   └── user_profile/ # Módulo para perfis de usuário
└── README.md
```
## 🚀 Funcionalidades

### 🎟️ Sistema de Eventos e Ingressos
* Criação de eventos de forma descentralizada e imutável.
* Emissão (mint) de ingressos como NFTs, garantindo posse real ao usuário.
* Gerenciamento de suprimento e regras diretamente no contrato.

### 👥 Funcionalidades Sociais
* Criação de perfis públicos para usuários e organizadores.
* Associação de eventos criados e ingressos possuídos ao perfil do usuário.
* (Futuro) Sistema de reputação baseado na participação e organização de eventos.

## 🛠️ Tecnologias Utilizadas
* **Blockchain**: Sui Network
* **Smart Contracts**: Sui Move
* **Frontend**: Next.js 14, React 18, TypeScript
* **Styling**: Tailwind CSS
* **Gerenciamento de Estado**: Tanstack Query
* **Integração com Blockchain**: @mysten/dapp-kit, @mysten/sui.js
* **Desenvolvimento**: TypeScript, ESLint, Prettier