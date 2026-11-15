# Água Segura

Plataforma educativa sobre **água potável, qualidade da água, higiene, saneamento básico e prevenção de doenças**, relacionada ao **ODS 6 da ONU** (Água potável e saneamento). MVP de projeto acadêmico.

> Finalidade exclusivamente educativa. O site não realiza análises laboratoriais, não certifica a potabilidade da água e não substitui orientações de órgãos de saúde ou de profissionais especializados.

## Tecnologias
HTML5, CSS3 e JavaScript puro. Sem frameworks, sem servidor, sem banco de dados e sem dependências externas (nenhuma fonte, biblioteca ou imagem é carregada da internet). Os únicos links externos são as fontes de consulta, que abrem em nova aba.

## Como executar localmente
1. Baixe/copie a pasta `agua-segura/` completa.
2. Dê dois cliques em `index.html` (ou arraste o arquivo para o navegador).

Nenhuma instalação é necessária. O site não foi publicado e não há configuração de hospedagem.

## Estrutura
```
agua-segura/
├── index.html
├── pages/
│   ├── agua-potavel.html   ├── tratamento.html     ├── armazenamento.html
│   ├── saude.html          ├── saneamento.html     ├── economia.html
│   ├── quiz.html           └── sobre.html
├── css/
│   ├── style.css           (identidade visual, componentes, tema claro/escuro)
│   └── responsive.css      (menu móvel, tablet e celular)
├── js/
│   ├── main.js             (tema, menu, rolagem, voltar ao topo, animações, avisos)
│   ├── interactions.js     (mitos e verdades, checklists)
│   └── quiz.js             (quiz de 15 perguntas)
└── assets/images/
    ├── logo.svg            (logotipo criado para o projeto)
    └── hero.svg            (ilustração animada: torneira, gota e copo)
```

## Funcionalidades implementadas
- 9 páginas completas, com cabeçalho e rodapé padronizados e navegação entre todas elas.
- Menu responsivo que vira botão expansível no celular/tablet (fecha com Esc ou ao escolher um link) e destaque da página atual.
- Botão "Quiz" em destaque no menu; alternância de tema claro/escuro (preferência guardada no navegador).
- Página inicial com hero, cards, seção ODS 6, dicas rápidas e chamada para o quiz.
- Mitos e verdades interativos (água potável).
- Linha do tempo com as 7 etapas do tratamento da água.
- Checklist de armazenamento (5 itens) com orientação conforme as marcações e aviso de que não certifica a água.
- Seis cards de doenças (o que é, transmissão, sintomas, prevenção) e aviso médico.
- Quatro componentes do saneamento, consequências da falta de saneamento e papel da população e do poder público.
- Desafio da economia de água (7 atitudes) com mensagem de incentivo; sem números de economia inventados.
- Quiz com 15 perguntas, uma por vez, 4 alternativas, correção com explicação, barra de progresso, acertos, erros, percentual, classificação, refazer e voltar ao início. Não revela a resposta antes da seleção.
- Rolagem suave, botão voltar ao topo, animações discretas de entrada (desativadas com "reduzir movimento"), avisos de feedback e tratamento básico de erros em JavaScript.
- Acessibilidade: HTML semântico, link "Pular para o conteúdo", foco visível, rótulos e `aria-*` nos controles, textos alternativos, navegação por teclado e contraste revisado.

## Testes realizados
- Verificação automática de todas as 9 páginas: tags balanceadas, `id`s únicos, um único `h1` por página, sem saltos de nível de título, imagens com `alt`, todos os links internos e âncoras existentes.
- Quiz (simulação em jsdom): 15 perguntas e gabarito conferido com o enunciado, aviso sem alternativa marcada, resposta não revelada antes de responder, partida perfeita (15/15, 100%, "Excelente"), partida toda errada (0/15, faixa 0 a 5), refazer e limites das quatro faixas de pontuação.
- Checklists de armazenamento e economia, mitos e verdades, menu móvel e troca de tema (jsdom).
- Navegador real (Chromium): sem erros de console e sem rolagem horizontal em 390 px e 1366 px; conferência visual do cabeçalho, hero, linha do tempo, menu móvel, quiz e checklist.

## Limitações
- Não foi testado em Safari, Firefox, Edge ou em aparelhos físicos. As fontes usam a pilha de fontes do sistema, então a aparência varia um pouco entre dispositivos.
- Ícones são emojis, cuja aparência depende do sistema operacional.
- Os checklists e o quiz não salvam resultados (por design, sem servidor nem banco de dados); apenas a preferência de tema usa o armazenamento do navegador.
- O conteúdo é educativo e resumido. Prazos e recomendações (por exemplo, a periodicidade de limpeza da caixa-d'água, a vacinação e normas locais) devem ser confirmados com a prestadora do serviço, a vigilância sanitária ou o Ministério da Saúde.

## Fontes de consulta
- OMS: https://www.who.int/
- OPAS: https://www.paho.org/pt
- Ministério da Saúde: https://www.gov.br/saude/pt-br
- ANA: https://www.gov.br/ana/pt-br
- ONU Brasil, ODS 6: https://brasil.un.org/pt-br/sdgs/6

## Créditos de recursos
Todas as ilustrações (`logo.svg`, `hero.svg`) foram criadas para o projeto em SVG. Nenhuma imagem, fonte ou biblioteca externa foi utilizada.
