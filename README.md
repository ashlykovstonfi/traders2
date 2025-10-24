# Trading Style Quiz

A minimal, dark-themed single-page web application for discovering your trading personality through a 6-question quiz.

## Features

- **6 Question Quiz**: Situational questions about trading behavior
- **Dual-Axis Scoring**: Risk Tolerance (Y-axis) and Intuition-Strategy (X-axis)
- **Quadrant Results**: Four distinct trading styles based on your answers
- **Interactive Chart**: Visual representation of your position on the trading spectrum
- **Share & Download**: Generate shareable images of your results
- **State Persistence**: Resume your quiz if you leave and come back
- **Accessibility**: Keyboard navigation, ARIA labels, focus states
- **Responsive Design**: Works beautifully on mobile (360px) to desktop (1440px+)

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** for fast development and builds
- **Tailwind CSS** for styling
- **html2canvas** for image generation
- **Web Share API** for native sharing

## Project Structure

```
/src
  /components       # React components (Intro, Question, Result, Chart, etc.)
  /hooks           # Custom hooks (useQuiz)
  /lib             # Utilities (scoring, storage, share)
  /types           # TypeScript definitions
  /styles          # Global styles
/content           # JSON data files
/public/images     # Illustration assets
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

The `dist` folder will contain the production-ready static files.

## Content Structure

All content is loaded from JSON files in `/public/content`:

- `copy.en.json` - Intro text, axis labels, universal result text, share strings
- `questions.en.json` - All 6 questions with options and scoring deltas
- `results.en.json` - Quadrant descriptions, strengths, cautions, tips
- `scoring.json` - Scoring configuration and chart parameters

## Scoring Logic

Each answer contributes delta values to RT (Risk Tolerance) and IS (Intuition-Strategy) axes:

- **RT > 0 & IS <= 0** → HR_INT (Instinctive Daredevil)
- **RT > 0 & IS > 0** → HR_STR (Calculated Risk-Taker)
- **RT <= 0 & IS > 0** → LR_STR (Disciplined Planner)
- **RT <= 0 & IS <= 0** → LR_INT (Cautious Observer)

## Customization

Edit the JSON files to customize:
- Quiz questions and options
- Result descriptions and tips
- Scoring weights and chart appearance
- All UI copy

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT
