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

    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "error": "No JSON data received."
            }), 400
        message = data.get("message", "").strip()

        if not message:
            return jsonify({
                "error": "Message cannot be empty."
            }), 400

        print("\n==============================")
        print("USER MESSAGE:")
        print(message)
        print("==============================")

        response = bot.ask(message)

        if response is None:
            return jsonify({
                "error": "AI returned an empty response."
            }), 500

        print("\nAI RESPONSE RECEIVED")
        print("==============================")

        return jsonify({
            "response": response
        })

    except Exception as e:

        import traceback

        print("\n========== CHAT ERROR ==========")
        traceback.print_exc()
        print("================================")

        return jsonify({
            "error": str(e)
        }), 500

if __name__ == "__main__":
    app.run(
        debug=True,
        port=5001
    )