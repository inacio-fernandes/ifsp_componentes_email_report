# Sistema de Relatórios e Envio de Emails

## 📋 Descrição

Este projeto demonstra o acoplamento de componentes de software desenvolvidos seguindo o **Padrão de Interface de Componente** e os **Princípios SOLID**. O sistema integra dois componentes principais:

1. **Componente de Geração de Relatórios** (`@inaciofs/report-generator`)
2. **Componente de Envio de Emails** (`@lybioit/email-sender-component`)

O projeto faz parte da **Fase 3** da disciplina de Desenvolvimento de Componentes (BRADEPO) do IFSP - Campus Bragança Paulista.

## 👥 Autores

- **Lybio Moraes Junior** - BP303934X
- **Inácio Santana** - BP3039307

## 🎯 Objetivo

Demonstrar a integração e acoplamento de componentes reutilizáveis em um sistema funcional que:
- Gera relatórios em formatos CSV e Excel
- Envia os relatórios por email com template personalizado
- Utiliza configurações de ambiente para flexibilidade
- Segue boas práticas de desenvolvimento de componentes

## 🏗️ Arquitetura

### Padrão de Interface de Componente

O projeto utiliza o Padrão de Interface de Componente através de:

- **ReportGeneratorConcreteInterface**: Interface concreta do componente de relatórios
- **ConcreteComponentInterface**: Interface concreta do componente de email
- **Portas de Interface**: Acesso às funcionalidades específicas de cada componente

### Componentes Integrados

#### 1. Componente de Geração de Relatórios
- **Pacote**: `@inaciofs/report-generator`
- **Funcionalidade**: Gera relatórios em CSV e Excel a partir de dados JSON
- **Interface**: `ReportGeneratorConcreteInterface`

#### 2. Componente de Envio de Emails
- **Pacote**: `@lybioit/email-sender-component`
- **Funcionalidade**: Envia emails com templates Handlebars e anexos
- **Interface**: `ConcreteComponentInterface`

## 🚀 Instalação

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos de Instalação

1. **Clone o repositório**
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd ifsp_componentes_email_report
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp env.example .env
   ```

4. **Edite o arquivo `.env` com suas configurações**
   ```env
   # Configurações SMTP
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=seu-email@gmail.com
   SMTP_PASS=sua-senha-de-app
   
   # Email de destino
   EMAIL_TO=destinatario@example.com
   ```

## ⚙️ Configuração

### Configuração SMTP

Para testar o envio de emails, recomendamos usar o **Mailtrap**:

1. **Crie uma conta gratuita em [mailtrap.io](https://mailtrap.io)**
2. **Acesse sua caixa de entrada**
3. **Copie as credenciais SMTP fornecidas**
4. **Configure no arquivo `.env`**:

```env
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=587
SMTP_USER=sua_user_mailtrap
SMTP_PASS=sua_pass_mailtrap
EMAIL_TO=destinatario@example.com
```

### Configuração para Gmail

Se preferir usar Gmail:

1. **Ative a verificação em duas etapas**
2. **Gere uma "senha de app"**
3. **Configure no arquivo `.env`**:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app
```

## 🎮 Como Usar

### Execução Básica

```bash
npm start
```

### O que acontece durante a execução

1. **Carregamento de configurações** do arquivo `.env`
2. **Validação das configurações SMTP**
3. **Inicialização dos componentes** de relatório e email
4. **Geração de relatórios** em CSV e Excel
5. **Salvamento dos arquivos** no diretório `output/`
6. **Envio do email** com os relatórios anexados

### Saída Esperada

```
🚀 Iniciando processo de geração de relatórios e envio de email...

📊 Gerando relatórios...
✅ Relatórios gerados e salvos com sucesso:
   - CSV: /path/to/output/relatorio.csv
   - Excel: /path/to/output/relatorio.xlsx

📧 Configurando serviço de email...
📤 Enviando email...
✅ Email enviado com sucesso!
📬 Destinatário: destinatario@example.com
📎 Anexos: 2 arquivos
```

## 📁 Estrutura do Projeto

```
ifsp_componentes_email_report/
├── src/
│   ├── main.ts                    # Arquivo principal com acoplamento
│   └── templates/
│       └── base.hbs              # Template do email
├── output/                        # Relatórios gerados
│   ├── relatorio.csv
│   └── relatorio.xlsx
├── .env                          # Configurações de ambiente
├── .env.example                   # Exemplo de configuração
├── package.json                  # Dependências e scripts
├── tsconfig.json                 # Configuração TypeScript
└── README.md                     # Esta documentação
```

## 📊 Dados de Exemplo

O sistema utiliza dados de vendas como exemplo:

```typescript
const data = [
  { mes: 'Janeiro', produto: 'Notebook', vendas: 150, regiao: 'Sudeste' },
  { mes: 'Fevereiro', produto: 'Monitor', vendas: 230, regiao: 'Sudeste' },
  { mes: 'Março', produto: 'Mouse', vendas: 89, regiao: 'Sul' },
  { mes: 'Abril', produto: 'Teclado', vendas: 120, regiao: 'Nordeste' }
];
```

## 📧 Template de Email

O email utiliza um template Handlebars (`src/templates/base.hbs`) que suporta variáveis dinâmicas:

```html
<!DOCTYPE html>
<html>
<body>
  <h1>Olá, {{nome}}!</h1>
  <p>{{mensagem}}</p>
  <p>
    Para mais informações, <a href="{{link}}">clique aqui</a>.
  </p>
</body>
</html>
```

## 🧪 Testes

### Testando com Mailtrap

1. **Configure o Mailtrap** conforme instruções acima
2. **Execute o projeto**: `npm start`
3. **Verifique a caixa de entrada** do Mailtrap
4. **Confirme o recebimento** do email com anexos

### Verificação dos Arquivos

Após a execução, verifique:

- **Relatórios gerados**: `output/relatorio.csv` e `output/relatorio.xlsx`
- **Logs no console** para confirmar sucesso
- **Caixa de entrada** do email configurado

## 🔧 Scripts Disponíveis

```bash
# Executar o projeto
npm start

# Compilar TypeScript
npm run build

# Executar testes (quando implementados)
npm test
```

## 🐛 Solução de Problemas

### Erro: "Template file not found"

Se encontrar este erro, execute:

```bash
mkdir -p node_modules/@lybioit/email-sender-component/dist/internal/templates
cp src/templates/base.hbs node_modules/@lybioit/email-sender-component/dist/internal/templates/base.hbs
```

### Erro: "Configurações SMTP não encontradas"

Verifique se o arquivo `.env` está configurado corretamente:

```bash
cat .env
```

### Erro de Autenticação SMTP

- **Gmail**: Use uma "senha de app" em vez da senha normal
- **Mailtrap**: Verifique se as credenciais estão corretas
- **Outros provedores**: Consulte a documentação específica

## 📚 Dependências

### Produção
- `@inaciofs/report-generator`: ^1.0.2
- `@lybioit/email-sender-component`: ^1.0.3
- `dotenv`: ^16.5.0

### Desenvolvimento
- `@types/node`: ^24.0.3
- `ts-node`: ^10.9.2
- `typescript`: ^5.8.3

## 🎓 Contexto Acadêmico

Este projeto foi desenvolvido como parte da disciplina **Desenvolvimento de Componentes (BRADEPO)** do curso de **Tecnologia em Análise e Desenvolvimento de Sistemas** do **IFSP - Campus Bragança Paulista**.

### Fases do Projeto

- **Fase 1**: Modelagem de Casos de Uso e Diagramas de Atividade
- **Fase 2**: Desenvolvimento Individual de Componentes
- **Fase 3**: Acoplamento de Componentes (este projeto)

### Critérios de Avaliação Atendidos

- ✅ **CR3**: Implementação do Padrão de Interface de Componente
- ✅ **CR4**: Aplicação dos Princípios SOLID
- ✅ **CR5**: Sistema de Build e Dependências
- ✅ **CR6**: Testes das Funcionalidades
- ✅ **CR7**: Demonstração de Acoplamento entre Componentes

## 📄 Licença

Este projeto está licenciado sob a licença ISC.

## 👨‍🏫 Professor

**Luiz Gustavo Diniz de Oliveira Véras**

---

**Desenvolvido com ❤️ pelos alunos do IFSP - Campus Bragança Paulista** 
