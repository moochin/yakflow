# Yakflow

<p align="center">
  <img src="assets/yakflow-mascot.png" alt="Yakflow mascot" width="320" />
</p>

A lightweight web survey that helps engineering teams assess adoption of the 24 Accelerate capabilities, score current maturity, and get practical next actions to improve fast flow.

## Why this exists

Many capability surveys are heavy on management language. Yakflow is written for engineers and focuses on observable signals from day-to-day delivery work.

## What it does

- Covers all 24 Accelerate capabilities.
- Uses a consistent `1-5` slider score per capability.
- Adds engineer-friendly "reality check" checklists to calibrate scoring.
- Captures blockers and evidence notes per capability.
- Shows category-level results in a radar (spider) chart.
- Generates prioritized next steps by capability and by category.
- Exports results as JSON.
- Compares current results against a previous JSON export with a dual radar and change summary.
- Persists progress in browser `localStorage`.

## Use online

https://moochin.github.io/yakflow/ 

## Run locally

No build step is required.

1. Clone the repo.
2. Open `index.html` in your browser.

Optional local server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## How scoring works

- Scale: `1` (not in place) to `5` (fully adopted).
- Calibration rubric in-app:
- `1`: absent
- `3`: working in pockets
- `5`: default path across teams
- Reality-check checkboxes help teams score based on evidence, not assumptions.

## Outputs

- Overall score and category averages.
- Radar chart across capability categories.
- Top next steps for lowest-scoring capabilities.
- Fast-flow action cards by category.
- Downloadable JSON report for sharing or trend tracking.

## Project structure

- `index.html` - app shell and layout
- `styles.css` - visual design and responsive styles
- `app.js` - capability model, scoring logic, chart rendering, and report export

## Customization

You can tailor this quickly:

- Edit capability wording and checklists in `app.js`.
- Adjust scoring labels in `SCALE_OPTIONS`.
- Change recommendation playbooks in each capability `recommendations` list.
- Update visual style in `styles.css`.

## Disclaimer

This is not an official DORA or Google survey implementation. Use it as a team self-assessment and conversation starter, not as a top-down performance metric or individual/team scorecard.

## Research references

- [Accelerate (Forsgren, Humble, Kim)](https://itrevolution.com/product/accelerate/)
- [DORA research](https://dora.dev/research/)
- [State of DevOps reports](https://dora.dev/research/state-of-devops/)
