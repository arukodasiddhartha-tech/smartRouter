# RouteOpt — Intelligent Route Comparison & Optimization Engine

RouteOpt is a full-stack web application that solves multi-criteria route comparison and optimization. Given an origin and destination, it computes multiple distinct, loopless alternative corridors using **Yen's K-Shortest Paths algorithm**, models realistic energy/fuel consumption and carbon emissions for 5 vehicle types, evaluates routes using Multi-Attribute Utility Theory across user priorities (Fastest, Shortest, Cheapest, Eco-Friendly, Balanced, or Custom weights), displays all routes simultaneously on an interactive Leaflet map, and generates human-interpretable trade-off rationales.

---

## 🚀 Key Features

* **Multi-Corridor Discovery**: Implements Yen's K-Shortest Paths algorithm over a real-world geographic road graph with realistic coordinates, speed limits, congestion multipliers, and bridge/highway tolls.
* **Powertrain Cost Modeling**: Real vehicle energy curves for Petrol Sedans, Diesel SUVs, Electric Vehicles (EVs with regenerative braking), Hybrids, and Commercial Freight Trucks.
* **Multi-Criteria Optimization**:
  * ⚡ **Fastest**: Minimizes travel time, prioritizing express corridors over congested arterials.
  * 📏 **Shortest**: Minimizes physical odometer distance.
  * 💰 **Cheapest**: Minimizes direct expenditure (fuel/energy + bridge tolls).
  * 🌱 **Eco-Friendly**: Minimizes greenhouse emissions ($kg\ CO_2$).
  * ⚖️ **Balanced**: Multi-attribute utility synthesis balancing time, cost, distance, and congestion.
  * 🎛️ **Custom Weights**: Fine-tune custom weight sliders for Time, Cost, Distance, and Emissions.
* **Interactive Leaflet Map**:
  * Simultaneous multi-route visualization with distinct corridor color-coding.
  * Interactive polyline clicks & hover synchronizations.
  * Waypoint pins and custom SVG start/destination markers.
  * Auto-bounding to fit active routes.
* **Explainable AI (XAI) Rationale Engine**:
  * Transparent comparative breakdown detailing exact time and dollar savings against every alternative.
  * Side-by-side comparison matrix with conditional formatting.

---

## 🛠️ Architecture & Tech Stack

### Frontend (`frontend/`)
* **React 18** with **Vite**
* **Tailwind CSS** with dark mode styling
* **Leaflet** & **React-Leaflet** with CartoDB Dark Matter tiles
* **Lucide React** icons
* **Axios** client with Vite proxy

### Backend (`backend/`)
* **Node.js** & **Express.js** (ES Modules)
* **Algorithms**:
  * `dijkstra.js`: Binary min-heap Dijkstra with dynamic weight functions and edge/node masking.
  * `kShortestPaths.js`: Yen's K-Shortest loopless paths algorithm.
* **Services**:
  * `costService.js`: Powertrain consumption, congestion sensitivity, and emissions.
  * `optimizationService.js`: Min-max normalization and multi-attribute utility ranking.
  * `explanationService.js`: Automated trade-off comparative rationale generator.
  * `routingService.js`: Graph coordinator, Haversine lookup, geometry generation.
* **Data**:
  * `demoGraph.js`: High-fidelity geographic road network with 23 interconnected hubs across the San Francisco Bay Area and Silicon Valley corridors.

---

## 🏃 Running the Application

### 1. Start Backend Server
```bash
cd route-engine/backend
npm install
npm start
```
* Backend starts on: `http://localhost:5000`
* Health Check: `http://localhost:5000/api/health`
* Locations API: `http://localhost:5000/api/routes/locations`

### 2. Start Frontend Server
```bash
cd route-engine/frontend
npm install
npm run dev
```
* Frontend starts on: `http://localhost:5173`

---

## 🧪 Testing
To run the automated backend routing verification tests:
```bash
cd route-engine/backend
node testRouting.js
```
All tests validate Yen's algorithm, cost calculations, EV vs Petrol savings, and explanation generation.
