# AI-Enhanced ESG Business Intelligence Dashboard

A full-stack business intelligence application designed to analyze and visualize Environmental, Social, and Governance (ESG) metrics. 

Engineered with a decoupled client-server architecture, this dashboard processes high-volume corporate datasets to deliver real-time sustainability insights and interactive data visualization.

<img width="1920" height="1039" alt="image" src="https://github.com/user-attachments/assets/46b27856-a039-4420-b147-c84162d781cc" />
<img width="1920" height="426" alt="Screenshot 2026-07-19 162143" src="https://github.com/user-attachments/assets/8ff84be8-a07e-4828-95fa-a6319f37ae22" />



## 🚀 Key Features

* **API-Driven Architecture:** Strict separation of concerns utilizing a React/Vite client UI and a Python/FastAPI backend server.
* **ETL Pipeline:** Extracts, transforms, and loads over 11,000 ESG records using Pandas, producing optimized datasets for high-performance filtering, aggregation, and REST API delivery.
* **Interactive Data Visualization:** Dynamic, responsive charting components built with Recharts to map Scope 1 Emissions against ESG performance metrics.
* **AI-Powered Executive Summaries:** Integrates a locally hosted Llama 3 model through Ollama to generate context-aware executive summaries from dynamically filtered ESG data, enabling privacy-preserving inference without external API dependencies.
* **Secure API Configuration:** Implements CORS middleware and Pydantic request/response models for validated data exchange between the backend and frontend.

## 🛠️ Technical Stack

**Frontend Environment**
* React.js (Scaffolded via Vite)
* JavaScript / JSX
* Recharts (Data Visualization Library)
* ESLint

**Backend Environment**
* Python 3
* FastAPI (RESTful API framework)
* Uvicorn (ASGI web server)
* Pandas (ETL, data transformation, aggregation)
* Pydantic (Data validation)
* Ollama / Llama 3 (Local LLM Inference)

## 💻 Local Development Setup

**Prerequisites:** Node.js, Python 3, and Ollama installed. The application requires concurrent backend and frontend server processes.

### 1. Clone the Repository

    git clone https://github.com/your-username/esg-ai-dashboard.git
    cd esg-ai-dashboard

### 2. Initialize the Local AI & Backend Server (Terminal 1)

Ensure Ollama is running locally, then navigate to the backend directory, install dependencies, and boot the ASGI server:

    ollama run llama3
    cd backend
    pip install -r requirements.txt
    uvicorn main:app --reload

*The backend API will initialize at http://127.0.0.1:8000*

### 3. Initialize the Frontend Client (Terminal 2)

Open a new terminal window, navigate to the frontend directory, install node modules, and start the development server:

    cd frontend
    npm install
    npm run dev

*The React client will initialize at http://localhost:5173*

## 📊 Data Provenance
Uses the ESG & Financial Performance dataset from Kaggle. The backend performs ETL processing, dynamic filtering, aggregation, and JSON serialization before exposing the processed data through REST API endpoints.
