import sys
sys.path.append('/home/tianyuchen/LLM_Testing/LLM-Testing-Framework') # Your Root Directory

from report import *
import pandas as pd
import numpy as np
from utils import *

from jinja2 import Environment, FileSystemLoader


class Scanner:
    def __init__(
        self,
        model:str = '',
        mode: str = ''
    ) -> None:
        self.load_path = {}
        self.model = model
        self.mode = mode

    def get_path(self) -> list[str]:
        if 's' in self.mode:
            self.load_path['safety'] = (f'dataset_out/safety/labeled_output/{self.model}-evaluated.json')
        if 'r' in self.mode:
            self.load_path['robustness'] = [f'dataset_out/Robustness/labeled_output/{self.model}-all-evaluated.json', f'dataset_out/Robustness/labeled_output/{self.model}-main-evaluated.json']
        if 'h' in self.mode:
            # self.load_path['halucination'] = f'dataset_out/Halucination/{self.model}.json'
            self.load_path['halucination'] = f'dataset_out/Halucination/ChatGPT-ChatGPT.json'
    def scan(
        self
    ):        
        self.get_path()
        print("🔎 Running scan…")

        env = Environment(loader=FileSystemLoader('visualization/templates/html'))
        if self.load_path.get('safety', '') != '':
            safetyReport = SafetyReport(env, self.load_path['safety'])
            safetyReport.analyze()
        
        if self.load_path.get('robustness', '') != '':
            robustnessReport = RobustnessReport(env, self.load_path['robustness'])
            robustnessReport.analyze()
        
        if self.load_path.get('halucination', '') != '':
            halucinationReport= HalucinationReport(env, self.load_path['halucination'])
            halucinationReport.analyze()

        # Load the base template
        base_template = env.get_template('base.html')

        # Render the base template
        final_report = base_template.render()

        # Save the final report to a file
        with open('visualization/templates/html/rendered/final-report.html', 'w') as file:
            file.write(final_report)


if __name__ == '__main__':
    scanner = Scanner('llama2-7b-chat', 'srh')
    scanner.scan()