import logging
from typing import List
from logging import Logger, Formatter, StreamHandler

def get_logger() -> Logger:
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.INFO)

    ch: StreamHandler = StreamHandler()
    ch.setLevel(logging.INFO)

    formatter: Formatter = Formatter("%(asctime)s - %(levelname)s - %(message)s")
    ch.setFormatter(formatter)

    logger.addHandler(ch)
    return logger

def str_to_bool(value: str) -> bool:
    return value.lower() in ("true", "1", "yes") if value else False

def read_emails() -> List[str]:
    filename = "emails.txt"
    emails: List[str] = []
    try:
        with open(filename, "r") as f:
            emails = [line.strip() for line in f if line.strip()]
    except FileNotFoundError:
        print(f"File {filename} not found.")
    return emails