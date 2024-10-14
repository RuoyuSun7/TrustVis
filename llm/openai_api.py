import time
import openai
from utils.utils import info_data

def gpt_chat(message, model="gpt-3.5-turbo", num_retries=1):
    client = openai.OpenAI(
        api_key = info_data['OpenAI']
    )
    for _ in range(num_retries):
        try:
            stream = client.chat.completions.create(
                model=model,
                messages=[{"role": "user", "content": message}],
                stream = True
            )
            collected_messages = []
            result = ''
            for chunk in stream:
                chunk_message = chunk.choices[0].delta.content
                collected_messages.append(chunk_message)
            result = [m for m in collected_messages if m is not None]
            return ''.join(result)
        except openai.OpenAIError as exception:
            print(f"{exception}. Retrying...")
            time.sleep(6)
    return ''