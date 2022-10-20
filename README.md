# Cadastro de Usuários

**RF**
- Deve ser possível cadastrar um carro novo;
- Deve ser possível listar todas as categorias;

**RN**
- Não deve ser possível cadastrar um novo carro com a placa já existente;
- Não deve ser possível alterar a placa de um carro já existente;
- O carro deve ser cadastrado, por padrão, com disponibilidade;
- O usuário responsável pelo cadastro deve ser um administrador;

# Listagem de Carros

**RF**
- Deve ser possível listar todos os carros disponíveis;
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria;
- Deve ser possível listar todos os carros disponíveis pelo nome da marca;
- Deve ser possível listar todos os carros disponíveis pelo nome do carro;

**RN**
- O usuário não precisa estar logado no sistema;

# Cadastro de Especificação do Carro

**RF**
- Deve ser possível cadastrar uma especificação para o carro;
- Deve ser possível listar todas as especificações;
- Deve ser possível listar todos os carros;

**RN**
- Não deve ser possível cadastrar uma especificação para um carro não existente;
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro;
- O usuário responsável pelo cadastro deve ser um administrador;

# Cadastro de Imagens do Carro

**RF**
- Deve ser possível cadastrar a imagem do carro;
- Deve ser possível listar todos os carros;

**RNF**
- Utilizar o multer para fazer o upload dos arquivos;

**RN**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
- O usuário responsável pelo cadastro deve ser um administrador;

# Alugel do Carro

**RF**
- Deve ser possível cadastrar um aluguel;

**RN**
- O aluguel deve ter duração mínima de 24 horas;
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário;
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro;
