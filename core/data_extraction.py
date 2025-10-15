import sys
import os
cur_root_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(cur_root_path)
from utils.data_processor import concat_dataframes, mapping_df, extract_AutoDAN_data_robustness, extract_hallucination_data
import pandas as pd

def save_to_json_robustness(save_df, output_file):
# Assuming df is your DataFrame and 'output_file.json' is the file path to save the JSON data

    output_path = os.path.join(cur_root_path, 'dataset/Robustness/Merged', output_file)
    # Write the DataFrame to a JSON file
    save_df.to_json(output_path, orient='records')


def extract_safety(model:str):
    concatenated_df = concat_dataframes(model)
    mapped_df = mapping_df(concatenated_df)
    out_file = f'{model}-Merged.json'
    output_path = os.path.join(cur_root_path, 'dataset/safety/Merged/', out_file)
    # Write the DataFrame to a JSON file
    mapped_df.to_json(output_path, orient='records')

def extract_robustness(model:str):
    df_AutoDAN_all, df_AutoDAN_success, df_AutoDAN_main = extract_AutoDAN_data_robustness(model=model)
    save_to_json_robustness(df_AutoDAN_all, f'{model}-all.json')
    save_to_json_robustness(df_AutoDAN_success, f'{model}-success.json')
    save_to_json_robustness(df_AutoDAN_main, f'{model}-main.json')
    print('extraction done')

def extract_hallucination(model:str):
    data_path = 'dataset/Halucination/FELM/05-17-12-10-27_847gpt-3.5-turbo.csv'
    df_csv = pd.read_csv(data_path)
    df_all = pd.read_json('dataset/Halucination/FELM/all.jsonl', lines=True)
    df_FELM = extract_hallucination_data(df_csv=df_csv, df_all=df_all)
    out_file = f'{model}-Merged.json'
    output_path = os.path.join(cur_root_path, 'dataset/Halucination/Merged/', out_file)
    df_FELM.to_json(output_path, orient='records')
    print('extraction done')
    
# extract_safety('ChatGPT')
extract_robustness('llama2-7b-chat')
#extract_hallucination('ChatGPT')