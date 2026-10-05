# Contribuindo com o Arena Dev

Obrigado pelo interesse em contribuir com o **Arena Dev**.

Este documento apresenta algumas orientações para manter o projeto organizado, consistente e fácil de manter.

---

## Antes de começar

Antes de realizar qualquer alteração:

1. Leia este documento;
2. Verifique as issues e tarefas existentes;
3. Evite trabalhar em uma funcionalidade que já esteja sendo desenvolvida por outra pessoa;
4. Em caso de dúvida, converse com a equipe responsável pelo projeto.

---

## Fluxo de contribuição

O fluxo recomendado é:

```text
Fork / Branch
      ↓
Desenvolvimento
      ↓
Testes
      ↓
Pull Request
      ↓
Code Review
      ↓
Aprovação
      ↓
Merge
```

Para alterações realizadas por membros com acesso direto ao repositório, recomenda-se trabalhar em uma branch específica em vez de alterar diretamente a branch principal.

---

## Branch principal

A branch principal representa uma versão estável do projeto.

Evite realizar alterações diretamente nela.

Crie uma branch para sua tarefa:

```bash
git checkout -b feature/nome-da-feature
```

Exemplos:

```text
feature/nova-secao
fix/formulario-contato
style/ajuste-responsividade
docs/atualizacao-readme
```

---

## Commits

Procure manter os commits objetivos e descritivos.

Exemplos:

```text
feat: adiciona seção de parceiros
fix: corrige formulário de contato
style: ajusta responsividade da página inicial
docs: atualiza README
refactor: reorganiza arquivos CSS
```

Evite mensagens genéricas como:

```text
alterações
mudanças
teste
final
atualização
```

---

## Pull Requests

Ao abrir um Pull Request, descreva de forma clara:

* O que foi alterado;
* Por que a alteração foi necessária;
* Quais páginas ou arquivos foram modificados;
* Se existe algum ponto que precisa de atenção durante a revisão.

Exemplo:

```text
## Alterações

- Adicionada nova seção na página inicial;
- Ajustada responsividade para dispositivos móveis;
- Atualizados estilos relacionados à seção.

## Testes

- Desktop
- Tablet
- Mobile

## Observações

Nenhuma alteração adicional necessária.
```

---

## Padrões do projeto

Ao contribuir com o site:

* Mantenha a identidade visual do Arena Dev;
* Preserve a responsividade;
* Evite código duplicado;
* Mantenha os arquivos organizados;
* Utilize nomes de arquivos e classes claros;
* Não remova funcionalidades existentes sem alinhamento com a equipe;
* Teste as alterações antes de abrir um Pull Request;
* Evite adicionar dependências desnecessárias.

---

## HTML

Utilize HTML semântico sempre que possível.

Exemplo:

```html
<header>
  <nav>
    ...
  </nav>
</header>

<main>
  <section>
    ...
  </section>
</main>

<footer>
  ...
</footer>
```

---

## CSS

Procure manter os estilos organizados e reutilizáveis.

Evite inserir grandes quantidades de CSS diretamente nos arquivos HTML utilizando `style=""`.

Sempre que possível, utilize os arquivos CSS destinados ao projeto.

---

## JavaScript

O JavaScript deve permanecer organizado e separado da estrutura HTML sempre que possível.

Evite inserir scripts extensos diretamente nas páginas.

---

## Responsividade

Toda alteração visual deve ser testada em diferentes tamanhos de tela.

No mínimo:

* Desktop;
* Tablet;
* Smartphone.

Uma alteração que funciona apenas em desktop não deve ser considerada concluída.

---

## Assets

Novos arquivos de imagem, documentos ou outros recursos devem ser armazenados na pasta apropriada dentro de `assets`.

Utilize nomes de arquivos claros e evite nomes como:

```text
imagem1.png
final.png
final2.png
novo.png
teste.png
```

Prefira:

```text
logo-arena-dev.png
media-kit.pdf
parceiro-cob.png
```

---

## O que evitar

Não envie para o repositório:

* Senhas;
* Tokens;
* Chaves de API privadas;
* Credenciais;
* Informações pessoais desnecessárias;
* Arquivos temporários;
* Arquivos gerados automaticamente que não sejam necessários.

Antes de realizar um commit, verifique sempre os arquivos que serão enviados.

---

## Dúvidas

Se você não tiver certeza sobre uma alteração, converse com a equipe do Arena Dev antes de implementá-la.

A colaboração é parte fundamental da proposta do Arena Dev.
