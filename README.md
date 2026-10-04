# Science Silk Road — MA Thesis Research Hub

A lightweight, continuously updated research workspace for an MA thesis on the Science Silk Road.

## Fastest way to use it

### 1. Daily research notes
Edit:
- `notes.md`

On the website, click **编辑研究日志**.

### 2. Read one paper
Open the paper’s detail page from the website. Each paper has its own note file under:
- `literature-notes/`

Each note file contains:
- 阅读状态
- 一句话结论
- 研究问题
- 方法与材料
- 关键启发
- 与我的论文的关系
- 可引用段落
- 疑点
- 读完之后要做什么

The detail page has a direct **编辑这篇文献的笔记** button.

### 3. Add a new paper
Use:
- `literature-notes/_TEMPLATE.md`

Then add its bibliographic metadata to:
- `data/papers.json`

If you prefer, tell ChatGPT “把这篇文献加到 thesis 网页里” and provide the citation / PDF / link.

### 4. Change the thesis question or research design
Edit:
- `data/research.json`

This controls:
- current working questions
- three design routes
- dataset fields
- unresolved decisions

## Main site structure

- **论文思路地图** — empirical object → simple question → evidence → research routes → decisions
- **研究问题** — current working formulations
- **文献库** — searchable paper cards with reading status
- **文献详情页** — one page per paper, generated from `data/papers.json` + that paper’s Markdown note
- **方法与材料** — what each source type can and cannot support
- **研究日志** — rendered from `notes.md`

## Files you usually need to edit

| Purpose | File |
|---|---|
| Daily notes | `notes.md` |
| Paper reading notes | `literature-notes/<paper-id>.md` |
| Research questions / design | `data/research.json` |
| Bibliographic metadata / read status | `data/papers.json` |
| New-paper template | `literature-notes/_TEMPLATE.md` |

## GitHub Pages

The site is configured as a plain static Pages site. GitHub's native **pages build and deployment** workflow publishes changes from `main`.

Site URL:
https://zhaozheliang2002-jpg.github.io/science-silk-road-ma-thesis/

## Design principle

Keep the empirical question simple. Do not load the research question with concepts such as “legitimacy resource” or “governance tool” before the evidence warrants them.
