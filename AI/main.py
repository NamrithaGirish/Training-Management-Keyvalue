from fastapi import APIRouter, Request, jsonify
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from feedback_summary import analyze_large_feedback
from material_feedback import analyze_session
app = APIRouter()

class SessionMaterialInput(BaseModel):
    topic: str
    description: str
    list_of_urls: list[str]


class FeedbackInput(BaseModel):
    comments: list[str]

@app.post("/material-feedback")
def get_material_feedback(data: SessionMaterialInput):
    # Replace with your real logic
    try:
        material_feedback = analyze_session(data.list_of_urls, data.topic, data.description)

        return {"feedback": material_feedback}
    except Exception as e:
        return {"error": str(e)}

@app.post("/session-feedback")
def get_session_feedback(data: FeedbackInput):
    try:
        session_feedback = analyze_large_feedback(data.comments)
        return jsonify({"feedback": session_feedback})
    except Exception as e:
        return {"error": str(e)}


