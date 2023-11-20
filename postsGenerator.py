import requests as req
import faker as fk
fk = fk.Faker()

dicUsers = {
    "johnperkins@gmail.com" : "^iBTPNH2Q6husband",
    "pughbrittany@rios-thomas.biz" : "%4&#NZ7l^6first",
    "kendra81@yahoo.com" : "XS9MRFVxX(next",
    "kevingreene@gmail.com" : "1k*5RtlNuHtoo",
    "destiny13@powell.net" : "qlMxf6x*@6security",
    "gibsontara@wilson.com" : "R2NdMmrW_Carm",
    "caseysullivan@davies.com" : "r%t0EJl73@south",
    "huntsarah@gmail.com" : "(1D%Rq_1JYconcern",
    "vanessa26@robertson.net" : "^49WrRkxs2ten",
    "sandovalrobert@yahoo.com" : "r&t_6XqTZCwind",
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


