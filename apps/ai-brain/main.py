from fastapi import FastAPI

app = FastAPI(title="NexusAI Brain")

@app.get("/")
async def root():
    return {"message": "NexusAI Brain (AI Engine) is active"}

@app.get("/health")
async def health():
    return {"status": "healthy"}
