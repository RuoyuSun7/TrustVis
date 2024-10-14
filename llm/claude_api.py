import sys

sys.path.append('/home/tianyuchen/LLM_Testing/LLM-Testing-Framework') # Your Root Directory
import time
import anthropic 
from utils.utils import info_data

def claude_chat(message, model="claude-3-opus-20240229", num_retries=2):
    client = anthropic.Anthropic(
        # Specify your API key here or use os.environ.get("ANTHROPIC_API_KEY") to retrieve it from environment variables
        api_key=info_data['Anthropic']
    )
    for _ in range(num_retries):
        try:
            response = client.messages.create(
                model=model,
                max_tokens=1024,
                messages=[
                    {"role": "user", "content": message}
                ]
            )
            # Extracting response from message
            return response.content[0].text
        except anthropic.AnthropicError as exception:
            print(f"{exception}. Retrying...")
            time.sleep(6)
    return ''
