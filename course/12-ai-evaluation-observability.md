# Module 10: AI Evaluation, Testing & Observability

## Module Purpose

This module separates beginners from professionals.

A beginner says, "The AI answered." A professional asks whether extraction was correct, retrieval found the right evidence, citations were valid, latency was acceptable, cost stayed within budget, and failures were observable.

## Learning Outcomes

By the end of this module, you should be able to:

- explain why AI testing is different from normal testing
- build golden datasets
- evaluate extraction accuracy
- evaluate RAG retrieval and answer quality
- track citation correctness
- test hallucination behavior
- run prompt regression tests
- compare models
- track latency, tokens, and cost
- design a quality dashboard

## Final Mini Build

Add an evaluation layer:

- golden test documents
- expected extraction JSON
- expected Q&A answers
- retrieval quality checks
- citation checks
- prompt version tracking
- usage and latency logs
- quality dashboard plan

---

## 10.1 Why AI Testing Is Different

Normal code has deterministic outputs. AI outputs can vary.

You test:

- correctness
- consistency
- groundedness
- cost
- latency
- failure handling
- regressions after prompt changes

## 10.2 What Are Evals?

Evals are repeatable tests for AI behavior.

They answer:

- did the extraction match expected fields?
- did retrieval find the right chunk?
- did the answer cite correct pages?
- did the model refuse when evidence was missing?

## 10.3 Golden Datasets

A golden dataset contains inputs and expected outputs.

Example:

```json
{
  "document": "invoice_001.pdf",
  "expected": {
    "invoice_number": "INV-001",
    "total_amount": 42000
  }
}
```

## 10.4 Extraction Evaluation

Measure:

- exact match for invoice numbers
- date match
- amount tolerance
- missing field rate
- false extraction rate
- validation pass rate

## 10.5 RAG Evaluation

RAG evaluation checks retrieval and generation separately.

Retrieval question:

```text
Did we retrieve the chunk containing the answer?
```

Generation question:

```text
Did the model answer correctly using that chunk?
```

## 10.6 Retrieval Precision

Precision asks:

```text
Of the chunks retrieved, how many were relevant?
```

High precision means users see less noise.

## 10.7 Answer Faithfulness

Faithfulness means the answer is supported by the sources.

If the source says "Net 30" and the answer says "Net 45", faithfulness failed.

## 10.8 Citation Correctness

Citation correctness checks whether citations point to the actual source of the answer.

Bad citations are worse than no citations because they create false trust.

## 10.9 Hallucination Testing

Create questions where the answer is absent.

Expected behavior:

```text
The document does not contain that information.
```

## 10.10 Prompt Regression Testing

When prompts change, run old test cases.

Store:

- prompt version
- model
- input
- output
- pass/fail
- error category

## 10.11 Model Comparison

Compare models on:

- extraction accuracy
- citation quality
- latency
- cost
- JSON validity
- refusal behavior

Pick models by product fit, not hype.

## 10.12 Cost Tracking

Track cost per:

- workspace
- document
- workflow
- feature
- model
- user

Cost surprises can kill SaaS margins.

## 10.13 Latency Tracking

Track:

- parse time
- embedding time
- retrieval time
- LLM time
- total workflow time

Slow workflows need status updates or background jobs.

## 10.14 Token Usage Tracking

Store:

- prompt tokens
- completion tokens
- total tokens
- model name
- feature
- prompt version

Do not log sensitive document text by default.

## 10.15 Logging Prompts Safely

Safe logging:

- prompt version
- model
- token counts
- document type
- error category

Avoid logging full document contents unless explicitly redacted and approved.

## 10.16 Trace Debugging

Trace a request across:

- frontend action
- backend API
- queue job
- AI service
- provider call
- database update

Traces reveal where failures actually happen.

## 10.17 User Feedback Collection

Feedback buttons:

- helpful
- not helpful
- wrong citation
- missing answer
- wrong extraction

Feedback becomes future eval data.

## 10.18 Quality Dashboard

Dashboard metrics:

- extraction accuracy
- RAG answer pass rate
- citation correctness
- hallucination failures
- average latency
- token cost
- failed jobs
- review queue size

## 10.19 Production Monitoring

Monitor:

- queue depth
- API error rate
- provider failures
- timeout rate
- cost spikes
- slow documents
- failed parsing

## 10.20 Evaluation Interview Questions

Strong answer:

"I evaluate the pipeline in parts: parser output, retrieval relevance, answer faithfulness, citation correctness, extraction accuracy, latency, cost, and prompt regressions."

## Capstone Scope For Module 10

Recommended files:

```text
evals/
  datasets/
  expected/
  run_extraction_eval.py
  run_rag_eval.py
app/
  services/
    usage_tracking.py
```

## Module 10 Assignment

Build:

- five golden invoice cases
- five contract Q&A cases
- extraction scoring script
- citation correctness checker
- usage event model

Acceptance criteria:

- evals are repeatable
- prompt version is recorded
- failures are categorized
- cost and latency are logged

## Quiz

1. Why are AI evals needed?
2. What is a golden dataset?
3. Why evaluate retrieval separately from generation?
4. What is answer faithfulness?
5. Why are citation checks important?
6. What should you track for cost?

## Answer Key

1. AI behavior is variable and needs repeatable quality checks.
2. A set of inputs with expected outputs.
3. Bad answers can come from retrieval failure or generation failure.
4. Whether the answer is supported by sources.
5. Wrong citations create false trust.
6. Tokens, model, feature, workflow, user, workspace, latency, and status.

## Interview Questions

1. How would you evaluate invoice extraction?
2. How would you evaluate RAG?
3. How do you detect hallucination?
4. How do prompt regression tests work?
5. How do you monitor AI cost in production?

## Source Links

- OpenTelemetry: https://opentelemetry.io/docs/
- pytest documentation: https://docs.pytest.org/
- scikit-learn metrics: https://scikit-learn.org/stable/modules/model_evaluation.html
- LangSmith concepts: https://docs.smith.langchain.com/
