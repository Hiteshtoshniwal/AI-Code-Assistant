from google import genai
from config import GEMINI_API_KEY
from prompt import SYSTEM_PROMPT

client = genai.Client(api_key=GEMINI_API_KEY)

class AIChatBot:

    def ask(self, message):
        try:
            prompt = f"""{SYSTEM_PROMPT}

User request:
{message}
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