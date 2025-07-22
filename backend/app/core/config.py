from pydantic_settings import BaseSettings
from ..utils import str_to_bool
import dotenv
import os

dotenv.load_dotenv(".env")

class SmtpConfig(BaseSettings):
    mail_username: str
    mail_password: str
    mail_from: str
    mail_port: int
    mail_server: str
    mail_tls: bool
    mail_ssl: bool

    class Config:
        env_file = ".env"

smtp_config: SmtpConfig = SmtpConfig(
    mail_username=os.getenv("MAIL_USERNAME"),
    mail_password=os.getenv("MAIL_PASSWORD"),
    mail_from=os.getenv("MAIL_FROM"),
    mail_port=int(os.getenv("MAIL_PORT", 587)),
    mail_server=os.getenv("MAIL_SERVER"),
    mail_tls=str_to_bool(os.getenv("MAIL_TLS")),
    mail_ssl=str_to_bool(os.getenv("MAIL_SSL")),
)

def get_smtp_config() -> SmtpConfig:
    return smtp_config
