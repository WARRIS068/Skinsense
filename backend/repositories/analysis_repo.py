from database import get_connection


def save(analysis):
    connection = get_connection()
    cursor = connection.execute(
        """INSERT INTO analyses (created_at, acne, hyperpigmentation, dark_circles, texture,
                                 skin_health_score, summary, needs_dermatologist, model, prompt_version)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (
            analysis.created_at,
            analysis.acne,
            analysis.hyperpigmentation,
            analysis.dark_circles,
            analysis.texture,
            analysis.skin_health_score,
            analysis.summary,
            int(analysis.needs_dermatologist),
            analysis.model,
            analysis.prompt_version,
        ),
    )
    connection.commit()
    analysis.id = cursor.lastrowid
    connection.close()
    return analysis


def find_all():
    connection = get_connection()
    rows = connection.execute("SELECT * FROM analyses ORDER BY id DESC").fetchall()
    connection.close()
    return [dict(row) for row in rows]