# 1. Definition
```
Is an AI framework that improves LLMs by fetching facts from an external, authoritative knowledge base instead of using the training data.
```

> [!NOTE] Why this matters?
> Allows the AI to provide highly accurate, up-to-date, and context-specific answers without requiring a costly and time-consuming model retraining process.

# 2. Pipeline 
![[RAG_image_20260529141510.png]]
# 3. Key components

- External knowledge sources (documents, KBs, APIs)
- Chunking strategy and metadata
- [^1]Embedding model (semantic vectors)
- [^2]Vector store / [^3]retriever (ANN / exact search)
- [^4]Reranker / selector
- Prompt augmentation / compressor
- LLM generator and optional verifier
# 4. Variants & paradigms

- Naive RAG: simple retrieve‑then‑concatenate approach.
- Advanced RAG: re‑ranking, compression, and post‑retrieval optimizations.
- Modular RAG: interchangeable modules (memory, routing, fusion, adapters).
- Hybrid search: combine lexical + semantic retrieval.
- Recursive / iterative retrieval: multiple retrieval rounds or sub‑queries.
# 5. Common techniques used with RAG

- Query rewriting / [^5]HyDE (hypothetical document embeddings)
- Re‑ranking and diversity ranking
- Prompt compression (summarize retrieved passages)
- Interleaving retrieval with CoT reasoning => RAT (Retrieval Augmented Thoughts)
- Self‑RAG and self‑reflective retrieval for adaptive queries
# 6. Evaluation & metrics

- Retrieval metrics: NDCG, recall@k, hit rate.
- Generation metrics: fidelity/faithfulness, accuracy, F1, EM.
- End‑to‑end metrics: user satisfaction, groundedness, harmfulness checks.
- Benchmarks/tools: RGB, RECALL, RAGAS, RaLLe, TruLens.
# 7. RAG vs fine‑tuning (when to use each)

- Use RAG when we need fresh or domain data without retraining.
- Use fine‑tuning when we need specialized behavior encoded inside the model (formatting, instruction following) that is repeatedly required and costly to produce via retrieval.
- Hybrid: combine both (index updated sources + occasional fine‑tune for reader adaptation).
# 10. Challenges & pitfalls

- Retrieval quality (garbage in → garbage out).
- Context window limits and prompt bloat.
- Latency and engineering complexity.
- Model prior vs retrieved evidence (faithfulness tension).
- Bias and sensitive data retrieval; privacy & governance concerns.
# 11. Production considerations

- Refresh strategy for indexed data and embeddings.
- Caching and result deduplication.
- Access control and permission filtering for enterprise sources.
- Logging, telemetry, and drift detection.
- Verifier or secondary model to validate outputs when high‑stakes.
# 12. Tools & ecosystem

- LangChain, LlamaIndex, Haystack, Weaviate, Milvus, Pinecone, Qdrant.
- Managed services: Amazon Kendra, Amazon Bedrock, Cohere, OpenAI + vector DB integrations.

[^1]: Converting text into numeric vectors for semantic comparison.

[^2]: A database that stores vectors (e.g., Qdrant, Milvus).

[^3]: Component that finds relevant text chunks using vectors.

[^4]: Component that reorders retrieved results by relevance.

[^5]: Technique that generates hypothetical documents to improve retrieval.

## References from Raw_Content

Related raw clippings and videos (from Raw_Content) that informed this document:

- [Raw_Content/Clippings/RAG 0.md](Raw_Content/Clippings/RAG%200.md)
- [Raw_Content/Clippings/RAG 1 - RAG Faithfulness.md](Raw_Content/Clippings/RAG%201%20-%20RAG%20Faithfulness.md)
- [Raw_Content/Clippings/RAG 2 - Reducing Hallucination.md](Raw_Content/Clippings/RAG%202%20-%20Reducing%20Hallucination.md)
- [Raw_Content/Clippings/RAG 4 - What is RAG - Retrieval-Augmented Generation AI Explained.md](Raw_Content/Clippings/RAG%204%20-%20What%20is%20RAG%20-%20Retrieval-Augmented%20Generation%20AI%20Explained.md)
- [Raw_Content/Clippings/RAG 5 - What is Retrieval-Augmented Generation (RAG).md](Raw_Content/Clippings/RAG%205%20-%20What%20is%20Retrieval-Augmented%20Generation%20(RAG).md)
- [Raw_Content/Clippings/RAG 3 - RAG Explained For Beginners.md](Raw_Content/Clippings/RAG%203%20-%20RAG%20Explained%20For%20Beginners.md)
- [Raw_Content/Videos/RAG 3 - RAG Explained For Beginners.md](Raw_Content/Videos/RAG%203%20-%20RAG%20Explained%20For%20Beginners.md)
- [Raw_Content/Videos/RAG 6 - What is Retrieval-Augmented Generation (RAG).md](Raw_Content/Videos/RAG%206%20-%20What%20is%20Retrieval-Augmented%20Generation%20(RAG).md)
