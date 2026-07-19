# AI-Enhanced ESG Business Intelligence Dashboard

A full-stack business intelligence application designed to analyze and visualize Environmental, Social, and Governance (ESG) metrics. 

Engineered with a decoupled client-server architecture, this dashboard processes high-volume corporate datasets to deliver real-time sustainability insights and interactive data visualization.

## 🚀 Key Features

* **API-Driven Architecture:** Strict separation of concerns utilizing a React/Vite client UI and a Python/FastAPI backend server.
* **ETL Processing:** Ingests, cleans, and transforms a large-scale corporate dataset (11,000+ records) using Pandas for high-performance filtering and aggregation.
* **Interactive Data Visualization:** Dynamic, responsive charting components built with Recharts to map Scope 1 Emissions against ESG performance metrics.
* **AI-Powered Executive Summaries:** Integration of a locally hosted Large Language Model (Ollama running Llama 3) to generate context-aware executive summaries from dynamically filtered ESG datasets, enabling privacy-preserving AI analysis without reliance on external APIs.
* **Secure API Configuration:** Implemented strict Cross-Origin Resource Sharing (CORS) middleware and Pydantic data validation to ensure secure state management.

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
* Pandas (Data manipulation & aggregation)
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
    pip install fastapi uvicorn pandas pydantic
    uvicorn main:app --reload

*The backend API will initialize at http://127.0.0.1:8000*

### 3. Initialize the Frontend Client (Terminal 2)

Open a new terminal window, navigate to the frontend directory, install node modules, and start the development server:

    cd frontend
    npm install
    npm run dev

*The React client will initialize at http://localhost:5173*

## 📊 Data Provenance
Data processing utilizes the ESG & Financial Performance Dataset via Kaggle. The backend dynamically filters, maps, and structures this data before serving JSON responses to the client.
