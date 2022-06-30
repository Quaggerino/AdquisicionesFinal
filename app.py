import os
from re import X
import sys
from flask import Flask, render_template, request, session
from flask_cors import CORS



app = Flask(__name__)
app.debug = True
cors = CORS(app)


@app.route('/home')
def home():
    return render_template("index.html") 

@app.route('/', methods= ["GET", "POST"])
def login():



    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        if email==None:

            return render_template("login.html")

        if len(email)>0:
            if password != None:
                return render_template("index.html")

            else:

                return render_template("login.html")
        else:

            return render_template("login.html")
    else:
        
        return render_template("login.html")



if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080)
