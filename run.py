import os
import subprocess

# Folder paths, worked out from where run.py is
ROOT = os.path.dirname(os.path.abspath(__file__))
BACKEND = os.path.join(ROOT, "backend")
FRONTEND = os.path.join(ROOT, "frontend")
VENV_PYTHON = os.path.join(BACKEND, ".venv", "Scripts", "python.exe")

# Stop early with a clear message instead of crashing
if not os.path.exists(VENV_PYTHON):
    print("Backend .venv not found. Follow the Setup steps in README.md first.")
    raise SystemExit(1)

print("Starting backend...")
backend = subprocess.Popen(
    [VENV_PYTHON, "-m", "uvicorn", "main:app", "--reload", "--host", "0.0.0.0"],
    cwd=BACKEND,
)

print("Starting frontend...")
frontend = subprocess.Popen("npx expo start -c", cwd=FRONTEND, shell=True)

try:
    frontend.wait()
except KeyboardInterrupt:
    pass
finally:
    backend.terminate()
    frontend.terminate()
    print("SkinSense stopped.")