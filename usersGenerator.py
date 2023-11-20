
from faker import Faker
import json as JS
import requests as req

file = open('USERS.info', 'w')

BASE_URI = 'http://localhost:9090'

def verifyUser(otpCode: str, userToken: str, newPassword: str):
    res = req.post(f'{BASE_URI}/api/auth/verification', 
    data = {
        "otpCode": int(otpCode),
        "password": str(newPassword),
        "confirmPassword": str(newPassword),
    },
    cookies={
        "newUserVerificationInfo": str(userToken)
    }).json()
    #print(f"\nUserId -> {res['User'][0]['user_id']}")

def signinUser():
    date = Faker().date().split('-')
    if (int(date[0]) > 2010):
        date[0] = "2003"
    email = Faker().ascii_email()
    username = Faker().first_name()
    password = Faker().password() + Faker().word()
    
    res = req.post(f'{BASE_URI}/api/auth/signup', data={
        "email" : str(email),
        "username" : str(username),
        "date" : str(f"{date[1]}/{date[2]}/{date[0]}"),
    })
    newUserToken = (res.cookies.values())[0]
    otpCode = (res.json())['user_otp']
    
    verifyUser(otpCode, newUserToken, password)

    file.write(f"{email} -> {password}\n")

for _ in range(100):
    signinUser()

file.close()


