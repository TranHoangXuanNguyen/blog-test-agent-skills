*This is a submission for the [GitHub Finish-Up-A-Thon Challenge](https://dev.to/challenges/github-2026-05-21)*

## What I Built
<!-- Provide an overview of your project, where it started, and what it means to you. -->
AlkaFocus is a high-performance, mobile-first productivity engine engineered to help developers focus on what truly moves the needle. Far too many productivity apps treat all tasks equally, leading to cognitive fatigue and developers drowning in low-impact administrative work.

Built with **React Native (Expo Router), TypeScript, Zustand, and NativeWind (Tailwind CSS)**, AlkaFocus bridges the gap between structured time management and the 80/20 Pareto Principle. It forces you to isolate the critical 20% of engineering effort that yields 80% of your real results, tracking your daily momentum in real-time.

## Demo
<!-- Share a link to your project and include a video walkthrough or screenshots showing your application in action. -->

1. **Try the Code**

- GitHub Repository: [Tham khảo liên kết tại đây](https://github.com/alphonsekazadi/AlkaFocus)

- Expo Sandbox / Production APK: [https://expo.dev/accounts/alphonsekazadi/projects/AlkaFocus/builds/0035e608-fa6b-49f4-946a-87148bc5cbe5](https://expo.dev/accounts/alphonsekazadi/projects/AlkaFocus/builds/0035e608-fa6b-49f4-946a-87148bc5cbe5)


2.📱 **See It in Action**
[Tham khảo liên kết tại đây](https://youtube.com/shorts/YIHv4MkTzH0?si=4IY5oNKFblt6UhAB)

## The Comeback Story
<!-- Tell us where the project was before and what you changed, fixed, or added to finish it up. -->
**Where it Started**
AlkaFocus began as a personal passion project—an offline utility script that sat abandoned and unpolished in my GitHub repositories. It lacked routing, lacked state management persistence, and suffered from a rigid, non-scannable design layout. It was a classic "half-finished dev project" buried under a stack of Master's degree studies and software engineering workflows.

**The Transformation**
The **GitHub Finish-Up-A-Thon** was the ultimate catalyst to revive it. Over an intense development sprint, I refactored the entire architecture from the ground up:

- **State Store Overhaul**: Replaced local reactive loops with a persistent state engine via Zustand and AsyncStorage to ensure user task data safely survives device reloads.
- **Native Layout Engineering**: Migrated to Expo Router to structure a smooth, three-tab modular layout pipeline (Timeline, Timer, Review) with dynamic custom tab bars.
- **Hardware Styling Upgrades**: Built production-grade, hardware-pinned headers that stay perfectly static while views scroll smoothly beneath them.
- **A Fully Fluid Dynamic UI**: Programmed an instant Dark/Light mode toggle system that updates the entire visual language in real-time, complete with a hardware StatusBar listener to flip phone system icons dynamically on iOS and Android devices.

## My Experience with GitHub Copilot
<!-- Explain how GitHub Copilot supported your process. -->
As a developer balancing software architecture and cybersecurity research, speed and focus are my primary levers. GitHub Copilot acted as a top-tier pair-programmer throughout this entire crunch period, dramatically accelerating my development velocity.

**How Copilot Accelerated the Sprint:**

1. **Context-Aware Tailwind Layouts:** Copilot instantly accurately predicted deep utility string tokens for NativeWind, allowing me to build premium dark slate blocks (bg-slate-900) and handle light theme overrides without breaking native layout trees.
2. **Algorithmic Precision for Pareto Insights**: Writing the conditional analysis logic to evaluate a user’s performance arc was effortless. Copilot helped me seamlessly parse array elements inside the Zustand store to compute exact data insights, calculating if a developer is actually focusing on high-impact sprints or burying momentum in administrative noise. 
3. **Refactoring Safety:** When transitioning from a standard standard page routing configuration to a slide-up native presentation sheet modal (presentation: "modal"), Copilot helped me correctly map my core app layout tree constraints, saving me hours of local bundler troubleshooting.


![copilot](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3bpqzzse2vu86gsixrmn.png)

Thanks to Copilot, I cut boilerplate setup by **an estimated 70%, enabling me to focus 100%** of my cognitive energy on architectural design and mobile user experience.

<!-- Don't forget to add a cover image (if you want). -->

<!-- Team Submissions: Please pick one member to publish the submission and credit teammates by listing their DEV usernames directly in the body of the post. -->

<!-- Thanks for participating! -->