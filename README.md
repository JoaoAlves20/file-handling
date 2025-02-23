# Manipulação de arquivos

## Sobre o projeto

Foi criado com o principal intuito, de testar os meus conhecimentos e aprendizados no EW Academy, que ensina sobre manipulação de arquivos, e juntamnete com isso, também tem os testes unitários, tem os testes de cada funcionalidade, para mostrar o que está no arquivo, adicionar informações ao arquivos, editar informações e deletar informações.

## Tecnologias

- JavaScript
- JSON (arquivo)

## Como rodas o projeto

### Testes

```bash
# Baixar as dependências
$ yarn
# Rodas os testes usando Mocha
$ mocha test/index.test.js
```

### Linha de Comando

```bash
# Baixar as dependências
$ yarn
# Adicionar heroi
$ node commandline/index.js -h -n NameHero -p PowerHero
# Listar os herois
$ node commandline/index.js -l
# Deletar heroi 
$ node commandline/index.js -d -i IdHero
# Atualizar heroi
$ node commandline/index.js -u IdHero -n NameHero -p PowerHero
```