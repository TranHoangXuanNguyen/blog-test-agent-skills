# Definition
Context engineering is the practice of deliberating designing, structuring and optimizing the context provided to LLMs to produce more accurate, relevant and reliable output.
It encompasses two techniques: Prompt Engineering and RAG.

It's basically described by this image from [Dex Horthy](https://x.com/dexhorthy/status/1933283008863482067).
![[Pasted image 20260529153559.png]]

----
# What is context in ML?
In modern ML systems, context is everything the model sees at inference time.
It might include: The system prompt, the user's query, any other provided data.

----
# Why it is important?
Context engineering can lead to better reasoning, tool calls and answers.
As a result, the quality and structure of [[Context window]] directly influence the model reasoning, tool use and outputs.

From studies on needle-in-a-haystack style benchmarking of Anthropic, they uncovered the concept of **context rot**: as the number of tokens in the context window increase, the ability of the model in accurate recalling information from that context decreases. 

[Reference](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

----
# What are the key steps?
1. **Context selection:** choose what information to include in the context.
2. **Context structuring**
3. **Prompt design and Engineering:** frame instruction, include the constraint and rules and any requirements for the output formatting.
4. **Context compression:** fit more useful information into limited token space.
5. **Context sequencing:** Ordering matter for LLM. Should include instruction and rule first. The order should be the most relevant from top to bottom.
6. **Tool and memory integration:** 

*Reference: https://www.ibm.com/think/topics/context-engineering

----
# Example
To understand clearer about Context Engineering beyond theory, I try to wrote a small python code simulating how to apply it in software development.
[[Code example simulating Context Engineering in Software Development]]

In the above example, I setup a small data with 3 regulations of a company. This information will be vectorized - which is the same with how AI integrated applications vectorize data and store them in a vector database. 
The next step is vectorizing user input (request) and using `cosine similarity` to compare information to retrieve relevant data. The data then will be sent together with `System prompt` and  `User input`. 

This example works well when I ask question about the provided data. Another good point is the rule `No hallucination` prevent model from returning unreal data. 


> [!NOTE] My conclusion from the example code
> The code above prove the efficiency of Context Engineering in enhance model's accuracy in answering question required specific knowledge. We can also enhance it more when we apply the rest steps: **Context sequencing**, **Tool and memory integration**
>
>One notable point I just found when testing the code: The RAG step (**Context compression**) might return unrelated information. This phenomenon called `Similarity Inflation`, however, it won't really affect the final result if we define the system prompt carefully.

