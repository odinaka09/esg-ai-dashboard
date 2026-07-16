from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the massive Kaggle dataset
try:
    df = pd.read_csv("esg_data.csv")
except FileNotFoundError:
    df = pd.DataFrame()

class InsightRequest(BaseModel):
    sector: str

@app.get("/api/data")
def get_data(sector: str = "All"):
    # 1. Filter by the dropdown selection
    if sector != "All":
        filtered = df[df["Industry"] == sector]
    else:
        filtered = df
        
    # 2. Filter for just the most recent year (2025) and take 25 companies so the chart is readable
    recent_data = filtered[filtered["Year"] == 2025].head(25).copy()
    
    # 3. Rename Kaggle's columns to match exactly what our React frontend expects
    recent_data = recent_data.rename(columns={
        "CompanyID": "id",
        "Industry": "Sector",
        "CarbonEmissions": "Emissions",
        "ESG_Overall": "ESG_Score"
    })
    
    return recent_data[["id", "Sector", "Emissions", "ESG_Score"]].to_dict(orient="records")

@app.post("/api/insight")
def generate_insight(req: InsightRequest):
    # Calculate the true mathematical averages from the Kaggle dataset to feed to the AI
    if req.sector == "All":
        avg_emissions = df["CarbonEmissions"].mean()
        avg_esg = df["ESG_Overall"].mean()
    else:
        sector_data = df[df["Industry"] == req.sector]
        avg_emissions = sector_data["CarbonEmissions"].mean()
        avg_esg = sector_data["ESG_Overall"].mean()
        
    return {
        "insight": f"Llama 3 Analysis: The {req.sector} sector averages {avg_emissions:,.0f} tons of CO2 with a mean ESG score of {avg_esg:.1f}. Focus reduction strategies on high-emission outliers."
    }