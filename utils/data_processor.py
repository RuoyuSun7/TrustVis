from utils import set_root_path
import os
import pandas as pd
import re
from utils.MLC import category_to_MLC_mapping, harm_to_MLC_mapping
root_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Safety Extractors

def Extract_DNA_data(model:str):
    df_DNA = pd.read_csv(os.path.join(root_path, 'dataset/safety/Do Not Answer/data_en.csv'))

    # df_DNA.columns.tolist()
    df_DNA_base = df_DNA[['id', 'risk_area', 'types_of_harm', 'specific_harms', 'question', f'{model}_response']]
    # df_DNA_ChatGPT = df_DNA_ChatGPT.rename(columns={'ChatGPT_harmful': 'GPT4_harmful', 'ChatGPT_action':'GPT4_action'})

    df_DNA_GPT4 = pd.read_csv(os.path.join(root_path, f'dataset/safety/Do Not Answer/GPT4/annotated_response_{model}.csv'))
    df_DNA_human = pd.read_csv(os.path.join(root_path, f'dataset/safety/Do Not Answer/Human/annotated_response_{model}.csv'))
    df_DNA_Longformer = pd.read_csv(os.path.join(root_path, f'dataset/safety/Do Not Answer/Longformer/annotated_response_{model}.csv'))

    df_DNA_base.loc[:, ['GPT4_harmful', 'GPT4_action']] = df_DNA_GPT4[['action_review', 'action']].values
    df_DNA_base.loc[:, ['Human_harmful', 'Human_action']] = df_DNA_human[['harmful', 'action']].values
    df_DNA_base.loc[:, ['Longformer_harmful', 'Longformer_action']] = df_DNA_Longformer[['harmful', 'action']].values

    return df_DNA_base

def extract_ALERT_data(model:str):
    file_name = ''
    if model == 'ChatGPT':
        file_name = 'gpt-3.5-turbo-1106.jsonl'
    elif model == 'llama2-7b-chat':
        file_name = 'Llama-2-7b-chat-hf.jsonl'
    elif model == 'vicuna-7b':
        file_name = 'vicuna-7b-v1.5.jsonl'
    else:
        file_name = None
        print('Error loading model: You could only select from ChatGPT, llama2-7b-chat and vicuna-7b')
    # with open(os.path.join(root_path, 'dataset/safety/ALERT/', file_name), 'r') as file:
    #     json_data = file.read()
    # df_ALERT = pd.read_json(json_data)
    df_ALERT= pd.read_json(os.path.join(root_path, 'dataset/safety/ALERT/',file_name), lines=True)
    # Print the DataFrame
    df_ALERT['prompt'] = df_ALERT['prompt'].str.replace('### Instruction:\n', '')
    df_ALERT['prompt'] = df_ALERT['prompt'].str.replace('\n### Response:\n', '')
    df_ALERT = df_ALERT[['id', 'category', 'prompt', 'response', 'llama_guard_output']]
    return df_ALERT

# Merge two safety datasets

def concat_dataframes(model:str):
    df_ALERT = extract_ALERT_data(model)
    df_DNA = Extract_DNA_data(model)
    # unify ids
    df_ALERT[['id']] += len(df_DNA)

    concatenated_df = pd.concat([df_DNA, df_ALERT], ignore_index=True)

    # using prompt, response in ALERT data to fill in the question collumn in DNA dataset
    concatenated_df['question'] = concatenated_df['question'].fillna(concatenated_df['prompt'])
    concatenated_df[f'{model}_response'] = concatenated_df[f'{model}_response'].fillna(concatenated_df['response'])

    # delete response and prompt columns 
    columns_to_delete_Llama=['response', 'prompt']
    concatenated_df = concatenated_df.drop(columns=columns_to_delete_Llama)
    # rename llama2-7b-chat_response to response
    concatenated_df = concatenated_df.rename(columns={f'{model}_response': 'response'})

    # change the position of category
    column_to_move = 'category'
    new_position = 4  # Specify the new position for the column

    other_columns = [col for col in concatenated_df.columns if col != column_to_move]

    new_order = [column_to_move] + other_columns if new_position == 0 else other_columns[:new_position] + [column_to_move] + other_columns[new_position:]
    concatenated_df= concatenated_df[new_order]

    return concatenated_df

def mapping_df(df_uni):
    mapped_df_1 = category_to_MLC_mapping(df_uni)
    mapped_df_2 = harm_to_MLC_mapping(df_uni)

    # Step 2: Fill the NaN values in mapped_df_1['MLC_taxonomy'] with values from mapped_df_2['MLC_taxonomy']
    mapped_df_1['MLC_taxonomy'].fillna(mapped_df_2['MLC_taxonomy'], inplace=True)

    # Step 3: Assign the result to mapped_df
    mapped_df = mapped_df_1

    # change the position of category
    column_to_move = 'MLC_taxonomy'
    new_position = 5  # Specify the new position for the column

    other_columns = [col for col in mapped_df.columns if col != column_to_move]

    new_order = [column_to_move] + other_columns if new_position == 0 else other_columns[:new_position] + [column_to_move] + other_columns[new_position:]
    mapped_df= mapped_df[new_order]

    return mapped_df

def extract_AutoDAN_data_robustness(model:str):

    file_name = ''
    if model == 'ChatGPT':
        file_name = 'gpt-3.5-turbo-1106.jsonl'
    elif model == 'llama2-7b-chat':
        file_name = 'llama2_0_normal.json'
    elif model == 'vicuna-7b':
        file_name = 'vicuna-7b-v1.5_adversarial.jsonl'
    else:
        file_name = None
        print('Error loading model: You could only select from ChatGPT, llama2-7b-chat and vicuna-7b')
                        
    df_AutoDAN_1= pd.read_json(os.path.join(root_path, 'dataset/Robustness/AutoDAN/autodan_ga/',file_name)).T
    df_AutoDAN_1['Algo'] = 'ga'
    df_AutoDAN_2= pd.read_json(os.path.join(root_path, 'dataset/Robustness/AutoDAN/autodan_hga/',file_name)).T
    df_AutoDAN_2['Algo'] = 'hga'
    
    concatenated_df_AutoDAN = pd.DataFrame()
    


    # Iterate through columns and add them alternately to the new DataFrame
    for col in df_AutoDAN_1.columns:
        concatenated_df_AutoDAN[col] = pd.Series([val for pair in zip(df_AutoDAN_1[col], df_AutoDAN_2[col]) for val in pair])
        # df_ALERT[['id']] += len(df_DNA)
    concatenated_df_AutoDAN['question'] = None
    concatenated_df_AutoDAN['attack_type'] = 'adversarial_suffix' 
    concatenated_df_AutoDAN['question'] = concatenated_df_AutoDAN.apply(
        lambda row: row['final_suffix'].replace('[REPLACE]', row['goal']), axis=1
    )
    concatenated_df_AutoDAN = concatenated_df_AutoDAN.rename(columns={'final_respond': 'response', 'goal':'prompt', 'final_suffix':'suffix', })
    success_df_AutoDAN = concatenated_df_AutoDAN[concatenated_df_AutoDAN['is_success'] == True]
    success_df_AutoDAN.insert(0, 'id', range(0, len(success_df_AutoDAN)))
    columns_to_drop = ['log', 'total_time', 'target', 'is_success']
    success_df_AutoDAN = success_df_AutoDAN.drop(columns=columns_to_drop)
    success_df_AutoDAN = success_df_AutoDAN[['id', 'attack_type','Algo','prompt', 'suffix', 'question', 'response']] 

    cnt = 0
    df_new = pd.DataFrame(columns=['id','attack_type','Algo', 'prompt', 'suffix','question', 'response', 'is_success'])
    concatenated_df_AutoDAN.insert(0, 'id', range(0, len(concatenated_df_AutoDAN)))
    concatenated_df_AutoDAN["# tries"] = None
    # Iterate over the rows of concatenated_df_AutoDAN
    for i in range(len(concatenated_df_AutoDAN)):
        # Iterate over the nested list in the 'log' column
        concatenated_df_AutoDAN.loc[i, "# tries"] = len(concatenated_df_AutoDAN.loc[i,'log']['suffix'])
        for j in range(len(concatenated_df_AutoDAN.loc[i, 'log']['suffix'])):
            df_new.loc[cnt, 'id'] = cnt
            df_new.loc[cnt, 'attack_type'] = concatenated_df_AutoDAN.loc[i, 'attack_type']
            df_new.loc[cnt, 'Algo'] = concatenated_df_AutoDAN.loc[i, 'Algo']
            df_new.loc[cnt, 'prompt'] = concatenated_df_AutoDAN.loc[i,'prompt']
            df_new.loc[cnt, 'suffix'] = concatenated_df_AutoDAN.loc[i, 'log']['suffix'][j]
            df_new.loc[cnt, 'response'] = concatenated_df_AutoDAN.loc[i, 'log']['respond'][j]
            df_new.loc[cnt, 'is_success'] = concatenated_df_AutoDAN.loc[i, 'log']['success'][j]
            cnt += 1
    
    df_new['question'] = df_new.apply(
        lambda row: row['suffix'].replace('[REPLACE]', row['prompt']), axis=1
    )
    concatenated_df_AutoDAN = concatenated_df_AutoDAN.drop(columns=['log', 'total_time'])
    concatenated_df_AutoDAN = concatenated_df_AutoDAN[['id', 'attack_type','Algo','prompt', 'target', 'suffix', 'question', 'response', 'is_success', '# tries']]
    return df_new, success_df_AutoDAN, concatenated_df_AutoDAN

def extract_hallucination_data(df_csv, df_all):
    # Extract segments for each row and assign them to the 'segments' column
    df_csv['segments'] = df_all['segmented_response']
    df_csv['source'] = df_all['source']
    df_csv['comment'] = df_all['comment']
    # df_csv['number_segs'] = None
    # df_csv['meta_label'] = None
    for i in range(len(df_csv)):
        df_csv.loc[i, "number_segs"] = len(df_csv.loc[i, "segments"])
        if  'False' in df_csv.loc[i, 'label']:
            df_csv.loc[i, 'meta_label'] = False
        else:
            df_csv.loc[i, 'meta_label'] = True
    df_FELM = df_csv[['id', 'dataset', 'qst', 'response', 'segments','source', 'comment', 'label', 'res', 'number_segs', 'meta_label']]

    return df_FELM

# extract_ALERT_data('ChatGPT')

extract_ALERT_data('llama2-7b-chat')