CONCERN_NAMES = {
    "acne": "Acne",
    "hyperpigmentation": "Hyperpigmentation",
    "dark_circles": "Dark circles",
    "texture": "Skin texture",
}

INGREDIENTS = {
    "acne": ["Salicylic acid", "Benzoyl peroxide (low strength)", "Niacinamide"],
    "hyperpigmentation": ["Vitamin C", "Azelaic acid", "Niacinamide", "Sunscreen (SPF 30 or higher)"],
    "dark_circles": ["Caffeine", "Vitamin C", "Hyaluronic acid"],
    "texture": ["Lactic acid or glycolic acid (gentle exfoliants)", "Retinol", "Hyaluronic acid"],
}


def needs_dermatologist(result):
    severities = [result["acne"], result["hyperpigmentation"], result["dark_circles"], result["texture"]]
    return "severe" in severities


def get_ingredients(result):
    suggestions = []

    if result["needs_dermatologist"]:
        return suggestions

    for concern in ["acne", "hyperpigmentation", "dark_circles", "texture"]:
        if result[concern] == "mild" or result[concern] == "moderate":
            suggestions.append({
                "concern": CONCERN_NAMES[concern],
                "ingredients": INGREDIENTS[concern],
            })

    return suggestions
