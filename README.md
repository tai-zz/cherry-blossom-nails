# Cherry Blossom Nails — site

Site de uma página, animado e responsivo, para a nail designer Ana (@cherryblush.nails).

## Como abrir

Basta dar duplo clique em `index.html` — funciona direto no navegador, sem instalar nada.

Se quiser rodar com servidor local (recomendado para testar como ficará online):

```bash
node server.js
```

Depois abra `http://localhost:5500`.

## Estrutura

```
index.html            página única
assets/css/style.css  estilos + animações
assets/js/main.js     interações
assets/img/           logo + 11 fotos do portfólio
server.js             servidor local simples (opcional)
```

## Paleta (tirada da logo do perfil)

| Cor | Hex | Uso |
|---|---|---|
| Blush claro | `#FFF7FA` | fundo |
| Blush | `#FFDCE8` | detalhes, bordas |
| Rosa | `#F7A8C0` | gradientes |
| Cereja | `#D6336C` | destaque, botões, script |
| Vinho | `#8E1B3E` | rodapé, faixa |

As variáveis ficam no topo de `assets/css/style.css`, no bloco `:root`. Mudar ali muda o site inteiro.

## Contatos configurados

- WhatsApp: `+55 27 99783-3072` (links `wa.me/5527997833072`)
- Instagram: `@cherryblush.nails`

Para trocar o número, busque por `5527997833072` em `index.html` e em `assets/js/main.js` (constante `WA`).

## Recursos

- Preloader com a logo
- Cursor personalizado (desktop)
- Pétalas caindo no fundo
- Título com revelação linha a linha
- Parallax nas fotos do hero e nos brilhos de fundo
- Botões magnéticos
- Faixa de serviços em rolagem infinita
- Animação de entrada em cada seção
- Portfólio em grade, só com as fotos (sem legendas nem categorias)
- Lightbox com teclado (← → Esc) e swipe no celular
- Formulário que monta a mensagem e abre o WhatsApp já preenchido
- Botão flutuante de WhatsApp
- Barra de progresso de leitura
- Menu lateral no celular
- Respeita `prefers-reduced-motion`

## O que falta você preencher

Deixei de fora tudo que eu não tinha como confirmar — não inventei nada:

1. **Preços.** Os cards de serviço falam "valores sob consulta". Se quiser tabela, é só adicionar dentro de cada `<article class="card">`.
2. **Endereço completo.** O bio do Instagram diz só "centro - SMJ". Está assim no site, em `.chan__i--static` e no rodapé. Vale trocar pelo endereço real e, se quiser, colocar um mapa.
3. **Horário de atendimento.** Não há nada sobre dias/horários — dá pra colocar mais um card de contato.
4. **Depoimentos.** Não criei seção de avaliações porque seria inventar comentários de clientes. Quando tiver prints reais, dá pra adicionar.
5. **Fotos.** As 11 do portfólio foram baixadas do Instagram em 640px (é o que o Instagram entrega). Se você tiver os originais, é só substituir os arquivos em `assets/img/` mantendo os mesmos nomes.

## Publicar online

Qualquer hospedagem de site estático serve, sem configuração:

- **Netlify** ou **Vercel**: arrasta a pasta inteira na página deles.
- **GitHub Pages**: sobe a pasta num repositório e ativa Pages.

Nenhuma delas precisa do `server.js` — ele é só para testar no seu computador.
