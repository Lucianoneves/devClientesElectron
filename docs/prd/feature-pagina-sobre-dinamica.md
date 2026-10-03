# PRD — Página Sobre dinâmica

> Tipo: PRD de feature · Data: 2026-10-02
> **Status:** Aguardando implementação
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". Atualize para "Implementada" quando todas as specs estiverem concluídas. -->

## 1. Visão geral

A página Sobre deixa de ser um texto fixo. Quem abre essa tela vê a identidade do projeto (título, autor e curso) vinda de uma origem única e, ao mesmo tempo, dados reais do aplicativo naquele momento: versão, sistema operacional e quantidade de clientes cadastrados.

## 2. Problema que resolve

Hoje a página Sobre repete frases escritas direto na tela. A versão só aparece depois de uma busca e o restante não muda quando o app ou a base de clientes muda. Quem usa não consegue saber, nessa tela, em qual sistema está nem quantos clientes existem.

## 3. Público-alvo

Pessoa que usa o aplicativo de clientes neste computador e abre a página Sobre para conferir o que é o projeto e o estado atual do app.

## 4. Objetivo do recorte atual

Tornar a página Sobre dinâmica neste recorte: textos de identidade vindos de uma origem única e um bloco de dados ao vivo (versão, sistema operacional e quantidade de clientes), com estado vazio e falha tratados.

## 5. Funcionalidades

**Essenciais:**

- Exibir título, autor e curso a partir de uma origem única, sem escrevê-los direto na tela.
- Exibir a versão atual do aplicativo.
- Exibir o sistema operacional em que o app está rodando, em nome legível (Windows, macOS ou Linux).
- Exibir a quantidade de clientes cadastrados, a mesma base já usada na lista de clientes.
- Mostrar 0 quando não houver clientes.
- Manter os textos de identidade visíveis se os dados ao vivo falharem, com um aviso claro.

**Desejáveis:**

- Não se aplica neste recorte. O pedido confirmado já cabe nas essenciais.

## 6. Fora do escopo

- Editar título, autor ou curso dentro do aplicativo.
- Cadastro, edição, listagem, detalhe e exclusão de clientes, além do que já existe.
- Login, múltiplos usuários ou sincronização na nuvem.
- Mudar o visual das outras páginas.
- Histórico de versões, changelog ou atualização automática do app.
- Tradução da página para outros idiomas.

## 7. Regras de negócio

- Regra 1: título, autor e curso são somente leitura para quem usa o app. Só quem desenvolve altera esses textos, e a alteração vale para a página inteira a partir da mesma origem.
- Regra 2: os textos iniciais confirmados são: título **Sobre**; autor **Luciano**; curso descrito como **o curso em que o projeto foi criado**.
- Regra 3: a quantidade de clientes é a quantidade atual de clientes já cadastrados no app. Não é um número ilustrativo.
- Regra 4: zero clientes é um estado válido e deve aparecer como 0, não como tela vazia nem como erro.
- Regra 5: falha ao obter versão ou quantidade não apaga título, autor e curso. A página avisa que os dados ao vivo não carregaram.
- Regra 6: o sistema operacional exibido é o da máquina que está executando o app, não um valor fixo.

## 8. Fluxos principais

### Fluxo 1 — Abrir a página Sobre com dados disponíveis

1. A pessoa abre a página Sobre pelo menu do app.
2. A página mostra o título Sobre, o autor Luciano e a frase do curso.
3. A página mostra a versão do aplicativo, o sistema operacional e a quantidade de clientes.
4. A pessoa lê as informações e pode voltar às outras áreas do app pelo menu já existente.

### Fluxo 2 — Não há clientes cadastrados

1. A pessoa abre a página Sobre.
2. Os textos de identidade aparecem normalmente.
3. A quantidade de clientes aparece como 0.

### Fluxo 3 — Os dados ao vivo não carregam

1. A pessoa abre a página Sobre.
2. Título, autor e curso continuam visíveis.
3. A página informa que a versão, o sistema ou a quantidade de clientes não puderam ser carregados.
4. A pessoa não vê um número inventado no lugar da falha.

## 9. Critérios de aceite

- O usuário consegue ver título, autor e curso na página Sobre sem que esses textos estejam escritos direto na tela.
- O usuário consegue ver a versão real do aplicativo, o sistema operacional e a quantidade atual de clientes.
- O sistema deve mostrar 0 quando não existir cliente cadastrado.
- O sistema não deve esconder título, autor e curso quando a busca dos dados ao vivo falhar.
- Quando a busca dos dados ao vivo falha, o sistema deve avisar que esses dados não carregaram.
- O usuário que só usa o app não consegue alterar título, autor ou curso por essa página.

## 10. Stack

Aplicativo desktop já existente: Electron, React, TypeScript e Tailwind. A página já usa busca de dados no cliente. Os clientes já ficam num banco local. A versão do aplicativo já é obtida do processo principal. Nenhuma tecnologia nova é necessária para este recorte.

## 11. Justificativa da stack

A página Sobre, a versão do app e a lista de clientes já existem nessa stack. Reutilizar isso evita um segundo lugar para contar clientes ou para ler a versão. O recorte só muda o que a página mostra e de onde vêm os textos.

## 12. Fases de construção

### Fase 1 — Identidade e dados ao vivo da página Sobre

Objetivo: a página Sobre passa a mostrar textos de uma origem única e dados reais do app, inclusive quando não há clientes ou quando a busca falha.
Specs:

- Spec 01 — Textos de identidade numa origem única
- Spec 02 — Dados ao vivo na página Sobre

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec (mais as dependências) para montar o plano técnico e implementar. Preencha todos os campos; se um não se aplica, escreva "Não se aplica" e o porquê.

### Spec 01 — Textos de identidade numa origem única

- **Fase:** Fase 1
- **Objetivo (o quê):** A página Sobre exibe título, autor e curso lidos de uma única origem, em vez de frases soltas escritas na tela.
- **Intenção (por quê):** Quem mantém o projeto precisa mudar a identidade num lugar só, e quem usa o app precisa ver sempre o mesmo texto, sem edição acidental na tela.
- **Contexto:** Já existe uma página Sobre com título e uma frase de autoria escritos direto na interface, além da versão do app. Esta spec substitui apenas a parte textual fixa. A versão ao vivo fica na Spec 02.
- **Atores:** Pessoa que usa o app (apenas visualiza). Pessoa que desenvolve o app (altera os textos na origem única, fora do uso normal).
- **Descrição do comportamento:** Ao abrir a página Sobre, o sistema lê título, autor e curso da origem única e os apresenta juntos, no topo da página. Os valores iniciais são: título "Sobre", autor "Luciano" e curso "o curso em que o projeto foi criado". A página não oferece campo, botão nem atalho para alterar esses textos. Se a origem única estiver indisponível, a página não inventa outro autor ou outro curso: informa que a identidade do projeto não pôde ser carregada.
- **Entradas e saídas:** Entrada: abertura da página Sobre. Saída: título, autor e curso visíveis, ou uma mensagem de que a identidade não carregou.
- **Dados/entidades envolvidos (conceitual):** Identidade do projeto: título, autor e curso. Não inclui clientes nem versão.
- **Estados e transições:** Carregando a identidade → identidade visível. Carregando a identidade → falha ao carregar a identidade. Não há estado de edição.
- **Regras de negócio:** Somente quem desenvolve altera a origem única. Quem usa o app só lê. Os três textos iniciais são os confirmados na coleta.
- **Validações:** A origem precisa fornecer os três itens. Item vazio não deve aparecer como espaço em branco sem explicação: o sistema trata ausência como falha de carregamento da identidade.
- **Fluxo do usuário (passo a passo):**
  1. A pessoa abre Sobre.
  2. Vê o título Sobre, o autor Luciano e a frase do curso.
  3. Não encontra forma de editar esses textos.
- **Casos de borda e erros:** Origem sem título, autor ou curso: a página avisa que a identidade não carregou e não completa com texto inventado. Pessoa tenta procurar um botão de editar: não existe.
- **Impacto no existente:** A página Sobre deixa de depender de frases fixas na interface para título, autor e curso. Menu, lista, cadastro e detalhe de cliente permanecem como estão.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que a origem única tem os textos confirmados, quando a pessoa abre Sobre, então vê "Sobre", "Luciano" e "o curso em que o projeto foi criado".
  - Dado que a pessoa está só usando o app, quando olha a página Sobre, então não há ação para alterar título, autor ou curso.
  - Dado que a origem única não entrega um dos três textos, quando a página abre, então ela avisa que a identidade não carregou.
- **Definição de pronto:** Abrir Sobre mostra os três textos vindos da origem única, sem edição na tela, e a falha da origem gera aviso em vez de texto inventado.
- **Dependências:** Nenhuma
- **Fora do escopo desta spec:** Versão, sistema operacional, quantidade de clientes e qualquer edição dos textos pela interface.

### Spec 02 — Dados ao vivo na página Sobre

- **Fase:** Fase 1
- **Objetivo (o quê):** A página Sobre mostra a versão do aplicativo, o sistema operacional e a quantidade atual de clientes.
- **Intenção (por quê):** Quem abre Sobre precisa confiar que aqueles números descrevem este app neste computador agora, e não um exemplo estático.
- **Contexto:** A página Sobre já consegue obter a versão do aplicativo. A lista de clientes já existe e é a fonte da quantidade. O sistema operacional é o da máquina em que o app está aberto. Os textos de identidade vêm da Spec 01 e continuam visíveis durante esta busca.
- **Atores:** Pessoa que usa o app e abre a página Sobre.
- **Descrição do comportamento:** Depois que a identidade da Spec 01 está na tela, a página busca a versão, o nome legível do sistema (Windows, macOS ou Linux) e a quantidade de clientes cadastrados. Enquanto a busca não termina, a página indica que os dados ao vivo estão carregando, sem apagar título, autor e curso. Ao terminar com sucesso, mostra os três dados. Se não houver clientes, mostra 0. Se a busca falhar, mantém a identidade e avisa que os dados ao vivo não carregaram, sem preencher versão ou quantidade com valor falso.
- **Entradas e saídas:** Entrada: página Sobre aberta e clientes já cadastrados no app, se houver. Saída: versão, sistema operacional e quantidade, ou aviso de falha. A quantidade 0 é uma saída válida.
- **Dados/entidades envolvidos (conceitual):** Versão do aplicativo. Sistema operacional da máquina atual. Cliente já existente: a página só usa a quantidade, não o nome, email ou demais campos.
- **Estados e transições:** Identidade visível e dados ao vivo carregando → dados ao vivo visíveis. Identidade visível e dados ao vivo carregando → falha dos dados ao vivo, com aviso. Quantidade 0 não é transição de erro.
- **Regras de negócio:** A quantidade é a mesma dos clientes já cadastrados. Zero aparece como 0. Falha não esconde a identidade nem inventa número. O sistema mostrado é o da execução atual.
- **Validações:** Não exibir quantidade negativa. Não tratar 0 como erro. Não mostrar versão em branco como se fosse sucesso: ausência de versão depois da busca é falha.
- **Fluxo do usuário (passo a passo):**
  1. A pessoa abre Sobre e vê a identidade do projeto.
  2. Vê uma indicação de carregamento dos dados ao vivo.
  3. Passa a ver versão, sistema operacional e quantidade de clientes.
  4. Se não houver clientes, lê 0.
  5. Se a busca falhar, lê o aviso e continua vendo a identidade.
- **Casos de borda e erros:** Nenhum cliente cadastrado: mostrar 0. Busca da versão ou da quantidade falha: aviso, sem número inventado. Sistema diferente de Windows, macOS e Linux: mostrar um nome genérico de sistema desconhecido, sem quebrar a página. A pessoa abre Sobre de novo depois de cadastrar ou excluir um cliente: a quantidade deve refletir o total atual, não um valor antigo preso na tela.
- **Impacto no existente:** Reutiliza a versão já obtida pelo app e a base de clientes já usada na lista. Não altera cadastro, detalhe, exclusão nem o atalho de novo cliente. A página Sobre passa a ter o bloco de dados ao vivo além da identidade.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que existem clientes cadastrados, quando a pessoa abre Sobre e a busca termina, então a quantidade é igual à quantidade da lista de clientes.
  - Dado que não existe cliente, quando a busca termina, então a página mostra 0.
  - Dado que a busca da versão ou da quantidade falha, quando a página termina de carregar, então a identidade continua visível e aparece o aviso de falha dos dados ao vivo.
  - Dado que o app está no Windows, macOS ou Linux, quando os dados ao vivo aparecem, então o sistema mostrado corresponde à máquina atual.
  - Dado que a pessoa cadastrou ou excluiu um cliente e abre Sobre de novo, quando a busca termina, então a quantidade corresponde ao total atual.
- **Definição de pronto:** A página mostra versão, sistema e quantidade reais, mostra 0 sem tratar como erro, avisa em caso de falha sem apagar a identidade, e a quantidade acompanha cadastros e exclusões já existentes.
- **Dependências:** Spec 01 — a identidade da página precisa permanecer visível enquanto os dados ao vivo carregam ou falham.
- **Fora do escopo desta spec:** Alterar textos de título, autor e curso. Editar cliente. Exibir a lista completa de clientes dentro da página Sobre.

## 14. Ordem recomendada de implementação

1. Spec 01 — Textos de identidade numa origem única
2. Spec 02 — Dados ao vivo na página Sobre

A Spec 02 acontece em cima da página que já mostra a identidade. Implementar nessa ordem evita tratar versão e quantidade numa tela que ainda depende de frases fixas, e garante que a falha dos dados ao vivo tenha os textos da Spec 01 para continuar exibindo.
