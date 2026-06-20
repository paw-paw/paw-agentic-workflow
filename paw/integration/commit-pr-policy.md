# Commit and Change-Request Prompt

Use this prompt when an agent needs the compact PAW integration policy for a
governed patch:

```text
Use one working branch and one primary change request for this patch unless a
governed decision says otherwise. Keep commits intentional and traceable to the
active patch. Create the baseline SDD commit before phase execution, one or more
coherent commits per closed phase, and a separate closure commit. Do not publish
WIP, rewrite history, force-push, stash, reset, clean, or merge unless the human
explicitly approves that operation. Treat the change request as communication and
evidence, not as PAW authority. Remote checks count only for the exact current
head SHA, and merge remains human.
```

