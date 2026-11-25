from datetime import datetime


class Analysis:
    def __init__(self, result):
        self.id = None
        self.created_at = datetime.now().isoformat(timespec="seconds")
        self.acne = result["acne"]
        self.hyperpigmentation = result["hyperpigmentation"]
        self.dark_circles = result["dark_circles"]
        self.texture = result["texture"]
        self.skin_health_score = result["skin_health_score"]
        self.summary = result["summary"]
        self.needs_dermatologist = result["needs_dermatologist"]
        self.model = result["model"]
        self.prompt_version = result["prompt_version"]