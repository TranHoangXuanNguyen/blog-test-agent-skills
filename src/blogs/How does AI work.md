# What is AI?
<p style="color: yellow">Artificial Intelligence is Technology that enables computer and machines to simulate human learning, comprehension, problem solving, decision making, creativity and autonomy. </p>

*Reference: https://www.ibm.com/think/topics/artificial-intelligence

## Some AI concepts

![Diagram comparing diferent types of machine learning concepts as nested boxes in bluish hues.](https://assets.ibm.com/is/image/ibm/diagram-comparing-ai-ml-deep-learning-gen-ai:16x9?fmt=png-alpha&dpr=on%2C1&fit=fit%2C1&wid=1584&hei=891)
### [[Machine Learning]]
Is creating models by training an algorithm to make predictions or decision based on data.
### [[Deep learning]]
Is a subset of Machine learning that uses multilayered [[LEKYBA/paraphrase/Neural Network|Neural Network]]s, called deep neural networks, that more closely simulate the complex decision-making power of the human brain.
### [[Generative AI]]
Generative AI (also called Gen AI) refers to deep learning models that can create complex original content such as long-form text, high-quality images, realistic video or audio and more in response to a user's prompt or request.

*Reference:*

| https://www.ibm.com/think/topics/artificial-intelligence |
| -------------------------------------------------------- |
| https://www.ibm.com/think/topics/generative-ai           |


----
# Why AI is built?

> [!NOTE] The history of Artificial Intelligence 
> Humans have dreamed of creating thinking machines from ancient times. (...)
> 
> *https://www.ibm.com/think/topics/history-of-artificial-intelligence*

There are many different applications of AI, including:
- [Natural language processing (NLP)](https://cloud.google.com/learn/what-is-natural-language-processing): Allow computers to understand and generate human language.
- [Computer vision](https://cloud.google.com/vision): Allow computers to identify and interpret visual content.
- Machine learning (ML): Allows computer to learn from data and improve their performance overtime.
- Robotics: ..

*Reference: https://cloud.google.com/discover/ai-applications

----
# How does AI work?

In order to create an AI, you need to:
1. Define the problem
2. Determine the outcomes
3. Organize the data set
4. Choose appropriate technology
5. Test solution

## 5 steps that illustrate how AI works
### Input
Data is first collected from various sources in the form of text, audio, video and sorted into categories.
### Processing
Allow AI to decide what to do with the data. The AI sorts and decipher the data using patterns it has been programmed to learn until it recognizes similar patterns.
### Outcomes
After the processing step, the AI can use those complex pattern to predict outcomes from data. In this step, the AI is programmed to decide whether specific data is match previous patterns?
### Adjustments
When data sets are considered a "fail", AI learns from that mistake, and the process is repeated again under different condition.
### Assessments
In this step, the AI technology synthesizes insights gained from the data set to make predictions based on the outcome and adjustments.

*Reference*:
https://www.geeksforgeeks.org/artificial-intelligence/how-does-ai-work/
https://www.coursera.org/articles/how-does-ai-work

> [!NOTE] My POV
> When researching about this content, I realize that we might encounter different concepts. In the current, we are familiar with Gen AI, which emerged when Chat GPT launched in 2022. 
> 
> In most of the posts I found from reliable websites, when they mention about "How does AI work" always refer to the process of building a Traditional AI. 
> I wonder why is there mistake even with Big Techs. After asking for explanation from "Gemini", this is what I understand.
> 1. The formula of normal Software with AI:
> 	- Software: `RULE + INPUT = OUTPUT`
> 	- AI: `INPUT + EXPECTED OUTPUT = RULE`
> --> We can use our RULE (code) to explain how our software work because we define the rule for our Software. But with AI, engineers create it with massive datasets and what they receive is the "RULE", the brain of AI. --> The process of training AI indeed become the greatest answer for "How does AI work".
> 2. What if we try to explain the Inference process instead
> 	- `Input -> AI applies its learned patterns (billions of mathematical weights) -> Output`
>	--> It's not that AI professionals cannot explain this behind-the-scenes logic. The reality is that the Inference process relies on highly complex matrix multiplications. It is too abstract for non-technical audiences to grasp, making the "Training process" a much easier story to tell.
> 
> Thus, in the context of modern application development and human-computer interaction, this article will narrow its scope to dive deep into Generative AI.
> 
> I will mention about it in the next part of this article.

----
# The difference between Traditional AI and Gen AI
## Traditional AI
Is simply the use of algorithm or models to assist in already manual defined tasks. It uses the labeled datasets in adequate amount allow traditional AI learn and recognize patterns.
## Generative AI
Aim to aid in the creation process itself (generate text, audio, image, etc.). This process uses data from vast datasets to learn the patterns. 

*Reference: https://www.geeksforgeeks.org/blogs/difference-between-generative-ai-and-traditional-ai/


> [!NOTE] My POV
> Although there are differences between Traditional AI and Gen AI in their use cases, architecture, the core concept is learning from data to find out the pattern.

----
# How does Gen AI work?
## Start with a brain
Gen AI work the same with how human brain work.
## Build an artificial neural network
All generative AI models begin with an artificial neural network encoded in software. There are connections between neurons.
## Teach the newborn neural network model
It learns from data and make prediction. With a model, it treat words, characters, sub-words as token. The algorithm called "backpropagation" adjust the prediction of the model after each repetition.
## But how did the model answer my question?
It’s a mystery.

*Reference: https://www.oracle.com/asean/artificial-intelligence/generative-ai/what-is-generative-ai/


> [!NOTE] My summary
>Although many pages and blogs **explain** 'How does AI work?', they are often overly technical and abstract. We can understand it through this simple flow:
>
>We start with a trained model: `Input text -> Tokenization -> Vector embeddings -> Transformer neural networks -> Next-token prediction`
>
> Behind the scene, there are multiple complex algorithm inside transformer, but we can simulate the process generating new token with my small Python code: [[Code example simulating how Gen AI generate text]]
> 
> https://www.cloudflare.com/learning/ai/what-is-large-language-model/
> https://www.oracle.com/asean/artificial-intelligence/generative-ai/what-is-generative-ai/
> https://aws.amazon.com/what-is/large-language-model/#how-do-large-language-models-work--1u0mds
> https://developers.google.com/machine-learning/crash-course/llm


----
# Problems when working with Gen AI
## Cutoff knowledge
As I mention earlier, an AI model is trained with a data sets before it can be used to solve human problem. And the knowledge cutoff is the specific point in time after which models has not been trained on new data.

## [[Hallucination]]
Sometimes, AI can generate misleading or incorrect information or result confidently.

----
# Conclusion

1. AI is a program that can simulate human learning and perform tasks requiring human intelligence.
2. AI is a huge concept. Inside, there is Machine Learning where AI figures out patterns from a data set. Deep learning is a subset of Machine learning where the process of prediction happens on multi-layered neural networks.  -> The core idea is using data and algorithm to create a model that can make prediction based on the pattern from data.
3. AI is used to solve complex and repetitive tasks.
4. There are 2 basic types of AI: 
	- Traditional AI that are used to predict the result from input.
	- Generative AI that are used to create new content from input.
5. How does Gen AI work:
	1. An AI model is train with 3 main steps: Collect and filter data -> Train model to find the pattern -> Adjust the model's parameters based on prediction errors and repeat.
	2. After training, a model can be used to generate content.
	3. When user enter a requirement: 
		[`Input Text -> Tokenization -> Vector embeddings (positional encoding) -> Transformer (the neural network architecture that holds the learned patterns/weights) -> Next token prediction`](https://www.dremio.com/blog/how-llms-work-tokens-embeddings-and-transformers/)
6. When working with AI, we need to be careful with the hallucination and knowledge cutoff.

The simple workflow above illustrate how LLM process and generate output. Read more about [[Token]], [[Embedding]], [[Transformer]]
The steps from tokenization, vector embedding is more related to the [*How does LLM inference work?*](https://www.ibm.com/think/topics/llm-inference)

*Note: This is a reliable and easier-to-understand docs from Microsoft: https://learn.microsoft.com/en-us/azure/developer/ai/gen-ai-concepts-considerations-developers*