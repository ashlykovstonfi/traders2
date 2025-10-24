# Quick Start Guide

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
Then open http://localhost:5173 in your browser.

### Production Build
```bash
npm run build
npm run preview
```

## 📋 What's Included

### 6 Trading Questions
The quiz asks 6 situational questions about trading behavior:
1. Market crash reaction
2. Parabolic price movement
3. Profit-taking strategy
4. Stop-loss decisions
5. News event trading
6. Range-bound periods

### 4 Trading Styles
Based on your answers, you'll get one of four results:
- **Instinctive Daredevil** (HR_INT) - High risk, intuitive
- **Calculated Risk-Taker** (HR_STR) - High risk, strategic
- **Disciplined Planner** (LR_STR) - Low risk, strategic
- **Cautious Observer** (LR_INT) - Low risk, intuitive

### Key Features
- ✅ Dark, minimal design
- ✅ Mobile-responsive (360px - 1440px+)
- ✅ Keyboard accessible
- ✅ Progress saved to localStorage
- ✅ Share results via Web Share API
- ✅ Download result as PNG image
- ✅ Interactive quadrant chart

## 🎨 Customization

All content is in JSON files at `/public/content/`:

### Change Questions
Edit `questions.en.json` - modify prompts, options, or delta values.

### Modify Results
Edit `results.en.json` - update descriptions, strengths, cautions, or tips.

### Adjust Scoring
Edit `scoring.json` - change chart range, grid steps, or initial values.

### Update Copy
Edit `copy.en.json` - change intro text, axis labels, or button labels.

## 📁 Project Structure

```
src/
├── components/      # UI components
├── hooks/          # State management
├── lib/            # Utilities
├── types/          # TypeScript types
└── App.tsx         # Main component

public/
├── content/        # JSON data files
└── images/         # Placeholder for illustrations
```

## 🖼️ Adding Images

Add illustrations to `/public/images/`:
- `q1.png` - `q6.png` for questions
- `res-instinctive.png` for HR_INT
- `res-calculated.png` for HR_STR
- `res-disciplined.png` for LR_STR
- `res-cautious.png` for LR_INT

Images will display automatically when added.

## 🔧 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **html2canvas** - Image generation

## 📝 Notes

- All state persists in localStorage
- Quiz can be resumed after leaving
- Content is fully JSON-driven
- No backend required
- Works offline after initial load

