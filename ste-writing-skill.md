---
name: ste-writing
description: Rewrite project prose with Simplified Technical English principles. Use this skill for documentation, READMEs, pull requests, messages, release notes, and code comments. Do not use it for code, identifiers, commands, marketing text, or creative writing.
---

# STE Writing

Write project prose with ASD-STE100 Simplified Technical English principles.
Apply these rules to documentation, messages, release notes, and comments.
Do not apply the rules to code, identifiers, or command syntax.

## Word Rules

- Use one name for one thing.
- Use a short, common word when it has the correct meaning.
- Give each word one meaning in the same context.
- Use American spelling.
- Remove unsupported marketing claims.

Prefer these words:

- Use `start` instead of `begin`, `commence`, or `initiate`.
- Use `use` instead of `utilize` or `leverage`.
- Use `help` instead of `facilitate`.
- Use `make sure` instead of `ensure`.
- Use `before` instead of `prior to`.
- Use `after` instead of `subsequent to`.
- Use `about` instead of `regarding` or `concerning`.
- Use `get` instead of `obtain` or `acquire`.
- Use `show` instead of `demonstrate`.
- Use `also` instead of `additionally`, `furthermore`, or `moreover`.

Do not use unsupported terms such as these examples:

- `seamless`
- `robust`
- `powerful`
- `cutting-edge`
- `effortless`
- `world-class`
- `next-generation`
- `revolutionary`

## Verb Rules

- Use active voice when you know the actor.
- Use a verb for an action.
- Remove unnecessary auxiliary verbs.
- Use a simple verb tense when it states the meaning.

Write `analyze the log` instead of `perform an analysis of the log`.
Write `this improves the result` instead of an indirect claim.

## Sentence Rules

- Put one instruction in each sentence.
- Limit an instruction to 20 words.
- Limit a descriptive sentence to 25 words.
- Do not use contractions.
- Use articles when the meaning requires them.

## Punctuation Rules

- Do not use semicolons.
- Split the text into two sentences when needed.

## Structure Rules

- Put one topic in each paragraph.
- Limit a paragraph to six sentences.
- Use a numbered vertical list for a procedure.
- Put one action in each numbered step.
- Use the imperative form for each action.
- Put a condition before its command.

Return only the requested text.
Do not add a preamble, summary, or closing statement.

## Modes

### Strict

Use strict mode for procedures, runbooks, safety text, and error messages.
Apply every rule and both sentence limits.

### STE-Flavored

Use STE-flavored mode for READMEs, pull requests, and general documentation.
Keep the sentence, paragraph, active voice, and verb rules.
Allow other necessary words when they make the text clear.

## Self-Check

1. Split each instruction that has more than 20 words.
2. Split each descriptive sentence that has more than 25 words.
3. Replace each semicolon.
4. Expand each contraction.
5. Change passive voice when you know the actor.
6. Replace an indirect phrase with a plain verb.
7. Use one name for each thing.

The mechanical rules remove common writing problems.
A checker cannot validate technical accuracy or complete compliance with ASD-STE100.

See the [official ASD-STE100 website](https://asd-ste100.org) for information about the copyrighted standard.
