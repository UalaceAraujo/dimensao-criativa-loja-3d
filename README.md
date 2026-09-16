# Dimensão Criativa - Plataforma Web para Manufatura Aditiva

Website institucional e catálogo digital desenvolvido para apresentação comercial de serviços de manufatura aditiva e prototipagem em impressão 3D. O projeto adota uma arquitetura estritamente *Vanilla Web* (HTML5, CSS3 e JavaScript puro), focando em alta performance de carregamento, responsividade e integração direta com canais de conversão comercial.

## Visão Geral do Projeto

A solução foi estruturada para atuar como uma interface comercial ágil, conectando a vitrine de produtos ao atendimento direto ao cliente via API do WhatsApp (`wa.me`). O fluxo de contato conta com validação de dados em tempo real, roteamento por categoria de demanda e pré-visualização interativa da mensagem, reduzindo atritos na captação de leads.

## Funcionalidades Técnicas

- **Catálogo Dinâmico de Produtos:** Exibição contínua em carrossel horizontal de peças técnicas e decorativas (protótipos, gabaritos, peças industriais e personalizadas).
- **Módulo de Atendimento e Conversão (`whatsapp.html`):**
  - Segmentação estruturada por departamento (Orçamentos, Projetos Sob Demanda, Status de Pedido e Suporte Técnico).
  - Montagem e parsing dinâmico do texto da mensagem a partir dos inputs do usuário.
  - Simulador de interface de chat com renderização em tempo real da carga de dados antes do envio.
  - Integração via URL schemes para disparo parametrizado ao WhatsApp Web/App.
- **Componentes de Engajamento:** Notificações contextuais não intrusivas com validação de credibilidade institucional (selos de garantia e entrega).
- **Design System Customizado:** Padronização visual baseada em CSS Custom Properties (variáveis nativas), garantindo escalabilidade de estilos e suporte a layouts fluidos via Flexbox e CSS Grid.

## Tecnologias Utilizadas

- **HTML5:** Semântica estrita para SEO e acessibilidade.
- **CSS3:** Flexbox, Grid Layout, animações de transição de estado e variáveis de estilo.
- **JavaScript (ES6+):** Manipulação nativa de DOM, tratamento de eventos e integração de queries para API externa sem dependências de frameworks.
- **Tipografia:** Google Fonts (`Montserrat`, `Orbitron`).

## Estrutura do Diretório

```text
dimensao-criativa/
├── index.html          # Landing page principal e catálogo institucional
├── whatsapp.html       # Módulo transacional de captação de atendimento
└── assets/
    ├── css/
    │   └── style.css   # Folha de estilos unificada com CSS Variables
    ├── js/
    │   └── script.js   # Lógica client-side e integração de mensagens
    └── images/         # Vetores, logomarca e assets estáticos
