import os
import sys
import numpy as np
from LlamaGuard import *
from Longformer import *
from Perspective import *
import json
def save_to_json_line_by_line(df, output_path):
    # Open the output file in write mode
    with open(output_path, 'w') as outfile:
        # Write the opening bracket for the JSON array
        outfile.write('[')

        # Iterate over the DataFrame rows with a progress bar
        for index, row in tqdm(df.iterrows(), total=df.shape[0], desc='Saving Json file'):
            # Convert the row to a dictionary
            row_dict = row.to_dict()

            # Write the dictionary as a JSON object to the file
            json.dump(row_dict, outfile)

            # Write a comma and newline if it's not the last row
            if index < df.shape[0] - 1:
                outfile.write(',\n')

        # Write the closing bracket for the JSON array
        outfile.write(']')

def  safety_eval(model):

    # input_file = 'dataset/safety/Merged/ChatGPT-Merged.json'
    input_file = f'dataset/safety/Merged/{model}-Merged.json'
    output_folder = 'dataset_out/safety/labeled_output'
    #output_file = os.path.basename(input_file)
    output_file = f'{model}-evaluated.json'
    output_path = os.path.join(output_folder, output_file)


    evaluator_longformer_harm = LongformerEvaluator('LibrAI/longformer-harmful-ro')
    harmful_evaluations = evaluator_longformer_harm.evaluate(input_file)
    evaluator_longformer_action = LongformerEvaluator('LibrAI/longformer-action-ro')
    action_evaluations = evaluator_longformer_action.evaluate(input_file)
    evaluator_LlamaGuard = LlamaGuardEvaluator()
    _,_,_,llamaGuard_evaluations = evaluator_LlamaGuard.evaluate(input_file)
    evaluator_LlamaGuard2 = LlamaGuardEvaluator("meta-llama/Meta-Llama-Guard-2-8B")
    _,_,_,llamaGuard2_evaluations = evaluator_LlamaGuard2.evaluate(input_file)
    # evaluator_perpective = PerspectiveEvaluator()
    df = pd.read_json(input_file, encoding='latin1')
    
    # Update DataFrame with predictions
    for i, pred in enumerate(harmful_evaluations):
        if pd.isna(df.loc[i, 'Longformer_harmful']):  
            df.loc[i, 'Longformer_harmful'] = pred 
    
    for i, pred in enumerate(action_evaluations):
        if pd.isna(df.loc[i, 'Longformer_action']):  
            df.loc[i, 'Longformer_action'] = pred 
  
    for i, pred in enumerate(llamaGuard_evaluations):
        if pd.isna(df.loc[i, 'llama_guard_output']) or df.loc[i, 'llama_guard_output'] == None:  
            df.loc[i, 'llama_guard_output'] = pred 
    
    df['llama_guard2_output'] = None
    for i, pred in enumerate(llamaGuard2_evaluations):
        if pd.isna(df.loc[i, 'llama_guard2_output']) or df.loc[i, 'llama_guard2_output'] == None:  
            df.loc[i, 'llama_guard2_output'] = pred 

    save_to_json_line_by_line(df, output_path)

def robustness_eval(model):
    # sucess
    input_file = f'dataset/Robustness/Merged/{model}-main.json'

    output_folder = 'dataset_out/Robustness/Merged'
    output_file = f'{model}-main-evaluated.json'
    output_path = os.path.join(output_folder, output_file)
    df = pd.read_json(input_file, encoding='utf-8')
    df['Longformer_output'] = None
    df['llama_guard_output'] = None
    df['llama_guard2_output'] = None
    
    evaluator_longformer_harm = LongformerEvaluator('LibrAI/longformer-harmful-ro')
    harmful_evaluations = evaluator_longformer_harm.evaluate(input_file)
    evaluator_LlamaGuard = LlamaGuardEvaluator()
    _,_,_,llamaGuard_evaluations = evaluator_LlamaGuard.evaluate(input_file)
    evaluator_LlamaGuard2 = LlamaGuardEvaluator("meta-llama/Meta-Llama-Guard-2-8B")
    _,_,_,llamaGuard2_evaluations = evaluator_LlamaGuard2.evaluate(input_file)
    df['MLC_taxonomy'] = None
    for i, pred in enumerate(harmful_evaluations):
        df.loc[i, 'Longformer_output'] = pred 
    for i, pred in enumerate(llamaGuard_evaluations):
        df.loc[i, 'llama_guard_output'] = pred 
    for i, pred in enumerate(llamaGuard2_evaluations):
        df.loc[i, 'llama_guard2_output'] = pred
        if 'unsafe' in pred:
            content_after_newline = pred.split('\n')[1]
            df.loc[i, 'MLC_taxonomy'] = content_after_newline
            # Use .loc to assign the value correctly
            # df.loc[df['prompt'] == df.loc[i, 'prompt'], 'MLC_taxonomy'] = content_after_newline
    for i, row in df.iterrows():
        if row['MLC_taxonomy'] is not None:
            df.loc[df['prompt'] == row['prompt'], 'MLC_taxonomy'] = row['MLC_taxonomy']

    save_to_json_line_by_line(df, output_path)
# safety_eval('ChatGPT')

# safety_eval('vicuna-7b')

safety_eval('llama2_7b-chat')

#robustness_eval('llama2-7b-chat')