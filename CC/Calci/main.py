from flask import Flask, request

app = Flask(__name__)

@app.route("/")
def home():
    return """

    <!DOCTYPE html>
    <html>

    <head>

        <title>Phone Style Calculator</title>

        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <style>

            *{
                margin:0;
                padding:0;
                box-sizing:border-box;
                font-family:Arial;
            }

            body{
                background:#111;
                height:100vh;
                display:flex;
                justify-content:center;
                align-items:center;
            }

            .phone{

                width:340px;
                background:black;
                border-radius:35px;
                padding:20px;
                box-shadow:
                0 0 20px rgba(255,255,255,0.1),
                0 0 50px rgba(0,0,0,0.8);

            }

            .display{

                width:100%;
                height:120px;
                border:none;
                outline:none;
                background:black;
                color:white;
                text-align:right;
                font-size:48px;
                padding:20px;
                margin-bottom:15px;

            }

            .buttons{

                display:grid;
                grid-template-columns:repeat(4,1fr);
                gap:12px;

            }

            button{

                height:70px;
                border:none;
                border-radius:50%;
                font-size:26px;
                cursor:pointer;
                transition:0.2s;

            }

            button:active{
                transform:scale(0.95);
            }

            .gray{
                background:#a5a5a5;
                color:black;
            }

            .dark{
                background:#333;
                color:white;
            }

            .orange{
                background:#ff9f0a;
                color:white;
            }

            .zero{
                grid-column:span 2;
                border-radius:40px;
                text-align:left;
                padding-left:28px;
            }

        </style>

    </head>

    <body>

        <div class="phone">

            <input type="text" id="display"
            class="display" readonly>

            <div class="buttons">

                <button class="gray"
                onclick="clearDisplay()">AC</button>

                <button class="gray"
                onclick="append('%')">%</button>

                <button class="gray"
                onclick="append('/')">÷</button>

                <button class="orange"
                onclick="append('/')">÷</button>

                <button class="dark"
                onclick="append('7')">7</button>

                <button class="dark"
                onclick="append('8')">8</button>

                <button class="dark"
                onclick="append('9')">9</button>

                <button class="orange"
                onclick="append('*')">×</button>

                <button class="dark"
                onclick="append('4')">4</button>

                <button class="dark"
                onclick="append('5')">5</button>

                <button class="dark"
                onclick="append('6')">6</button>

                <button class="orange"
                onclick="append('-')">−</button>

                <button class="dark"
                onclick="append('1')">1</button>

                <button class="dark"
                onclick="append('2')">2</button>

                <button class="dark"
                onclick="append('3')">3</button>

                <button class="orange"
                onclick="append('+')">+</button>

                <button class="dark zero"
                onclick="append('0')">0</button>

                <button class="dark"
                onclick="append('.')">.</button>

                <button class="orange"
                onclick="calculate()">=</button>

            </div>

        </div>

        <script>

            function append(value){

                document.getElementById("display").value += value;

            }

            function clearDisplay(){

                document.getElementById("display").value = "";

            }

            function calculate(){

                let exp =
                document.getElementById("display").value;

                fetch('/calculate?exp=' + encodeURIComponent(exp))

                .then(response => response.text())

                .then(data => {

                    document.getElementById("display").value = data;

                });

            }

        </script>

    </body>

    </html>

    """

@app.route("/calculate")
def calculate():

    exp = request.args.get("exp")

    try:

        result = eval(exp)
        return str(result)

    except:

        return "Error"

if __name__ == "__main__":

    app.run(host="0.0.0.0", port=8080)