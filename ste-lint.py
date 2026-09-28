import glob
import json
import os
import re
import sys


MARKETING = [
    "seamless", "seamlessly", "robust", "powerful", "cutting-edge",
    "effortless", "effortlessly", "world-class", "next-generation",
    "revolutionary", "blazing", "lightning-fast", "elegant", "delightful",
    "turnkey", "best-in-class", "state-of-the-art", "game-changing",
    "first-class", "battle-tested", "enterprise-grade", "supercharge",
    "unlock", "unleash", "empower", "empowers",
]

BANNED = [
    "begin", "begins", "commence", "commences", "initiate", "initiates",
    "originate", "utilize", "utilizes", "utilizing", "leverage", "leverages",
    "leveraging", "facilitate", "facilitates", "ensure", "ensures",
    "ensuring", "prior to", "subsequent to", "obtain", "obtains", "acquire",
    "acquires", "demonstrate", "demonstrates", "additionally", "furthermore",
    "moreover", "comprehensive", "comprehensively", "utilization",
    "aforementioned", "henceforth", "therein", "whilst", "amongst",
    "numerous", "myriad", "plethora", "in order to", "a variety of",
    "in the event that", "due to the fact that", "it is important to note",
]

PHRASAL = [
    "spin up", "spin down", "reach out", "dive into", "dives into",
    "diving into", "kick off", "kicks off", "roll out", "rolls out",
    "tear down", "ramp up", "circle back", "drill down", "spun up",
    "reaching out",
]

MODAL_HEDGE = [
    "it is important to note", "it should be noted", "it is worth noting",
    "please note that", "as mentioned", "as noted above",
]

BE = r"(?:am|is|are|was|were|be|been|being)"
PP_IRREG = (
    r"(?:done|made|sent|read|built|kept|held|set|put|run|written|shown|given|"
    r"taken|found|got|gotten|seen|known|thrown|drawn)"
)


def strip_code(text):
    text = re.sub(r"\A---\s*\n.*?\n---\s*(?:\n|$)", " ", text, flags=re.S)
    text = re.sub(r"```.*?```", " ", text, flags=re.S)
    return re.sub(r"`[^`]*`", " ", text)


def sentences(text):
    output = []
    for line in text.split("\n"):
        sentence = line.strip()
        if not sentence:
            continue
        sentence = re.sub(r"^\s*#{1,6}\s*", "", sentence)
        sentence = re.sub(r"^\s*(?:[-*+]|\d+[.)])\s+", "", sentence)
        if not sentence:
            continue
        parts = re.split(r"(?<=[.!?:])\s+(?=[A-Z0-9\"'\-])", sentence)
        output.extend(part.strip() for part in parts if part.strip())
    return output


def word_count(sentence):
    return len(re.findall(r"[A-Za-z0-9][A-Za-z0-9'\-/]*", sentence))


def count_phrases(text, phrases):
    count = 0
    hits = []
    lowercase_text = text.lower()
    for phrase in phrases:
        pattern = r"(?<![a-z])" + re.escape(phrase) + r"(?![a-z])"
        for _match in re.finditer(pattern, lowercase_text):
            count += 1
            hits.append(phrase)
    return count, hits


def is_list_block(paragraph):
    lines = [line.strip() for line in paragraph.splitlines() if line.strip()]
    return bool(lines) and all(
        re.match(r"^(?:[-*+]|\d+[.)])\s+", line) for line in lines
    )


def lint(text):
    raw_text = text
    text = strip_code(text)
    found_sentences = sentences(text)
    words = sum(word_count(sentence) for sentence in found_sentences) or 1
    violations = {}

    long_sentences = [
        (word_count(sentence), sentence)
        for sentence in found_sentences
        if word_count(sentence) > 20
    ]
    violations["long_sentence(>20w)"] = len(long_sentences)
    violations["semicolon"] = text.count(";")
    violations["contraction"] = len(
        re.findall(r"\b\w+['’](?:t|re|ve|ll|d|s|m)\b", text)
    )
    violations["passive_voice"] = len(
        re.findall(rf"\b{BE}\s+(?:\w+ed|{PP_IRREG})\b", text, re.I)
    )
    violations["ing_main_verb"] = len(
        re.findall(rf"\b{BE}\s+\w+ing\b", text, re.I)
    )
    violations["nominalization"] = len(
        re.findall(
            r"\b(?:perform(?:s|ed)?|conduct(?:s|ed)?|provide(?:s|d)?|"
            r"carry out|carries out|make use of|makes use of)\b",
            text,
            re.I,
        )
    ) + len(re.findall(r"\b\w{4,}(?:tion|ment|ance|ence)\s+of\b", text, re.I))
    violations["phrasal_verb"], _ = count_phrases(text, PHRASAL)
    violations["banned_word"], banned_hits = count_phrases(text, BANNED)
    violations["marketing_adjective"], marketing_hits = count_phrases(
        text, MARKETING
    )
    violations["modal_hedge"], _ = count_phrases(text, MODAL_HEDGE)

    paragraphs = [
        paragraph
        for paragraph in re.split(r"\n\s*\n", raw_text)
        if paragraph.strip() and not is_list_block(paragraph)
    ]
    violations["long_paragraph(>6s)"] = sum(
        1
        for paragraph in paragraphs
        if len(sentences(strip_code(paragraph))) > 6
    )

    total = sum(violations.values())
    return {
        "words": words,
        "sentences": len(found_sentences),
        "violations": violations,
        "total": total,
        "total_per100w": round(total * 100.0 / words, 2),
        "em_dash(slop-marker)": raw_text.count("—") + raw_text.count("–"),
        "longest_sentence_words": max(
            (word_count(sentence) for sentence in found_sentences), default=0
        ),
        "sample_marketing": list(dict.fromkeys(marketing_hits))[:6],
        "sample_banned": list(dict.fromkeys(banned_hits))[:6],
    }


def expand_paths(paths):
    expanded = []
    for path in paths:
        if any(character in path for character in "*?["):
            expanded.extend(sorted(glob.glob(path)))
        else:
            expanded.append(path)
    return expanded


def print_summary(path, result):
    print(
        f"{os.path.basename(path):32} "
        f"words={result['words']:4d} "
        f"total={result['total']:3d} "
        f"per100w={result['total_per100w']:6.2f} "
        f"em_dash={result['em_dash(slop-marker)']:2d}"
    )


def main():
    if not sys.argv[1:]:
        print(json.dumps(lint(sys.stdin.read()), indent=2))
        return

    for path in expand_paths(sys.argv[1:]):
        with open(path, encoding="utf-8") as source:
            result = lint(source.read())
        print_summary(path, result)


if __name__ == "__main__":
    main()
