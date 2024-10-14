import torch
import pandas as pd
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from tqdm import tqdm
import os
import logging

# Set logging level for transformers library to WARNING
logging.getLogger("transformers").setLevel(logging.WARNING)

class LongformerEvaluator:
    def __init__(self, model_name="LibrAI/longformer-harmful-ro", device="cuda"):
        self.device = torch.device(device if torch.cuda.is_available() else "cpu")
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForSequenceClassification.from_pretrained(model_name).to(self.device)
        # print(f"Model loaded on {self.device}")

    def process_file(self, input_path):
        # Load annotated responses
        #annotated_responses = pd.read_csv(input_path, encoding='latin1')
        annotated_responses = pd.read_json(input_path, encoding='latin1')
        # Concatenate 'question' and 'response' columns to form 'text' for prediction
        annotated_responses['text'] = annotated_responses.apply(lambda row: row['question'] + ' [SEP] ' + row['response'], axis=1)
    
        return annotated_responses['text']
    
    def evaluate(self, input_file):
        # Process file to get texts for prediction
        texts = self.process_file(input_file)
        
        # List to store predictions
        all_predictions = []
        
        # Use tqdm to add a progress bar
        with tqdm(total=len(texts), desc="Predicting") as pbar:
            # Loop through each text
            for text in texts:
                # Tokenize input text
                inputs = self.tokenizer(text, return_tensors="pt")
                
                # Move inputs to GPU
                inputs = {key: value.to(self.device) for key, value in inputs.items()}
                # print(f"Inputs moved to {self.device}")

                # Perform inference
                with torch.no_grad():
                    outputs = self.model(**inputs)

                # Get predicted class label
                predicted_class = torch.argmax(outputs.logits, dim=1).item()

                # Store predicted class label
                all_predictions.append(predicted_class)

                # Update progress bar
                pbar.update(1)
        
        return all_predictions

def run(input_path, output_path):
    # Initialize evaluators with model names and move models to GPU
    harmful_evaluator = LongformerEvaluator("LibrAI/longformer-harmful-ro")
    action_evaluator = LongformerEvaluator("LibrAI/longformer-action-ro")
    
    # Predict using each evaluator
    harmful_predictions = harmful_evaluator.predict(input_path)
    action_predictions = action_evaluator.predict(input_path)
    
    # Read input file
    pd1 = pd.read_csv(input_path, encoding='latin1')

    # Update DataFrame with predictions
    for i, pred in enumerate(harmful_predictions):
        if pd.isna(pd1.loc[i, 'Longformer_harmful']):  
            pd1.loc[i, 'Longformer_harmful'] = pred 
    
    for i, pred in enumerate(action_predictions):
        if pd.isna(pd1.loc[i, 'Longformer_action']):  
            pd1.loc[i, 'Longformer_action'] = pred 
    
    # Save updated DataFrame to output path
    pd1.to_json(output_path, index=False)

# # Example usage
# if __name__ == "__main__":
#     output_folder = 'dataset_out/safety/longformer'
#     output_file = 'ChatGPT.csv'
#     output_path = os.path.join(output_folder, output_file)
#     run('dataset/safety/Merged/ChatGPT-Merged.json', output_path)
