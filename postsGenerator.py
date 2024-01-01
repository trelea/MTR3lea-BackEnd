import requests as req
import faker as fk
fk = fk.Faker()

dicUsers = {
    "richardbaker@hotmail.com" : "%_6p4CrH5_choose",
    "michaelwise@yahoo.com" : "V&5+Ms#ptRdinner",
    "stacey45@miller-rose.com" : "%rLw&VKhV0minute",
    "richarddavid@bennett-curry.biz" : "0QfA#dbu*won",
    "bsimmons@gmail.com" : "*2fO#grgSDask",
    "gonzalezevan@yahoo.com" : "8uRHlgfs#Omust",
    "erik39@graves.com" : "o61+Y*jwd&country",
    "thompsonjon@hotmail.com" : "$0Gy2LMn)kblue",
    "austingina@gmail.com" : "%qQ74tykI0interest"
}

def login(email: str, pswd: str):
    body = {
        "email" : str(email),
        "password" : str(pswd)
    }
    r = req.post('http://localhost:9090/api/auth/signin', data=body).json()
    return [r['user_token'], r['user_name']]

def postPost(token: str, user: str, title: str, description: str):
    body = {
        "title" : f'{title}',
        "description" : f'{description}'
    }
    cookies = {
        'User' : f'{user}',
        'SecretToken' : f'{token}'
    }
    r = req.post('http://localhost:9090/api/content/', cookies=cookies, data=body)
    print(r.json())



for _ in dicUsers:
    for a in range(1):
        userCredentials = login(_, dicUsers[_])
        postPost( 
            userCredentials[0],
            userCredentials[1],
            f'{str(fk.paragraph())}',
            f'{str(fk.text() + fk.text() + fk.text() + fk.text())}'
        )
    for b in range(3):
        userCredentials = login(_, dicUsers[_])
        postPost( 
            userCredentials[0],
            userCredentials[1],
            f'{str(fk.paragraph())}',
            f'{str(fk.text() + fk.text() + fk.text() + fk.text())}'
        )
    for c in range(5):
        userCredentials = login(_, dicUsers[_])
        postPost( 
            userCredentials[0],
            userCredentials[1],
            f'{str(fk.paragraph())}',
            f'{str(fk.text() + fk.text() + fk.text() + fk.text())}'
        )


