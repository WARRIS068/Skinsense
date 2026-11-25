import time

from fastapi import HTTPException

MAX_REQUESTS = 5
WINDOW_SECONDS = 60

requests_by_ip = {}


def check_rate_limit(ip):
    now = time.time()

    recent = []
    for request_time in requests_by_ip.get(ip, []):
        if now - request_time < WINDOW_SECONDS:
            recent.append(request_time)

    if len(recent) >= MAX_REQUESTS:
        raise HTTPException(429, "Too many photos checked. Please wait a minute and try again.")

    recent.append(now)
    requests_by_ip[ip] = recent