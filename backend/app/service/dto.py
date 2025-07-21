from pydantic import BaseModel, EmailStr

class FeedBackCallDTO(BaseModel):
    name: str
    phone: str

class DeliverCalcDTO(BaseModel):
    direction: str
    weight: float
    dimension: float
    cargo_type: str
    car_option: str
    phone_number: str

class MessageDTO(BaseModel):
    name: str
    phone: str
    email: EmailStr
    msg: str

class PhoneNumberDTO(BaseModel):
    number: str
