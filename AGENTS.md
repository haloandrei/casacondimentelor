# Repository Agent Instructions

## Project

Read the project documentation before you plan or change the repository.
Keep code and documentation consistent with accepted project decisions.
Read `docs/architecture.md` for the current day-one scope.
Do not add prices, stock claims, checkout, or legal claims without verified merchant data.
Keep product image source links in `README.md` and `src/catalog.ts`.

## Writing

Use `ste-writing-skill.md` for project prose.
Run `python ste-lint.py <file>` when you create or revise prose.

## Commits

Use a conventional commit type followed by a colon and a short message.
Do not add a scope in parentheses.

Allowed format:

`type: short message`

Examples:

- `feat: add user authentication`
- `fix: handle an empty configuration file`
- `chore: update development dependencies`

Do not use scoped formats such as `feat(api): ...` or `fix(parser): ...`.
