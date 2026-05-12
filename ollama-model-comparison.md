# Ollama Model Comparison

## Model Overview

| Feature             | llama3.1          | llama3.2          | tinyllama         |
|---------------------|-------------------|-------------------|-------------------|
| **Made By**         | Meta              | Meta              | Open Community    |
| **Parameters**      | 8B / 70B / 405B   | 1B / 3B           | 1.1B              |
| **Download Size**   | 4.7 GB            | 2.0 GB            | 638 MB            |
| **Context Length**  | 128,000 tokens    | 128,000 tokens    | 2,048 tokens      |
| **RAM Required**    | ~6 GB             | ~3 GB             | ~1 GB             |
| **Speed on CPU**    | Slow              | Medium            | Fast              |
| **Quality**         | ⭐⭐⭐⭐⭐         | ⭐⭐⭐⭐           | ⭐⭐              |
| **Best For**        | Complex tasks     | Balanced use      | Quick simple tasks|

## Context Length in Simple Terms

| Model     | Tokens  | Words   | Pages    |
|-----------|---------|---------|----------|
| llama3.1  | 128,000 | ~96,000 | ~200 pages |
| llama3.2  | 128,000 | ~96,000 | ~200 pages |
| tinyllama |   2,048 |  ~1,500 |   ~3 pages |

## Token Reference

| Text                  | Approx Tokens |
|-----------------------|---------------|
| 1 word                | ~1.3 tokens   |
| 1 sentence            | ~15 tokens    |
| 1 paragraph           | ~60 tokens    |
| 1 page                | ~500 tokens   |
| 10 pages              | ~5,000 tokens |

## Recommendation by Machine Specs

| RAM Available | Recommended Model | Command                  |
|---------------|-------------------|--------------------------|
| 2 GB or less  | tinyllama         | ollama pull tinyllama    |
| 3 GB - 5 GB   | llama3.2          | ollama pull llama3.2     |
| 6 GB or more  | llama3.1          | ollama pull llama3.1     |
