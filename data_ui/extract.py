import pandas as pd
import sys
import os
cur_root_path = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(cur_root_path)
from utils.metrics import *
print(cur_root_path)

class SafetyExtraction:
    def __init__(self, file_path: str) -> None:
        # Construct the absolute file path
        absolute_file_path = os.path.join(cur_root_path, file_path)
        # Read the JSON file, handle potential errors
        try:
            self.file = pd.read_json(absolute_file_path)
        except ValueError as e:
            print(f"Failed to read JSON file: {absolute_file_path}")
            print(f"Error: {e}")
            raise
        except FileNotFoundError as e:
            print(f"File not found: {absolute_file_path}")
            raise
        self.output_path = 'visualization/data/safety'
        self.file['GPT4_harmful_binary'] = np.where(self.file['GPT4_action'] == 6,1, 0)
        self.file['llama_guard_output'] = np.where(self.file['llama_guard_output'] == 'unsafe',1, 0)
        self.file['llama_guard2_output'] = np.where(self.file['llama_guard2_output'] == 'unsafe',1, 0)
    
    def get_majority(self):
        harmful_columns = ['Human_harmful', 'Longformer_harmful', 'GPT4_harmful_binary', 
                           'llama_guard_output', 'llama_guard2_output']
        
        # Ensure only relevant columns are considered
        df_harmful = self.file[harmful_columns]
        
        # Calculate majority vote, ignoring NaN values
        self.file['majority_vote'] = df_harmful.apply(lambda row: 1 if np.nansum(row) > (len(row) - np.isnan(row).sum()) / 2 else 0, axis=1)

    def category_number_pie(self):
        df = self.file.copy()
        categories = ['S1: Violent Crimes', 'S2: Non-Violent Crimes', 'S3: Sex Crimes', 
                      'S4: Child Exploitation', 'S5: Specialized Advice', 'S6: Privacy', 
                      'S7: Intellectual Property', 'S8: Indiscriminate Weapons', 'S9: Hate', 
                      'S10: Self-Harm', 'S11: Sexual Content']
        
        df_out = pd.DataFrame(columns=categories)
        
        for col in df_out.columns:
            cnt = df[df['MLC_taxonomy'] == col].shape[0]
            df_out.loc[0, col] = cnt
        
        output = os.path.join(self.output_path, "1.Category-Number_Pie_Chart.json")
        df_out.to_json(output, orient='records')
    
    def statistic_results(self,  col_list):
        df = self.file.copy()
        metrics = ['evaluator','unsafe_rate','Confusion Matrix', 'Accuracy', 'Precision', 'F1', 'Recall', 'TN', 'FP', 'FN', 'TP']
        df_out = pd.DataFrame(columns=metrics)
        for col in col_list:
            f1, accuracy, precision, recall, conf_matrix, tn, fp, fn, tp = metrics_eval(df['majority_vote'], df[col])
            unsafe_rate = len(df[df['majority_vote'] == 1])/ len(df)
            if col == 'Longformer_harmful':
                name = 'Longformer'
            elif col == 'llama_guard2_output':
                name = 'Llama Guard2'
            elif col == 'llama_guard_output':
                name = 'Llama Guard'
            new_row = {
                'evaluator': name,
                'unsafe_rate': unsafe_rate,
                'Confusion Matrix': conf_matrix,
                'Accuracy': accuracy,
                'Precision': precision,
                'F1': f1,
                'Recall': recall,
                'TN': tn,
                'FP': fp,
                'FN': fn,
                'TP': tp
            }      
            # Append the new row to df_out
            df_out = df_out._append(new_row, ignore_index=True)
        
        output = os.path.join(self.output_path, "2.Statistical_Overview.json")
        df_out.to_json(output, orient='records')
        
    def evaluation_pie_chart(self):
        df = self.file.copy()
        total_safe = len(df[df['majority_vote'] == 0])
        total_num = len(df)
        total_unsafe = total_num - total_safe
        columns = ['taxonomy', 'number_safe', 'number_unsafe', 'number_total']
        out_df = pd.DataFrame(columns=columns)
        new_row = {
                    'taxonomy': 'All',
                    'number_safe': total_safe,
                    'number_unsafe': total_unsafe,
                    'number_total': total_num
        }
        out_df = out_df._append(new_row, ignore_index=True)
        for tax in df['MLC_taxonomy'].unique():
            if pd.notna(tax):  # Check that the taxonomy is not NaN
                num_safe = len(df[(df['MLC_taxonomy'] == tax) & (df['majority_vote'] == 0)])
                num_total = len(df[df['MLC_taxonomy'] == tax])
                num_unsafe = num_total - num_safe
                
                new_row = {
                    'taxonomy': tax,
                    'number_safe': num_safe,
                    'number_unsafe': num_unsafe,
                    'number_total': num_total
                }
                out_df = out_df._append(new_row, ignore_index=True)
        output = os.path.join(self.output_path, "3.Evluation_Results_pie_chart.json")
        out_df.to_json(output, orient='records')

    def unsafe_samples_display(self):
        df = self.file.copy()
        columns = ['MLC_taxonomy', 'question', 'response', 'safe', 'unsafe']
        df_out = pd.DataFrame(columns=columns)
        
        harmful_columns = ['Human_harmful', 'Longformer_harmful', 'GPT4_harmful_binary', 
                           'llama_guard_output', 'llama_guard2_output']
        model_names = ['Human', 'Longformer', 'GPT4', 'Llama Guard', 'Llama Guard2']
        
        df_unsafe = df[df['majority_vote'] == 1]
        
        for idx, row in df_unsafe.iterrows():
            unsafe_models = []
            safe_models = []
            for col, model in zip(harmful_columns, model_names):
                if row[col] == 1:
                    unsafe_models.append(model)
                else:
                    safe_models.append(model)
            
            new_row = {
                'MLC_taxonomy': row['MLC_taxonomy'],
                'question': row['question'],
                'response': row['response'],
                'safe': ', '.join(safe_models),
                'unsafe': ', '.join(unsafe_models)
            }
            
            df_out = df_out._append(new_row, ignore_index=True)
        
        output = os.path.join(self.output_path, "4.Unsafe_Samples.json")
        df_out.to_json(output, orient='records')
# Create an instance of SafetyExtraction and call the method
class RobustnessExtraction:
    def __init__(self, file_path: str) -> None:
        # Construct the absolute file path
        absolute_file_path = os.path.join(cur_root_path, file_path)
        # Read the JSON file, handle potential errors
        try:
            self.file = pd.read_json(absolute_file_path)
        except ValueError as e:
            print(f"Failed to read JSON file: {absolute_file_path}")
            print(f"Error: {e}")
            raise
        except FileNotFoundError as e:
            print(f"File not found: {absolute_file_path}")
            raise
        self.output_path = 'visualization/data/robustness'
        self.file['llama_guard_output'] = np.where(self.file['llama_guard_output'] == 'unsafe',1, 0)
        self.file['llama_guard2_output'] = np.where(self.file['llama_guard2_output'] == 'unsafe',1, 0)
        self.hga_data = self.file[self.file['Algo'] == 'hga']
        self.ga_data = self.file[self.file['Algo'] == 'ga']

    def statistic_overview(self):
        df = self.hga_data.copy()
        columns = ['MLC_taxonomy', 'min', 'max', 'median', 'mean', 'variance']
        df_out = pd.DataFrame(columns=columns)
        df_jailbreak = df[df['is_success'] == True]
        total_min = df_jailbreak['# tries'].min()
        total_max = df_jailbreak['# tries'].max()
        total_mean = df_jailbreak['# tries'].mean()
        total_median = df_jailbreak['# tries'].median()
        total_variance = df_jailbreak['# tries'].var()
        new_row = {
                'MLC_taxonomy': 'all',
                'min': total_min,
                'max': total_max,
                'median': total_median,
                'mean': total_mean,
                'variance': total_variance
        }
        df_out = df_out._append(new_row, ignore_index=True)
        for tax in df['MLC_taxonomy'].unique():
            df_tax = df[(df['MLC_taxonomy'] == tax) & (df['is_success'] == True)]
            tax_min = df_tax['# tries'].min()
            tax_max = df_tax['# tries'].max()
            tax_mean = df_tax['# tries'].mean()
            tax_median =  df_tax['# tries'].median()
            tax_variance = df_tax['# tries'].var()
            new_row = {
                'MLC_taxonomy': tax,
                'min': tax_min,
                'max': tax_max,
                'median': tax_median,
                'mean': tax_mean,
                'variance': tax_variance
            }
            df_out = df_out._append(new_row, ignore_index=True)
        output = os.path.join(self.output_path, "1.statistic_overview_tax.json")
        df_out.to_json(output, orient='records')

    def jailbreak_number_overview(self):
        df = self.hga_data.copy()
        columns = ['MLC_taxonomy', 'number_robust', 'number_jailbreak']
        df_out = pd.DataFrame(columns=columns)
        df_jailbreak = df[df['is_success'] == True]
        total_num = len(df)
        total_jailbreak = len(df_jailbreak)
        total_robuts = total_num - total_jailbreak
        new_row = {
                'MLC_taxonomy': 'all',
                'number_robust': total_robuts,
                'number_jailbreak': total_jailbreak
        }
        df_out = df_out._append(new_row, ignore_index=True)
        for tax in df['MLC_taxonomy'].unique():
            df_tax = df[(df['MLC_taxonomy'] == tax)]
            df_tax_jailbreak = df_tax[df_tax['is_success'] == True]
            total_num = len(df_tax)
            tax_jailbreak = len(df_tax_jailbreak)
            tax_robuts = total_num - tax_jailbreak
            new_row = {
                'MLC_taxonomy': tax,
                'number_robust': tax_jailbreak,
                'number_jailbreak': tax_robuts
            }
            df_out = df_out._append(new_row, ignore_index=True)
        output = os.path.join(self.output_path, "2.jailbreak_number_overview_tax.json")
        df_out.to_json(output, orient='records')

    def jailbreak_samples_display(self):
        df = self.file.copy()
        columns = ['MLC_taxonomy', 'prompt', 'suffix', 'response','# tries', 'safe', 'unsafe']
        df_out = pd.DataFrame(columns=columns)
        
        harmful_columns = ['Longformer_output',  
                           'llama_guard_output', 'llama_guard2_output']
        model_names = [ 'Longformer',  'Llama Guard', 'Llama Guard2']
        
        df_unsafe = df[df['is_success'] == 1]
        
        for idx, row in df_unsafe.iterrows():
            unsafe_models = []
            safe_models = []
            for col, model in zip(harmful_columns, model_names):
                if row[col] == 1:
                    unsafe_models.append(model)
                else:
                    safe_models.append(model)
            
            new_row = {
                'MLC_taxonomy': row['MLC_taxonomy'],
                'prompt': row['prompt'],
                'suffix': row['suffix'],
                'response': row['response'],
                'number_attacks': row['# tries'],
                'safe': ', '.join(safe_models),
                'unsafe': ', '.join(unsafe_models)
            }
            
            df_out = df_out._append(new_row, ignore_index=True)
        
        output = os.path.join(self.output_path, "3.Unsafe_Samples.json")
        df_out.to_json(output, orient='records')
    
class HallucinationExtraction:
    def __init__(self, file_path: str) -> None:
        # Construct the absolute file path
        absolute_file_path = os.path.join(cur_root_path, file_path)
        # Read the JSON file, handle potential errors
        try:
            self.file = pd.read_json(absolute_file_path)
        except ValueError as e:
            print(f"Failed to read JSON file: {absolute_file_path}")
            print(f"Error: {e}")
            raise
        except FileNotFoundError as e:
            print(f"File not found: {absolute_file_path}")
            raise
        self.output_path = 'visualization/data/hallucination'
        
    
    def number_pie_chart(self):
        df = self.file.copy()
        number_true = len(df[df['meta_label'] == True])
        number_False = len(df[df['meta_label'] == False])
        columns = ['True', "False"]
        df_out = pd.DataFrame(columns=columns)
        df_out.loc[0,'True'] = number_true
        df_out.loc[0,'False'] = number_False
        output = os.path.join(self.output_path, "1.Overview of dataset.json")
        df_out.to_json(output, orient='records')

    def false_samples_display(self):
        df = self.file.copy()
        df_out = df[df['meta_label'] == False]
        columns = ['dataset','source', 'qst', 'segments', 'label','comment','meta_label']
        df_out = df_out[columns]
        output = os.path.join(self.output_path, "2.Hallucinated Samples.json")
        df_out.to_json(output, orient='records')
def safety_func():
    safety = SafetyExtraction('dataset_out/safety/labeled_output/ChatGPT-evaluated.json')
    safety.category_number_pie()
    safety.get_majority()
    safety.statistic_results(['Longformer_harmful', 'llama_guard_output', 'llama_guard2_output'])
    safety.evaluation_pie_chart()
    safety.unsafe_samples_display()

def robust_func():
    robust_main = RobustnessExtraction('dataset_out/Robustness/labeled_output/llama2-7b-chat-main-evaluated.json')
    robust_main.statistic_overview()
    robust_main.jailbreak_number_overview()
    robust_main.jailbreak_samples_display()
    # robust_all = RobustnessExtraction('dataset_out/Robustness/labeled_output/llama2-7b-chat-all-evaluated.json')

def hallucination_func():
    halluciniation = HallucinationExtraction('dataset/Halucination/Merged/ChatGPT-Merged.json')
    halluciniation.number_pie_chart()
    halluciniation.false_samples_display()
if __name__ == '__main__':
    #robust_func()
    hallucination_func()