# Codex STE Repository Template

This repository contains reusable writing rules for coding agents.
It uses Simplified Technical English principles for clear project prose.

## Included Files

- `AGENTS.md` gives repository instructions to coding agents.
- `ste-writing-skill.md` defines the writing rules.
- `ste-lint.py` checks prose for common rule violations.

## Use the Template

1. Select **Use this template** on GitHub.
2. Create a repository from the template.
3. Add your project-specific instructions to `AGENTS.md`.
4. Keep the writing and commit rules that your project needs.

## Check Prose

The linter requires Python 3 and has no external dependencies.

Run it against one or more files:

```shell
python ste-lint.py README.md AGENTS.md
```

The report shows each rule count and a total count.
Review each reported violation before you commit the prose.

## Adapt the Rules

The default skill supports strict and STE-flavored modes.
Use strict mode for procedures, safety text, and error messages.
Use STE-flavored mode for general documentation.

ASD-STE100 is a copyrighted standard.
This repository contains an independent summary, not the standard text.
See the [official ASD-STE100 website](https://asd-ste100.org) for standard information.
