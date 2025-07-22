from flask_limiter.util import get_remote_address
from flask import Flask, request, jsonify
from flask_limiter import Limiter
from .utils import get_logger
from flask_cors import CORS
from logging import Logger
from .service.smtp import send_email_smtp, get_email_content, MessageType
from .service.dto import *

logger: Logger = get_logger()
app: Flask = Flask(__name__)

# Разрешаем CORS для всех источников
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    return response

limiter: Limiter = Limiter(
    key_func=get_remote_address,
    app=app,
    default_limits=["10 per minute"]
)

@app.route("/feedback-call", methods=["POST"])
@limiter.limit("5/minute")
def feedback_call():
    data = request.get_json()
    try:
        dto = FeedBackCallDTO(**data)
    except TypeError as e:
        logger.error(f"Invalid data for feedback-call: {e}")
        return jsonify({"error": "Invalid data"}), 400

    logger.info(f"Feedback call: {dto}")

    try:
        subject, body_text, body_html = get_email_content(MessageType.FEEDBACK, dto)
        send_email_smtp(subject, body_text, body_html)
    except Exception as e:
        logger.error(f"Failed to send email for feedback-call: {e}")

    return jsonify({"status": "success"}), 200


@app.route("/message", methods=["POST"])
@limiter.limit("5/minute")
def message():
    data = request.get_json()
    try:
        dto = MessageDTO(**data)
    except TypeError as e:
        logger.error(f"Invalid data for message: {e}")
        return jsonify({"error": "Invalid data"}), 400

    logger.info(f"Message: {dto}")

    try:
        subject, body_text, body_html = get_email_content(MessageType.MESSAGE, dto)
        send_email_smtp(subject, body_text, body_html)
    except Exception as e:
        logger.error(f"Failed to send email for message: {e}")

    return jsonify({"status": "success"}), 200


@app.route("/calc-delivery", methods=["POST"])
@limiter.limit("5/minute")
def calc_delivery():
    data = request.get_json()
    try:
        dto = DeliverCalcDTO(**data)
    except TypeError as e:
        logger.error(f"Invalid data for calc-delivery: {e}")
        return jsonify({"error": "Invalid data"}), 400

    logger.info(f"Delivery calc: {dto}")

    try:
        subject, body_text, body_html = get_email_content(MessageType.DELIVERY_CALC, dto)
        send_email_smtp(subject, body_text, body_html)
    except Exception as e:
        logger.error(f"Failed to send email for calc-delivery: {e}")

    return jsonify({"status": "success"}), 200

@app.route("/phone-number", methods=["POST"])
@limiter.limit("5/minute")
def phone_number():
    data = request.get_json()
    try:
        dto = PhoneNumberDTO(**data)
    except TypeError as e:
        logger.error(f"Invalid data for phone-number: {e}")
        return jsonify({"error": "Invalid data"}), 400

    logger.info(f"Phone number received: {dto.number}")

    try:
        subject, body_text, body_html = get_email_content(MessageType.PHONE_CALL, dto)
        send_email_smtp(subject, body_text, body_html)
    except Exception as e:
        logger.error(f"Failed to send email for phone-number: {e}")
        return jsonify({"error": "Email sending failed"}), 500

    return jsonify({"status": "success"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
