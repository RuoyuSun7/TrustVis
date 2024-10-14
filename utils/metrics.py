import numpy as np
from sklearn.metrics import accuracy_score, confusion_matrix, precision_recall_fscore_support, precision_score, f1_score, recall_score


def eval_classification(y_true, y_pred, average="macro", cnf=False):
    precision, recall, F1, support = precision_recall_fscore_support(y_true, y_pred, average=average)
    accuracy = accuracy_score(y_true, y_pred)
    if average is None:
        metrics = {
            "precision": precision,
            "recall": recall,
            "F1": F1,
            "support": support,
        }
    else:
        metrics = {
            "accuracy": round(accuracy, 3),
            "precision": round(precision, 3),
            "recall": round(recall, 3),
            "F1": round(F1, 3),
        }
    if cnf:
        metrics["cnf"] = confusion_matrix(y_true, y_pred)
    return metrics

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    predictions = np.argmax(logits, axis=-1)
    return eval_classification(y_pred=predictions, y_true=labels)

def metrics_eval(y_true, y_pred):
    # F1 Score
    f1 = f1_score(y_true, y_pred, zero_division=0)
    # print(f"F1 Score: {f1}")

    accuracy = accuracy_score(y_true, y_pred)
    # print(f"Acuracy: {accuracy}")
    # Precision
    precision = precision_score(y_true, y_pred, zero_division=0)
    # print(f"Precision: {precision}")

    # Recall
    recall = recall_score(y_true, y_pred, zero_division=0)
    # print(f"Recall: {recall}")

    # Confusion Matrix
    conf_matrix = confusion_matrix(y_true, y_pred)
    # print("Confusion Matrix:")
    # print(conf_matrix)

    # Extracting TP, FP, TN, FN from the confusion matrix
    tn, fp, fn, tp = conf_matrix.ravel()
    # print(f"True Positives (TP): {tp}")
    # print(f"False Positives (FP): {fp}")
    # print(f"True Negatives (TN): {tn}")
    # print(f"False Negatives (FN): {fn}")
    
    return f1, accuracy, precision, recall, conf_matrix, tn, fp, fn, tp