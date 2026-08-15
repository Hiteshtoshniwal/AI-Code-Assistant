# AI Code Assistant
# 🤖 AI Code Assistant

An AI-powered coding assistant that helps developers understand, generate, debug, and improve code using **Google Gemini API**.

The application provides a simple web-based chat interface where users can ask programming-related questions and receive AI-generated explanations, solutions, and code.

## 🚀 Features

* 💬 AI-powered coding chat assistant
* 🧑‍💻 Generate code from natural-language prompts
* 🐛 Debug and explain existing code
* 📚 Explain programming concepts
* 🔄 Improve and optimize code
* 📝 Markdown-formatted AI responses
* 💻 Syntax highlighting for code blocks
* 📋 Copy code directly from AI responses
* 🌐 Web-based user interface
* 🔐 Environment-variable based API key configuration
* ⚡ Flask backend with a simple frontend

## 🛠️ Tech Stack

### Backend

* Python
* Flask
* Flask-CORS
* Google Gemini API

### Frontend

* HTML5
* CSS3
* JavaScript
* Marked.js
* Highlight.js

### AI

* Google Gemini

## 📁 Project Structure

```text
AI Code Assistant/
│
├── app.py                  # Flask application
├── chatbot.py              # Gemini API integration
├── config.py               # Configuration and environment variables
├── requirements.txt        # Python dependencies
├── .env                    # API credentials (not committed)
├── .gitignore
│
├── templates/
│   └── index.html          # Main application page
│
└── static/
    ├── style.css           # Application styling
    └── script.js           # Frontend JavaScript
```

> The project structure may change as the application is further developed.

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Move into the project directory:

```bash
cd AI-Code-Assistant
```

### 2. Create a virtual environment

Windows:

```powershell
python -m venv venv
```

Activate it:

```powershell
venv\Scripts\activate
```

### 3. Install dependencies

```powershell
pip install -r requirements.txt
```

### 4. Configure the Gemini API key

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_api_key_here
```

**Never commit your `.env` file to GitHub.**

Make sure `.gitignore` contains:

```text
.env
__pycache__/
*.pyc
venv/
.venv/
```

### 5. Run the application

```powershell
python app.py
```

The application will start on the configured Flask port.

Open the URL displayed in the terminal in your browser.

## 💡 Example Prompts

You can ask the assistant questions such as:

```text
Explain Python decorators with an example.
```

```text
Find the bug in this Python code.
```

```text
Write a binary search algorithm in Python.
```

```text
Explain the time and space complexity of this solution.
```

```text
Optimize this code for better performance.
```

## 🔑 Environment Variables

The application uses environment variables to protect sensitive credentials.

| Variable         | Description           |
| ---------------- | --------------------- |
| `GEMINI_API_KEY` | Google Gemini API key |

Do not expose API keys directly inside your Python source code or upload them to GitHub.

## 🔄 How It Works

```text
User
  │
  ▼
Web Interface
  │
  ▼
Flask Backend
  │
  ▼
Chatbot / Gemini Integration
  │
  ▼
Google Gemini API
  │
  ▼
AI Generated Response
  │
  ▼
Web Interface
```

## 🎯 Project Goals

The goal of this project is to build an intelligent coding assistant capable of helping developers with everyday programming tasks such as:

* Learning programming
* Writing code
* Debugging
* Code explanation
* Problem solving
* Code optimization
* Understanding algorithms and data structures

## 🔮 Future Improvements

* [ ] User authentication
* [ ] Persistent chat history
* [ ] Multiple conversations
* [ ] New Chat functionality
* [ ] User settings
* [ ] Dark/light mode persistence
* [ ] File upload and code analysis
* [ ] Support for multiple AI models
* [ ] Conversation export
* [ ] Improved code execution capabilities
* [ ] Deployment to a cloud platform

## 🔐 Security

API keys and other sensitive information should never be committed to the repository.

Use environment variables through `.env` and keep `.env` listed in `.gitignore`.

If an API key is accidentally pushed to GitHub, revoke/rotate the key immediately.

## 👨‍💻 Author

**Hitesh Toshniwal**

CSE – Artificial Intelligence & Machine Learning

## ⭐ Contributing

Contributions, suggestions, and improvements are welcome.

If you find a bug or have an idea for improving the project, feel free to open an issue or submit a pull request.

## 📄 License

This project is intended for educational and development purposes.
