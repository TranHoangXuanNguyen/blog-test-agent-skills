## 1. Agent

An Agent is a specialized AI configuration that acts as a "colleague" with specific expertise (e.g., React Expert, DevOps Engineer, Research Assistant).

- **Characteristics:**
    - Possesses a distinct persona, role, or identity.
    - Has the capability to invoke external tools or MCP (Model Context Protocol) servers.
    - Often operates in a collaborative team model: Orchestrator, Planner, and Coder.
- **When to use:** Use an Agent when you have recurring workflows that require deep tool integration, proactive command execution, or persona-level guardrails that persist throughout an entire coding session.
    

## 2. Instruction

Instructions are the foundational rules and context that the AI reads whenever it works on a file or project. By establishing context upfront, Instructions can significantly optimize performance, reducing execution time (by approx. 28.6%) and token consumption (by approx. 16.6%).

Instructions generally fall into two categories based on their scope:

### A. Global Instructions

- **What it is:** The "constitution" of your entire repository (e.g., `.cursorrules` in the root folder, `CLAUDE.md`, `.github/copilot-instructions.md`).
    
- **Characteristics:** Always active for the whole project. It defines the universal Tech Stack (What), Project Purpose (Why), and Execution Rules (How).
    
- **When to use:** For long-term, repository-wide engineering standards, such as naming conventions, overall architectural decisions (e.g., "Always use 3-layer architecture"), and universal security rules (e.g., "Never hardcode secrets").
    

### B. Specific (Scoped) Instructions

- **What it is:** The "departmental rules." These are localized guidelines that only apply under certain conditions (e.g., a `.cursorrules` file placed inside a `/frontend` directory, or a `devops-instructions.md` file linked only to a specific DevOps Agent).
    
- **Characteristics:** Only loaded when the AI operates within that specific context, keeping the AI focused and saving token limits.
    
- **When to use:** When you need domain-specific rules (e.g., React hooks rules for the frontend folder, database query optimization rules for the backend folder) without polluting the global context.
    

## 3. Skills

Skills are reusable, self-contained packages of capabilities that include specific execution steps, scripts, and bundled assets.

- **Characteristics:**
    
    - Structured as standalone folders containing a `SKILL.md` file alongside optional assets (templates, scripts).
        
    - **Auto-discovery:** Agents can automatically find and invoke the appropriate Skill based on its metadata without manual triggering.
        
    - **Progressive Disclosure:** Details are only loaded into the AI's context window when the skill is actually needed, saving token usage.
        
- **When to use:** When you want to standardize how the AI responds to a highly specific, repeatable task, especially when that task requires bundled resources (like boilerplate code templates) or when building workflows that need to be portable across different AI coding systems.
    

## 4. Detailed Comparison

|**Feature**|**Agent**|**Instruction**|**Skills**|
|---|---|---|---|
|**Role**|Persona / Orchestrator|Conscience / Guardrails|Hands / Execution Tools|
|**State**|Session-based|Always-on (within its scope)|On-demand|
|**Content**|Configurations + Granted Tools|Plain text rules|Instructions + Scripts + Assets|
|**Trigger Mechanism**|Chosen/assigned by the user|Auto-matched by file, folder, or project|Auto-discovered by the Agent (or via `/command`)|
|**Real-world Analogy**|The Professional Chef|The Restaurant's Rulebook|The Kitchen Appliances|

## 5. How They Work Together

The true power of modern AI development lies in combining all three layers:

1. **Instructions** lay the groundwork with persistent guardrails and rules.
    
2. **Skills** provide rich, on-demand capabilities and resources.
    
3. **Agents** act as the highly-opinionated coordinators, bundling tools and rules into a specialized entity.
    

> **Example Workflow:**
> 
> A **"DevOps Agent"** will strictly follow the repository's Global **Instruction** to _"always run unit tests before deploying,"_ and when ready, it will automatically pull out the _"deploy-to-aws"_ **Skill** from its toolkit to execute the actual infrastructure update.