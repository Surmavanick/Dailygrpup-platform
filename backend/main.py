
from fastapi import FastAPI

app = FastAPI(title="Pulsi API")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/mentions")
def mentions():
    return [
        {"source": "news.ge", "sentiment": "positive", "text": "Pulsi helps CSR visibility"}
    ]
