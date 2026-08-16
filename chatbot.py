from google import genai
from config import GEMINI_API_KEY
from prompt import SYSTEM_PROMPT

client = genai.Client(api_key=GEMINI_API_KEY)


class AIChatBot:

    def ask(self, message, history=None):
        try:

            if history is None:
                history = []

            conversation = ""

            for item in history:

                role = item.get("role")
                content = item.get("content", "")

                if role == "user":
                    conversation += f"""
User:
{content}

"""

                elif role == "assistant":
                    conversation += f"""
AI Assistant:
{content}

"""

            conversation += f"""
User:
{message}
"""

            prompt = f"""
{SYSTEM_PROMPT}

{conversation}

Answer the user's latest request using the relevant
previous conversation as context.

If the user refers to previous code using phrases such as
"this code", "above code", "modify it", "edit it",
"change it", or "fix it", use the relevant code from
the conversation history.

Do not ask the user to provide the code again if it is
already available in the conversation.

AI Assistant:
"""
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt
            )

            print(response)

            return response.text

        except Exception as e:

            import traceback
            traceback.print_exc()

            raise e