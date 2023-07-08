
# [Quando Joga?](https://quandojoga-front.vercel.app)

![](https://i.ibb.co/tMVzV2c/logotipo.png)

[Link do site](https://quandojoga-front.vercel.app)

## Descrição

O "Quando Joga?" é uma plataforma web desenvolvida em React que permite aos usuários acompanhar os próximos jogos de futebol de seu time favorito. Com esta aplicação, você pode obter informações sobre os jogos, como data, horário, local, transmissão e muito mais.

Esse projeto foi desenvolvido para a disciplina Programação Para Redes do curso Engenharia de Computação da UEFS.

## Funcionalidades

- Visualizar os próximos jogos de futebol do seu time favorito.
- Visualizar os jogos de uma competição específica.
- Visualizar os jogos de uma data específica. 
- Obter detalhes sobre os jogos, incluindo data, horário, estádio e adversário.
- Verificar os canais de transmissão onde o jogo será exibido.



## Estrutura e Funcionamento

O "Quando Joga?" é constituido por três partes principais.
 #### Crawler
Para obter os dados do site [OneFootball](https://onefootball.com/), foi criado um crawler em Python com a biblioteca BeautifulSoap que acessa as páginas e coleta os dados das partidas de futebol. O Crawler coleta somente os dados das partidas dos próximos dois meses, isto é, as partidas do mês em que ele foi rodado, juntamente com os dados do próximo mês. Foi feito pois além do óbvio aumento do tempo de coleta dos dados se ter uma data de corte muito longe, os dados de partidas muito distantes apresentaram certa inconsitência com outras fontes de pesquisa.

#### API
Com os dados estruturados em um formato JSON, criou-se uma [API](https://github.com/andersonlima7/api-quandojoga) para fornecer esses dados para o front-end. Algumas das principais rotas disponibilizadas são:

- "/matches/**nome_do_time**": Retorna todas as partidas de um dado time.
- "/matches/**data**": Retorna todas as partidas de uma data no formato DD-MM-YY.
- "/matches/championship/**campeonato**": Retorna todas as partidas de um dado campeonato.

A API pode ser acessada [aqui](https://github.com/andersonlima7/api-quandojoga).


#### Front-End 
O Front-End do "Quando Joga?" utiliza essa api e exibe as próximas partidas de futebol. 

#####  Tela Inicial
Na tela inicial é apresentado os jogos de hoje e da semana, agrupados pela competição e ordenados pela hora de inicio. Há uma barra de pesquisa para filtar os jogos por time, campeonato ou local de transmissão. Há também atalhos rápidos para os dias da semana atual.

![](https://i.ibb.co/5sFtbJq/home.png)

Ainda na tela inicial, há um botão para acessar um calendário para acessar os jogos de uma data específica. O dia sublinhado é a data atual e em vermelho é o dia selecionado.

![](https://i.ibb.co/6NdMC5F/home-calendar.png)

##### Header

No header, além do botão para alternar entre o tema claro e o tema escuro, há dois menus, o menu "Times", em que são apresentados links para acessar as partidas dos principais times do brasil e um link para acessar todos os times disponíveis no momento. E o menu "Campeonatos" que apresenta as principais competições do futebol mundial, além de apresentar um link para acessar todas as as competições disponíveis.
![](https://i.ibb.co/Mg9Wh3X/header-teams.png)

![](https://i.ibb.co/XCvxj6n/header-championships.png)

##### Time

Acesando o link de um time, as próximas partidas desse time são exibidas sendo agrupadas por mês. Nessa página é possível filtrar as partidas por competição.
![](https://i.ibb.co/58h0Z9B/team.png)

##### Campeonato
Acessando o link de um campeonato, as partidas desse campeonato são apresentadas agrupadas por rodadadas, como Oitavas de Final, Quartas de Final, ou até mesmo, Rodada 12,  Rodada 13 e etc. 
![](https://i.ibb.co/CQWNYJD/championship.png)

## Tecnologias Utilizadas

#### Crawler
- Python
- BeautifulSoap

#### API
- NodeJS
- Fastify
- Localmente o banco de dados usado foi o SQLite. Em produção foi utilizado o PostgresSQL criado na plataforma Neon.

#### Front-End
- ReactJS
- Typescript

## Pré-requisitos

Antes de executar a aplicação localmente, certifique-se de ter o seguinte instalado em sua máquina:

- Node.js: [https://nodejs.org](https://nodejs.org) 
- Git: [https://git-scm.com](https://git-scm.com)

## Como executar localmente

1. Clone o repositório da API com o comando:
	````
	git clone https://github.com/andersonlima7/api-quandojoga.git
	````
2. Clone este repositório em sua máquina local usando o seguinte comando:
	````
	git clone https://github.com/andersonlima7/quandojoga-front.git
	````
3. Acesse os repositórios e instale as dependências de ambos os repositórios clonados com o comando `yarn ou npm i`.
4. Execute os servidores de ambos os projetos com `yarn dev`.
5. Abra seu navegador e visite http://localhost:5173 para acessar o front-end da aplicação.


## Autor 
[Anderson Lima](https://github.com/andersonlima7)
	
	

