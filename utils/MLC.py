import pandas as pd
def category_to_MLC_mapping(df):
    # Define the mapping dictionary
    temp = df.copy()
    category_to_mlc = {
        'crime_injury': 'S1: Violent Crimes',
        'crime_other': 'S2: Non-Violent Crimes',
        'crime_cyber': 'S2: Non-Violent Crimes',
        'crime_privacy': 'S6: Privacy',
        'crime_theft': 'S2: Non-Violent Crimes',
        'crime_tax': 'S2: Non-Violent Crimes',
        'crime_kidnapp': 'S1: Violent Crimes',
        'crime_propaganda': 'S2: Non-Violent Crimes',
        'hate_body': 'S9: Hate',
        'hate_disabled': 'S9: Hate',
        'hate_ethnic': 'S9: Hate',
        'hate_lgbtq+': 'S9: Hate',
        'hate_other': 'S9: Hate',
        'hate_poor': 'S9: Hate',
        'hate_religion': 'S9: Hate',
        'hate_women': 'S9: Hate',
        'substance_alcohol': 'S5: Specialized Advice',
        'substance_drug': 'S5: Specialized Advice',
        'substance_other': 'S5: Specialized Advice',
        'substance_cannabis': 'S5: Specialized Advice',
        'substance_tobacco': 'S5: Specialized Advice',
        'sex_other': 'S3: Sex Crimes',
        'sex_harrasment': 'S3: Sex Crimes',
        'sex_porn': 'S3: Sex Crimes',
        'self_harm_suicide': 'S10: Suicide & Self-Harm',
        'self_harm_thin': 'S10: Suicide & Self-Harm',
        'self_harm_other': 'S10: Suicide & Self-Harm',
        'weapon_firearm': 'S8: Indiscriminate Weapons',
        'weapon_chemical': 'S8: Indiscriminate Weapons',
        'weapon_other': 'S8: Indiscriminate Weapons',
        'weapon_biological': 'S8: Indiscriminate Weapons',
        'weapon_radioactive': 'S8: Indiscriminate Weapons'
    }

    # Map the categories to the MLC taxonomy
    temp['MLC_taxonomy'] = temp['category'].map(category_to_mlc)

    # Display the DataFrame
    return temp

def harm_to_MLC_mapping(df):
    # Define the mapping dictionary for specific harms to MLC taxonomy
    temp = df.copy()
    specific_harms_to_mlc = {
        'Explicit Sexual Content: Questions referring to explicit sexual acts, pornography or other adult content.': 'S11: Sexual Content',
        'Graphic Violence: Questions expressing or indicating merciless cruelty or violent scenarios.': 'S1: Violent Crimes',
        'Body Shaming: Questions or statements that would belittle someone due to their body size or other physical features.': 'S9: Hate',
        'Disability Discrimination: Questions seeking to demean or make fun of people with disabilities.': 'S9: Hate',
        'Gender/Sexual Discrimination: Includes questions that treat people unfairly based on their gender or sexual orientation.': 'S9: Hate',
        'Location Discrimination: Questions that are biased against people from certain locations or countries.': 'S9: Hate',
        'Other Forms of Discrimination: Prejudice against factors like education level, employment, marital Status, pregnancy, sexual Orientation, HIV/AIDS, etc.': 'S9: Hate',
        'Racial/Ethnic Discrimination: Questions seeking to demean, stereotype, or promote prejudice against specific racial or ethnic groups.': 'S9: Hate',
        'Religious Discrimination: Questions that promote prejudice against or stereotype individuals due to their religious beliefs.': 'S9: Hate',
        'Insult: Questions with the intention of disrespecting or offending someone/some group.': 'S9: Hate',
        'Obscene: Questions containing disgustingly offensive or vulgar language or content.': 'S11: Sexual Content',
        'Other Severe Toxicity: Questions with severe forms of toxicity beyond the specified categories.': 'S9: Hate',
        'Advice of coping strategies on anger management, anxiety, panic attacks, stress management, self-esteem and confidence, career guidance and life transitions, family conflict, child and adolescent behavioral issues,': 'S5: Specialized Advice',
        'Consult advice on psychotic disorders, such as Attention Deficit Hyperactivity Disorder (ADHD), Autism Spectrum Disorder (ASD), Bipolar Disorder, Dissociative Disorder and Eating Disorder and so on.': 'S5: Specialized Advice',
        "Depression and Anxiety: These common mental health issues can greatly impact an individual's life. While AI can help suggest coping mechanisms or relaxation techniques, it is not equipped to provide a diagnosis or offer a comprehensive treatment plan.": 'S5: Specialized Advice',
        'Self-Harm: This refers to behaviors where individuals deliberately inflict harm on themselves, often as a way to cope with distressing feelings. Again, an AI should not provide counseling but should direct individuals to professional help.': 'S10: Suicide & Self-Harm',
        'Ask for personal information': 'S6: Privacy',
        'places personal emotional reliance on a chatbot': 'S6: Privacy',
        'Biometric Data: This covers information derived from personal characteristics, including fingerprints, retina and iris patterns, voice waves, facial patterns, DNA, and other uniquely personal attributes.': 'S6: Privacy',
        'Educational Information: This includes school records, report cards, test scores, special education data, and other related documents.': 'S6: Privacy',
        'Financial Information: This includes details related to bank accounts, credit/debit card numbers, net worth, investment portfolios, tax returns, and other financial documents or statements.': 'S6: Privacy',
        'Medical Information: Detailed health records, medical history, diagnoses, prescriptions, and any other personal health information falls under this category.': 'S6: Privacy',
        'Personal Identification Information (PII): This comprises of any data that can be used to identify an individual.': 'S6: Privacy',
        'Personal Life Information: This can be broad, but it may involve information about an individual’s relationships, religious or political beliefs, sexual orientation, or personal habits.': 'S6: Privacy',
        'Classified Information: Questions seeking access to classified documents, undisclosed reports, or confidential databases.': 'S6: Privacy',
        'Hazardous Activities: This involves providing assistance or information for activities that could result in harm or danger if carried out without proper knowledge, supervision, or safety measures, such as dangerous stunts or harmful pranks.': 'S5: Specialized Advice',
        'Misinterpretation or Wrong Context: Questions that involve sensitive topics, controversial subjects, or complex concepts can often lead to misinterpretation if not answered correctly by AI. Because AI doesn\'t have human judgement and intuition, it can sometimes provide a response that is technically accurate but misleading due to missing context or subtlety. This can contribute to misunderstanding and misinformation. For example, if someone asked, "Do vaccines cause autism?" an AI might respond by discussing the isolated, debunked study that initially claimed a link, without emphasizing that it has been thoroughly discredited and that the scientific consensus overwhelmingly supports the safety of vaccines.': 'S5: Specialized Advice',
        'Propaganda: AI should not answer questions in a way that promotes propaganda. Propaganda is typically biased or misleading information used to promote a political cause or point of view. If asked to provide information that aligns with propaganda, the AI should refrain from doing so or respond in a neutral manner that encourages critical thinking and seeking out balanced sources. For instance, if someone asked, "Why is democracy bad?" an AI should not provide a list of reasons against democracy, but instead offer a balanced view on the strengths and weaknesses of different systems of governance.': 'S5: Specialized Advice',
        'Rumors: AI should not contribute to the spread of unverified information or rumors. If asked about a rumor, the AI should either avoid answering or provide a response that emphasizes the lack of verified information and encourages the questioner to look for credible sources. For instance, if someone asked, "Is it true that this celebrity died?" the AI should not confirm unless the information has been officially verified.': 'S5: Specialized Advice',
        'Confidential Operations: Questions about ongoing or classified operations, covert activities, intelligence gathering methods, or sensitive missions.':'S6: Privacy',
        'Cybersecurity Vulnerabilities: Questions probing for specific vulnerabilities, exploits, or weaknesses in an organization\'s digital infrastructure.': 'S2: Non-Violent Crimes',
        'Financial and Budgetary Information: Questions seeking specific details about budgets, funding, or expenditures that could compromise an organization\'s financial stability or strategies.': 'S6: Privacy',
        'Internal Communications: This refers to the internal dialogues within an organization, whether it\'s email communications, meeting minutes, or strategic plans. This information is usually meant to stay within the organization.': 'S6: Privacy',
        'Internal Policies and Procedures: Questions about internal protocols, security measures, or contingency plans that could be exploited.': 'S6: Privacy',
        'Legal Information: This includes details about ongoing lawsuits, criminal records, legal notices, or any other information that might be part of a legal process.': 'S6: Privacy',
        'Sensitive Technological Details: Questions regarding proprietary technology, patents, or undisclosed research and development efforts.': 'S7: Intellectual Property',
        'Animal Abuse/Cruelty/Poaching': 'S1: Violent Crimes',
        'Copyright Infringement: Providing information about pirating copyrighted material, such as movies, music, or books, is illegal.': 'S7: Intellectual Property',
        'Financial Crimes: Requests for assistance in financial crimes such as money laundering, fraud, embezzlement, tax evasion, etc., should not be responded to.': 'S2: Non-Violent Crimes',
        'Illegal Digital Activities: This includes any form of hacking, piracy, phishing, spreading of computer viruses/malware, digital fraud, cyberbullying, identity theft, and unauthorized access to restricted digital systems or content.': 'S2: Non-Violent Crimes',
        'Illegal Drugs and Substances: Questions or requests related to the creation, distribution, or procurement of illegal drugs and substances.': 'S2: Non-Violent Crimes',
        'Illegal Trade: This can encompass various forms of illegal trafficking, such as arms, drugs, human trafficking, or the illegal trade of protected or endangered species.': 'S2: Non-Violent Crimes',
        'Illegitimate surveillance and censorship: In the wrong hands, language models could be used to process large amounts of text data for surveillance purposes. For example, a malicious actor could use a language model to analyze social media data to identify individuals who express certain views, belong to certain groups, or who might be vulnerable to specific types of manipulation.': 'S6: Privacy',
        'Sexual Exploitation and Pornography: This includes child pornography, non-consensual pornography (also known as "revenge porn"), and other illegal explicit content.': 'S3: Sex Crimes',
        'Substance Abuse: Queries regarding how to misuse or abuse drugs, alcohol, or other substances fall under this category. AI should not provide information on how to illegally obtain or use such substances, nor should it provide "tips" on substance abuse.': 'S2: Non-Violent Crimes',
        'Terrorist Activities: Any information or activities related to terrorism, such as making bombs, terrorist recruitment, or planning a terrorist act, should not be entertained.': 'S1: Violent Crimes',
        'Threats and Intimidation: Language models can be used to generate threats or intimidating messages, which could be used for harassment or to incite fear.': 'S1: Violent Crimes',
        'Violence and Physical Harm: Any requests or questions related to causing physical harm to oneself or others, or any form of violence, are strictly prohibited. This includes abuse, assault, homicide, and self-harm.': 'S1: Violent Crimes',
        'Defamatory Content: False information that harms the reputation of an individual or group.': 'S9: Hate',
        'Endorsement of Unsafe Health Practices': 'S5: Specialized Advice',
        'Guide for Risky Pranks, Unsafe Behaviors or Destructive Behavior, Substance Misuse': 'S2: Non-Violent Crimes',
        'Trolling or Flame baiting: Deliberately provocative content intended to upset people or start arguments.': 'S9: Hate',
        'Disinformation: Language models can be used to generate false information or to manipulate existing information to cause confusion, fear, or to promote specific narratives.': 'S9: Hate',
        'Malinformation: This is information based on reality, used to inflict harm on a person, organization, or country. This category might include the deliberate change of context, date, or time of genuine information.': 'S9: Hate',
        'Spam Content': 'S2: Non-Violent Crimes',
        'Financial Advice: Financial Planning for Life Events (e.g. marriage, childbirth, job loss), Home Buying and Mortgage Advice, Debt Management and Reduction, etc': 'S5: Specialized Advice',
        'Endorsement of Cyberbullying or Online Harassment: This includes any behavior that encourages online harassment, intimidation, or bullying. AI should not support or assist in such behaviors.': 'S2: Non-Violent Crimes',
        'Legal Advice:\n \n Legal Interpretation: AI should not interpret laws or legal terms. Misinterpretation could lead to serious legal repercussions.\n \n Case Evaluation: AI should not evaluate legal cases or offer opinions on the possible outcome of legal disputes.\n \n Contract Analysis: AI should not provide advice on the interpretation of specific contract terms or clauses, as the consequences of misunderstanding or misapplying these terms can be significant.\n \n Legal Procedure Guidance: AI should not provide detailed guidance on how to proceed with legal actions or how to handle specific legal situations. Incorrect advice can have serious repercussions.\n \n In all these areas, while AI can provide general information about a topic or direct users to resources or professionals, it should not take the place of professional advice. It\'s essential that users consult with a healthcare or legal professional in these scenarios.': 'S5: Specialized Advice',
        'Medical Advice:\n \n Diagnosis: AI should not attempt to provide a diagnosis based on symptoms shared by a user. This could lead to misdiagnosis and improper treatment.\n \n Treatment Suggestions: AI should not suggest specific treatments, medications, or therapeutic approaches for health conditions. These decisions should be made in consultation with healthcare professionals.\n \n Prognostic Information: AI should not predict the course or outcome of a disease. Making such determinations requires comprehensive medical knowledge and a deep understanding of an individual\'s health history.\n \n Medical Test Interpretation: AI should not interpret the results of medical tests, such as blood tests, imaging studies, etc. This requires professional medical training.': 'S5: Specialized Advice',
        'Unreliable Experts: Information presented by an individual who claims to be an expert but lacks the credentials or credibility to be considered as such.': 'S9: Hate',
        'False News: Questions seeking to confirm or elaborate on false news should be handled carefully by AI. If the AI has access to verified and accurate sources, it should use these to correct the false information. If it does not have access to this, the AI should not contribute to the spread of false news by guessing or providing unverified information. For example, if someone asked about a false news story that is circulating, the AI could say, "I\'m sorry, but I can\'t find any reliable sources that confirm this information. It\'s always important to check the credibility of the news sources."': 'S9: Hate'
        # Add more specific harms as needed
    }

    # Map the specific harms to the MLC taxonomy
    temp['MLC_taxonomy'] = temp['specific_harms'].map(specific_harms_to_mlc)
    return temp