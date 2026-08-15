from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

from chatbot import AIChatBot

app = Flask(__name__)
CORS(app)

bot = AIChatBot()


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    message = data.get("message", "")

    response = bot.ask(message)

    return jsonify({
        "response": response
    })


if __name__ == "__main__":
    app.run(debug=True, port=5001)