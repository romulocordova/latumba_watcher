# 🕯️ La Tumba Watcher

**La Tumba Watcher** is an experimental OSINT-style monitoring dashboard built with **React + TypeScript**.  
It explores how **public, indirect activity signals** around a fixed point of interest can be visualized and interpreted as weak signals.

This is **not** a real surveillance system.  
It is a **conceptual intelligence UI**, designed to prototype dashboards, visual language, and analytical flows.

---

## What this app does

- Displays a **fixed target (HQ)** with continuous monitoring
- Visualizes **peripheral activity** (nearby food / commerce locations)
- Highlights **activity spikes** based on hourly patterns
- Uses a **command-and-control style UI** focused on fast situational awareness
- Auto-refreshes data every 5 minutes
- Supports simulated or LLM-assisted data generation

---

## Tech stack

- React
- TypeScript
- TailwindCSS
- Recharts
- Gemini / AI Studio–compatible service layer (mockable)

---

## Project structure

```text
src/
├── App.tsx                    # Main dashboard / control view
├── services/
│   └── geminiService.ts       # Data orchestrator (LLM / mock / API)
├── components/
│   ├── MonitoringCard.tsx     # Target / location monitoring card
│   └── ActivityChart.tsx      # Hourly activity chart
├── types/
│   └── index.ts               # Shared data types
```

⸻

Run locally

Prerequisites:
	•	Node.js (18+ recommended)

1. Install dependencies

npm install

2. Set environment variables

Create a .env.local file and add:

GEMINI_API_KEY=your_api_key_here

3. Run the app

npm run dev

The app will be available at:

http://localhost:5173


⸻

Data model (simplified)
	•	MonitorData
	•	timestamp
	•	primary (HQ)
	•	nearby[] (peripheral locations)
	•	LocationStatus
	•	name
	•	status
	•	spikePercentage
	•	popularTimes[]
	•	HourlyData
	•	hour
	•	value
	•	isLive

⸻

Disclaimer

This project:
	•	❌ Does not track people
	•	❌ Does not collect private data
	•	❌ Is not a real-world surveillance system
	•	✅ Is a UI + analysis prototype for OSINT-style dashboards

All data is simulated, inferred, or abstracted for experimentation and visualization purposes only.

⸻

Intended use
	•	OSINT experimentation
	•	Intelligence dashboard prototyping
	•	UI/UX exploration for situational awareness tools
	•	LLM-assisted analysis interfaces

⸻

Roadmap ideas
	•	Multiple fixed targets
	•	Historical timelines
	•	Spike alert thresholds
	•	Event annotation
	•	Daily / weekly intel briefs
	•	Exportable snapshots

⸻

“Weak signals rarely announce themselves loudly.”
La Tumba Watcher is about learning how to see them.

