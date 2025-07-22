import smtplib
from enum import Enum, auto
from typing import List
from pydantic import BaseModel
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from ..service.dto import *
from ..core.config import SmtpConfig
from ..utils import read_emails

EMAILS: List[str] = read_emails()
smtp_config = SmtpConfig()

class MessageType(Enum):
    DELIVERY_CALC = auto()
    MESSAGE = auto()
    FEEDBACK = auto()
    PHONE_CALL = auto()

def get_email_content(message_type: MessageType, dto: BaseModel) -> tuple[str, str, str]:
    if message_type == MessageType.FEEDBACK:
        data: FeedBackCallDTO = dto
        subject = "Wohlfahrt - Швидкий дзвінок"
        phone = data.phone  # исправлено здесь
        body_text = f"Користувач {data.name} просить передзвонити за номером: {phone}"

        body_html = f"""
        <html>
            <body>
                <h2>Швидкий дзвінок</h2>
                <p><strong>Користувач:</strong> {data.name}</p>
                <p><strong>Номер телефону для зв'язку:</strong> <a href="tel:{phone}">{phone}</a></p>
                <hr>
                <p>Це повідомлення автоматично сформоване системою Wohlfahrt.</p>
            </body>
        </html>
        """

    elif message_type == MessageType.DELIVERY_CALC:
        data: DeliverCalcDTO = dto
        phone = data.phone_number if data.phone_number else "Не вказано"  # исправлено здесь
        subject = "Wohlfahrt - Розрахунок доставки"
        body_text = (
            f"Запит на розрахунок доставки:\n"
            f"Напрямок: {data.direction}\n"
            f"Вага: {data.weight}\n"
            f"Розміри: {data.dimension}\n"
            f"Тип вантажу: {data.cargo_type}\n"
            f"Опції автомобіля: {data.car_option}\n"
            f"Телефон клієнта: {phone}"
        )

        body_html = f"""
        <html>
            <body>
                <h2>Розрахунок доставки</h2>
                <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
                    <tr><th>Напрямок</th><td>{data.direction}</td></tr>
                    <tr><th>Вага</th><td>{data.weight}</td></tr>
                    <tr><th>Розміри</th><td>{data.dimension}</td></tr>
                    <tr><th>Тип вантажу</th><td>{data.cargo_type}</td></tr>
                    <tr><th>Опції автомобіля</th><td>{data.car_option}</td></tr>
                    <tr><th>Телефон клієнта</th><td><a href="tel:{phone}">{phone}</a></td></tr>
                </table>
                <hr>
                <p>Це повідомлення автоматично сформоване системою Wohlfahrt.</p>
            </body>
        </html>
        """

    elif message_type == MessageType.MESSAGE:
        data: MessageDTO = dto
        phone = data.phone  # исправлено здесь
        subject = "Wohlfahrt - Повідомлення"
        body_text = (
            f"Користувач {data.name} залишив повідомлення.\n"
            f"Телефон: {phone}\n"
            f"Email: {data.email}\n"
            f"Повідомлення:\n{data.msg}"
        )

        msg_html = data.msg.replace('\n', '<br>')

        body_html = f"""
        <html>
            <body>
                <h2>Повідомлення від користувача</h2>
                <p><strong>Ім'я:</strong> {data.name}</p>
                <p><strong>Телефон:</strong> <a href="tel:{phone}">{phone}</a></p>
                <p><strong>Email:</strong> <a href="mailto:{data.email}">{data.email}</a></p>
                <p><strong>Повідомлення:</strong><br>{msg_html}</p>
                <hr>
                <p>Це повідомлення автоматично сформоване системою Wohlfahrt.</p>
            </body>
        </html>
        """

    elif message_type == MessageType.PHONE_CALL:
        data: PhoneNumberDTO = dto
        phone = data.number  # тут оставляем, если DTO имеет поле number
        subject = "Wohlfahrt - Запит на дзвінок"
        body_text = f"Користувач залишив номер телефону: {phone}"

        body_html = f"""
        <html>
            <body>
                <h2>Запит на дзвінок</h2>
                <p><strong>Номер телефону:</strong> <a href="tel:{phone}">{phone}</a></p>
                <hr>
                <p>Це повідомлення автоматично сформоване системою Wohlfahrt.</p>
            </body>
        </html>
        """

    else:
        subject = "Wohlfahrt - Невідомий тип повідомлення"
        body_text = "<НЕВІДОМЕ ПОВІДОМЛЕННЯ>"
        body_html = f"<html><body><p>{body_text}</p></body></html>"

    return subject, body_text, body_html



def send_email_smtp(subject: str, body_text: str, body_html: str):
    SMTP_SERVER = smtp_config.mail_server
    SMTP_PORT = smtp_config.mail_port
    SMTP_LOGIN = smtp_config.mail_username
    SMTP_PASSWORD = smtp_config.mail_password

    if not EMAILS:
        print("ALARM! List with emails is empty.")
        return

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_LOGIN, SMTP_PASSWORD)

            for recipient in EMAILS:
                try:
                    email_message = MIMEMultipart("alternative")
                    email_message["From"] = SMTP_LOGIN
                    email_message["To"] = recipient
                    email_message["Subject"] = subject

                    part1 = MIMEText(body_text, "plain")
                    part2 = MIMEText(body_html, "html")

                    email_message.attach(part1)
                    email_message.attach(part2)

                    server.send_message(email_message)
                    print(f"Message sent: {recipient} with subject: {subject}")
                except Exception as e:
                    print(f"Error with message delivery {recipient}: {e}")

    except Exception as e:
        print(f"Error with SMTP Connection: {e}")
