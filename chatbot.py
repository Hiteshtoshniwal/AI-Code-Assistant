from google import genai
from config import GEMINI_API_KEY
from prompt import SYSTEM_PROMPT

import time

client = genai.Client(api_key=GEMINI_API_KEY)


class AIChatBot:

    def ask(self, message):

        prompt = f"""{SYSTEM_PROMPT}

User request:
{message}
"""

        max_retries = 3

        for attempt in range(max_retries):

            try:

                response = client.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=prompt
                )

                return response.text

            except Exception as e:

                print(f"Gemini API error (attempt {attempt + 1}/{max_retries}):")
                print(e)

                # Retry temporary server errors
                if "503" in str(e) or "UNAVAILABLE" in str(e):

                    if attempt < max_retries - 1:

                        wait_time = 2 ** attempt

                        print(
                            f"Gemini temporarily unavailable. "
                            f"Retrying in {wait_time} seconds..."
                        )

                        time.sleep(wait_time)

                    else:

                        return (
                            "Gemini is temporarily unavailable because "
                            "the model is experiencing high demand. "
                            "Please try again in a few moments."
                        )

                else:
                    raise e