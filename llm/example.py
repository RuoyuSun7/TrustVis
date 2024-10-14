import sys
sys.path.append('/home/tianyuchen/LLM_Testing/LLM-Testing-Framework') # Your Root Directory
print(sys.executable)
from utils.dataLoader import *
from utils.dataSaver import *
from openai_api import *
from claude_api import *
max_queries = 2



if __name__ == "__main__":
    input_path = "dataset/safety/ALERT/alert.jsonl"
   
    data_list = []
    # model = "gpt-3.5-turbo"
    model = "claude-3-opus-20240229"
    out_path = "dataset_out/safety/unlabeled_output/" + model +"_out.jsonl"
    loader = jsonLoader(input_path)
    for i in range(max_queries):
        input_data = loader.load_single()
        prompt = input_data[i]['prompt'][17:-15]
        category = input_data[i]['category']
        #response = gpt_chat(prompt, model)
        response = claude_chat(prompt, model)
        print(response)
        response_dict = {'category':category,'prompt':prompt, 'response':response}
        data_list.append(response_dict)
    
    # print(response)
    saver = jsonSaver(out_path = out_path)
    saver.save(data_list)