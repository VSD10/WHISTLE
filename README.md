<div align="center">
  <img src="supabase/functions/send-onboarding-email/WHISTLE%20(1).png" alt="WHISTLE Logo" width="800"/>
</div>

# WHISTLE // AI VERIFICATION SYSTEM
### Multi-Agent Consensus for Trustworthy AI Outputs

**WHISTLE** (Weighted Hybrid Intelligent System for Trust, Logic & Evidence) is a multi-agent AI verification system designed to improve trust in AI-generated answers.

Instead of relying on a single AI model, WHISTLE compares responses from multiple AI agents and applies consensus logic and confidence scoring to produce a more reliable final answer.

This project is developed as an academic and hackathon prototype exploring how AI outputs can be verified before being trusted.

> **CURRENT STATUS**: PROTOTYPE // DEMONSTRATION MODE
> The system currently runs in a simulated environment to demonstrate UI, workflow orchestration, and multi-agent verification logic.

---

## PROJECT OBJECTIVE

Modern AI systems provide fast responses but may generate incorrect or misleading information. WHISTLE addresses this challenge by introducing a verification layer where multiple AI agents independently analyze the same input.

The system then:
1.  **Compares outputs**
2.  **Identifies agreement and conflicts**
3.  **Produces a verified answer**
4.  **Assigns a confidence score**

The goal is to make AI usage more transparent, explainable, and trustworthy.

---

## SYSTEM OVERVIEW

WHISTLE is built around a multi-agent consensus workflow:

1.  **User Query Input**
    A question or task is submitted.

2.  **Parallel AI Analysis**
    Multiple AI agents process the input independently.

3.  **Consensus & Weighting**
    Responses are compared using agreement-based logic.

4.  **Verified Output**
    A final answer is generated with a confidence score.

5.  **(Optional) Trust Layer**
    Verified results can be recorded for audit or transparency purposes.

---

## CORE FEATURES

### Multi-Agent Verification
Uses multiple AI agents instead of a single model to reduce reliance on one perspective.

### Consensus Logic
Identifies common conclusions between AI outputs and reduces the influence of outliers.

### Confidence Scoring
Each verified answer includes a confidence level based on response agreement.

### Explainable Results
Users can see why a particular answer was selected.

### Workflow-Based Orchestration
Designed to integrate with workflow systems (such as Chainlink CRE) for verifiable execution in hackathon environments.

---

## TECHNOLOGY STACK

### Frontend
-   React (Vite)
-   TypeScript
-   Tailwind CSS

### Simulation & Logic
-   JavaScript-based mock AI responses
-   Consensus and scoring logic implemented on the client side for demonstration

### Hackathon Integration (Planned)
-   Chainlink CRE for workflow orchestration
-   Smart contract interaction for verifiable result recording

---

## FILE STRUCTURE

```text
WHISTLE/
├── src/
│   ├── App.tsx                # Main application router
│   ├── pages/
│   │   ├── Home.tsx          # Product overview
│   │   ├── About.tsx         # Project background and team
│   │   ├── Demo.tsx          # AI verification demo interface
│   │   ├── Blog.tsx          # Project articles and updates
│   │   └── Login.tsx         # Future dashboard access (UI only)
│   ├── components/
│   │   ├── ChatInterface.tsx # Multi-agent verification simulation
│   │   ├── FeatureCards.tsx
│   │   ├── WorkflowSteps.tsx
│   │   └── Navbar.tsx
└── README.md
```

---

## GETTING STARTED

### Documentation
For detailed setup guides, troubleshooting, and deployment instructions, please verify the **[Setup Documentation](./setup/README.md)**.

### Prerequisites
-   Node.js (v18 or later)
-   npm or yarn

### Installation

```bash
git clone https://github.com/your-repo/whistle.git
cd whistle
npm install
npm run dev
```

Visit: `http://localhost:5173`

---

## USING THE DEMO

1.  Navigate to the **Demo** page.
2.  Enter a question in the input field.
3.  Click **Run Verification**.
4.  The system will simulate:
    -   Multiple AI responses
    -   Consensus analysis
    -   Final verified answer
    -   Confidence score

*Note: Current AI responses are simulated for demonstration purposes.*

---

## TEAM

-   **Bathrinath**
-   **Priyadharshan**
-   **Dharshan**
-   **Vasudevan**

---

## FUTURE IMPROVEMENTS

-   Real AI API integration
-   Dynamic agent weighting
-   Domain-specific verification models
-   On-chain storage of verified outputs
-   Enhanced confidence scoring methods

---

## DISCLAIMER

**WHISTLE is an academic and hackathon prototype.**
It is intended for research and demonstration purposes only and does not provide professional or automated decision-making services.

---

## LICENSE

MIT License
