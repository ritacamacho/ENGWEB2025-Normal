# Teste de Engenharia Web 2025 (Normal) 

# Persistência de dados

De modo a facilitar o processo de importação para a base de dados em MongoDB, alterei todos os campos de `id` para `_id`.
Todos os restantes campos foram mantidos, renomeados ou normalizados de forma a manter a consistência e a compatibilidade com o esquema.

# Instruções de execução

## Base de Dados

```
$ docker compose up -d
```

## Backend

Entrar na diretoria:
```
$ cd ex1
```

Instalar dependências:
```
$ npm i
```

Iniciar aplicação:
```
$ npm start
```

Disponível na porta `25000` (`localhost:25000`).

## Frontend

Entrar na diretoria:
```
$ cd ex2
```

Instalar as dependências:
```
$ npm i
```

Iniciar a aplicação:
```
$ npm start
```

Disponível na porta `25001` (`localhost:25001`).