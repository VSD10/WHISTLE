# WHISTLE // AI VERIFICATION SYSTEM
### DECONSTRUCTED_DATA_STREAM // V2.0.4

![Whistle System](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

**Whistle** is a decentralized, multi-agent consensus engine designed to verify the "truth" of AI-generated content. By distributing verification across multiple LLM nodes (GPT-4, Claude 3, Gemini), Whistle eliminates single-point bias and provides cryptographic proof of compute for every answer.

> **CURRENT STATUS**: PROTOTYPE // OFFLINE_SIMULATION_MODE
> The system is currently running in a high-fidelity simulation mode. The "Neural Link" to the backend consensus engine is simulated to demonstrate the UI/UX architecture.

---

## // SYSTEM_ARCHITECTURE

### 1. CORE_STACK
- **Runtime**: React 19 (Vite)
- **Styling**: Tailwind CSS + Custom "Glitch" Animations
- **Language**: TypeScript
- **State**: React Hooks (Local Simulation)

### 2. KEY_FEATURES
- **Multi-Agent Consensus**: UI visualizes real-time agreement rates between disparate AI models.
- **Cryptographic Verification**: Displays SHA-256 hash generation for logic paths.
- **"Deconstructed" Aesthetic**:
  - Custom scanline overlays
  - Neon-green/Magenta data visualization
  - "Glitch" interaction effects
  - Raw data stream typography (Chivo Mono / Syne)
- **Offline Simulation**: Robust error handling and "offline" state visualization for disconnected nodes.

---

## // FILE_STRUCTURE_MAP

```text
WHISTLE_SYSTEM/
├── src/
│   ├── App.tsx                 # Main Controller & View Router
│   ├── index.css               # Global Styles (Tailwind + Custom Animations)
│   └── components/
│       ├── ChatInterface.tsx   # Main Verification Console (Offline Logic)
│       ├── Header.tsx          # System Navigation & Status Bar
│       ├── Hero.tsx            # Landing Page Entry Point
│       ├── Login/Signup.tsx    # Auth Modules (Mocked)
│       └── ... (See api_endpoints.txt for full map)
└── api_endpoints.txt           # Backend API Specification & Frontend Mapping
```

---

## // INITIALIZATION_PROTOCOL

**Prerequisites:** Node.js (v18+)

1. **Clone the Repository**
   ```bash
   git clone [REPO_URL]
   cd whistle-ai-verification
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Ignite System**
   ```bash
   npm run dev
   ```
   *Access the local node at `http://localhost:5173`*

4. **Access Credentials** (Simulation Mode)
   - **Email**: `operator@whistle.sys` (or any email)
   - **Password**: `any_password`

---

## // OPERATIONAL_GUIDE

### Chat Interface (Simulation)
1. Navigate to the **Chat** view (via "Execute Query" or Navigation).
2. Enter any query into the terminal input.
3. **Observation**: The system will simulate a "NEURAL_LINK_OFFLINE" state, demonstrating the error handling and data-block rendering logic without an active backend connection.

### Dashboard
- **Metrics**: Hover over the "METRICS" indicator in the header to see real-time confidence scores.
- **History**: Hover over "HISTORY" to view past verification nodes.

---

**© 2026 WHISTLE_SYSTEMS // DECENTRALIZED_TRUTH_PROTOCOL**
