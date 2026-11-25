import sqlite3

DATABASE_FILE = "skinsense.db"


def get_connection():
    connection = sqlite3.connect(DATABASE_FILE)
    connection.row_factory = sqlite3.Row
    return connection


def create_tables():
    connection = get_connection()
    connection.execute("""
        CREATE TABLE IF NOT EXISTS analyses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at TEXT NOT NULL,
            acne TEXT NOT NULL,
            hyperpigmentation TEXT NOT NULL,
            dark_circles TEXT NOT NULL,
            texture TEXT NOT NULL,
            skin_health_score INTEGER NOT NULL,
            summary TEXT NOT NULL,
            needs_dermatologist INTEGER NOT NULL,
            model TEXT NOT NULL,
            prompt_version INTEGER NOT NULL
        )
    """)
    connection.commit()
    connection.close()