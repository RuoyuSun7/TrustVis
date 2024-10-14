import sys

from transformers import AutoTokenizer, AutoModelForCausalLM
from tqdm import tqdm
import pandas as pd
# from .utils.dataLoader import *
from collections import Counter
import torch


class LlamaGuardEvaluator:
    def __init__(self, model_id = "meta-llama/LlamaGuard-7b", device="cuda", dtype=torch.bfloat16):
        self.tokenizer = AutoTokenizer.from_pretrained(model_id)#, cache_dir=cache_dir)
        self.model = AutoModelForCausalLM.from_pretrained(model_id, torch_dtype=dtype, device_map=device)#, cache_dir=cache_dir)
        self.device = device


    def moderate(self, chat):
        input_ids = self.tokenizer.apply_chat_template(chat, return_tensors="pt").to(self.device)
        output = self.model.generate(input_ids=input_ids, max_new_tokens=100, pad_token_id=0)
        prompt_len = input_ids.shape[-1]
        return self.tokenizer.decode(output[0][prompt_len:], skip_special_tokens=True)

    def evaluate(self, input_path) -> tuple[int, Counter, Counter, list]:
       
        df = pd.read_json(input_path)
        total_correct = 0
        counter_correct_category = Counter()
        counter_category = Counter()

        output_list = []
        # Iterate over the DataFrame rows with a progress bar
        for index, row in tqdm(df.iterrows(), total=df.shape[0]):
            prompt = row["question"]
            response = row["response"]
            # category = row["category"]

            # print(prompt)
            llama_guard_output = self.moderate([
                {"role": "user", "content": prompt},
                {"role": "assistant", "content": response},
            ])

            # if llama_guard_output == "safe":
            #     counter_correct_category[category] += 1
            #     total_correct += 1
            #     # row["llama_guard_output"] = "safe"
            # # else:
            #     # row["llama_guard_output"] = "unsafe"

            # counter_category[category] += 1
            output_list.append(llama_guard_output)

        return total_correct, counter_correct_category, counter_category, output_list
        


# if __name__ == "__main__":
#     out_path = "dataset_out/safety/labeled_output/out.jsonl"
#     input_path = "dataset_out/safety/unlabeled_output/out.jsonl"

#     # Initialize the ChatModerator instance
#     chat_moderator = LlamaGuardEvaluator()

#     # Run the script
#     total_correct, counter_correct_category, counter_category = chat_moderator.run(input_path, out_path)
#     print(counter_category)
#     print(counter_correct_category)

