# 🎫 Samba Social Ticket - Sistema de Badges e Perfis

Um sistema completo de badges **Soulbound** (intransferíveis) e perfis de usuário na blockchain Sui. Ideal para eventos, hackathons, conferências e comunidades.

## 🌟 Características Principais

### 🎖️ Sistema de Badges Soulbound
- **Intransferíveis para sempre**: Badges ficam permanentemente ligados ao usuário
- **Templates reutilizáveis**: Crie um molde e distribua para múltiplos usuários
- **Controle de supply**: Limite quantos badges podem ser criados
- **Timestamp automático**: Registra quando cada badge foi conquistado
- **Organização via Kiosk**: Badges ficam organizados na "mochila" do usuário

### 👤 Sistema de Perfis
- **Perfis NFT únicos**: Cada usuário tem seu perfil único na blockchain
- **Metadados completos**: Nome, foto, bio e links sociais
- **Kiosk integrado**: Perfil vem com sistema de organização de ativos

## 🚀 Quick Start

### 1. 📦 Publicar o Contrato

```bash
cd samba_social_ticket
sui client publish
```

Anote o `PACKAGE_ID` que será exibido no output.

### 2. 🎖️ Criar Template de Badge

```bash
sui client call \
  --package SEU_PACKAGE_ID \
  --module badge \
  --function create_badge_template \
  --args "Badge do Hackathon" "https://imgur.com/logo.png" "Badge para finalistas" 100 "0x123...abc" \
  --gas-budget 10000000
```

**Parâmetros:**
- `name`: Nome do badge
- `image`: URL da imagem do badge
- `description`: Descrição do badge
- `total_supply`: Número máximo de badges (ex: 100)
- `event_id`: ID do evento (pode ser qualquer ID objeto válido)

Anote o `TEMPLATE_ID` do badge criado.

### 3. 👤 Criar Perfil de Usuário

```bash
sui client call \
  --package SEU_PACKAGE_ID \
  --module user_profile \
  --function mint_profile \
  --args "Seu Nome" "https://sua-foto.jpg" "Sua bio incrível" "[]" \
  --gas-budget 100000000
```

**Parâmetros:**
- `name`: Nome do usuário
- `pfp`: URL da foto de perfil
- `bio`: Biografia do usuário
- `links`: Array de links sociais (ex: `["https://twitter.com/user", "https://github.com/user"]`)

Anote o `KIOSK_ID` criado para o usuário.

### 4. 🏆 Conceder Badge ao Usuário

```bash
sui client call \
  --package SEU_PACKAGE_ID \
  --module badge \
  --function award_badge_to_user \
  --args TEMPLATE_ID USER_KIOSK_ID KIOSK_OWNER_CAP ENDERECO_DO_USUARIO CLOCK_OBJECT \
  --gas-budget 50000000
```

**Parâmetros:**
- `TEMPLATE_ID`: ID do template de badge criado no passo 2
- `USER_KIOSK_ID`: ID do Kiosk do usuário
- `KIOSK_OWNER_CAP`: Capability de dono do Kiosk
- `ENDERECO_DO_USUARIO`: Endereço da carteira do usuário
- `CLOCK_OBJECT`: Objeto Clock da Sui (geralmente `0x6`)

## 📋 Comandos de Consulta

### Verificar Informações do Badge Template

```bash
sui client call \
  --package SEU_PACKAGE_ID \
  --module badge \
  --function get_badge_info \
  --args TEMPLATE_ID
```

### Verificar Badges Disponíveis

```bash
sui client call \
  --package SEU_PACKAGE_ID \
  --module badge \
  --function badges_available \
  --args TEMPLATE_ID
```

### Verificar se é Criador do Badge

```bash
sui client call \
  --package SEU_PACKAGE_ID \
  --module badge \
  --function is_creator \
  --args TEMPLATE_ID SEU_ENDERECO
```

## 🏗️ Arquitetura do Sistema

### 📊 Estruturas Principais

#### Badge (Template)
```move
public struct Badge has key, store {
    id: UID,
    name: String,           // Nome do badge
    image: String,          // URL da imagem
    description: String,    // Descrição
    total_supply: u64,      // Supply máximo
    minted_supply: u64,     // Quantos já foram criados
    event_id: ID,           // ID do evento relacionado
    creator: address,       // Criador do template
}
```

#### BadgeNFT (Instância)
```move
public struct BadgeNFT has key, store {
    id: UID,
    template_id: ID,        // Referência ao template
    name: String,           // Nome do badge
    image_url: String,      // URL da imagem
    recipient: address,     // Dono do badge
    awarded_at: u64,        // Timestamp da conquista
}
```

#### UserProfileNFT
```move
public struct UserProfileNFT has key, store {
    id: UID,
    name: String,           // Nome do usuário
    pfp: String,            // Foto de perfil
    bio: String,            // Biografia
    links: vector<String>,  // Links sociais
}
```

## 🔒 Características Soulbound

Os badges são **verdadeiramente Soulbound**:

1. **Intransferíveis**: Uma vez concedidos, não podem ser transferidos ou vendidos
2. **Únicos**: Cada badge é uma conquista pessoal do usuário
3. **Permanentes**: Ficam para sempre na blockchain como prova de conquista
4. **Organizados**: Automaticamente organizados no Kiosk do usuário

## 🎯 Casos de Uso

### 🏆 Eventos e Hackathons
- Badges para participantes, finalistas, vencedores
- Certificados de participação em workshops
- Reconhecimento de contribuições especiais

### 🎓 Educação
- Certificados de conclusão de cursos
- Badges de habilidades adquiridas
- Reconhecimento de mentores

### 🌐 Comunidades
- Badges de membros fundadores
- Reconhecimento de contribuições
- Níveis de engajamento

### 🏢 Corporativo
- Certificações profissionais
- Reconhecimento de conquistas
- Programas de incentivo

## 🛠️ Desenvolvimento

### Estrutura do Projeto
```
sources/
├── badge/
│   └── badge.move              # Sistema de badges
├── user-profile/
│   ├── user_profile.move       # Gerenciador de perfis
│   └── user_profile_nft.move   # NFT do perfil
└── samba_social_ticket.move    # Módulo principal
```

### Testando Localmente

```bash
# Compilar
sui move build

# Executar testes
sui move test

# Verificar sintaxe
sui move check
```

## 🔧 API Completa

### Módulo Badge

#### Funções Principais
- `create_badge_template()`: Cria um novo template de badge
- `award_badge_to_user()`: Concede badge a um usuário

#### Funções de Consulta
- `get_badge_info()`: Informações do template
- `get_badge_nft_info()`: Informações do badge individual
- `badges_available()`: Badges restantes no template
- `is_creator()`: Verifica se é criador do template

### Módulo User Profile

#### Funções Principais
- `mint_profile()`: Cria perfil de usuário com Kiosk

#### Funções do UserProfileNFT
- `update_name()`: Atualiza nome
- `update_pfp()`: Atualiza foto
- `update_bio()`: Atualiza biografia
- `add_link()`: Adiciona link social
- `remove_link()`: Remove link social

## 🚨 Considerações Importantes

### ⛽ Gas Budgets Recomendados
- Publicação do contrato: `100000000`
- Criar template de badge: `10000000`
- Criar perfil: `100000000`
- Conceder badge: `50000000`
- Consultas: `1000000`

### 🔑 Objetos Necessários
- **Clock Object**: Geralmente `0x6` na mainnet/testnet
- **Event ID**: Pode ser qualquer objeto ID válido
- **Kiosk**: Criado automaticamente no mint do perfil

### ⚠️ Limitações
- Badges são permanentemente intransferíveis
- Supply de badges não pode ser alterado após criação
- Perfis são únicos por transação

## 🤝 Contribuindo

1. Fork o repositório
2. Crie uma branch para sua feature
3. Faça commit das mudanças
4. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🆘 Suporte

Para dúvidas e suporte:
- Abra uma issue no GitHub
- Entre em contato com a equipe Samba Social Ticket

---

**🎉 Feito com ❤️ por nós da SambaTicket!**
