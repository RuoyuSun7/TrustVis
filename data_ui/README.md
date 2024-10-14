# Json Data Illustration

## Safety
| File Name | Description |
|-----------|-------------|
| Category-Number_Pie_Chart.json | Pie chart showing the distribution of categories |
| Statistical_Overview.json | Overview of statistical data |
| Evluation_Results_pie_chart.json | Pie chart displaying evaluation results |
| Unsafe_Samples.json | Samples identified as unsafe |

### File Details

1. **Category-Number_Pie_Chart.json**:
   - Given number of elements belong to each category
   - Represent them in a pie chart

2. **Statistical_Overview.json**:
   - Provides statistical data:
   - f1, accuracy, precision, recall, conf_matrix, tn, fp, fn, tp
   - divided into three evaluators
   - we could switch graphs for different evaluators
   - pie chart or/and Line chart
3. **Evluation_Results_pie_chart.json**:
   - Displays evaluation results in a pie chart
   - Provide data structure like:
       1. Evaluation results on all data without taxonomy (True, False)
       2. Evaluation results after taxonomy( True and False under each Taxonomy), we want to show the True and False occupation of each taxonomy

4. **Unsafe_Samples.json**:
   - Display the samples (Fancy)

## Robustness
| File Name | Description |
|-----------|-------------|
| statistic_overview_tax.json | Overview of statistical data |
| jailbreak_number_overview_tax.json | Numbers for successful Jailbreak |
| Unsafe_Samples.json | The Samples information| 

### File Details
1. **statistic_overview_tax.json**:
   - showing numbers (min, max, median, mean, var) grouped by Taxonomies
   - Represent them in a bar chart

2. **jailbreak_number_overview_tax.json**:
   - Provides statistical data:
   - Showing number of attacks needed to successful jailbreak
   - divided by Taxonomies
   - pie chart or/and Bar chart
3. **Unsafe_Samples.json**:
   - display samples (Fancy)

## Hallucination
| File Name | Description |
|-----------|-------------|
| Overview of dataset.json | Overview of True/False |
| Hallucinated Samples.json | Display Hallucinated Samples|