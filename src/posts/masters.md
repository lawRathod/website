---
title: "Master's in Informatik – Coursework & Technical Archive"
date: "2026-02-20"
description: "A structured academic record of courses completed during my Master's degree at RPTU Kaiserslautern, covering distributed systems, security, machine learning, and more"
tags: ["masters", "coursework", "academic"]
published: true
toc: true
tocTags: '["h1", "h2"]'
---

This document is a structured academic record of the courses I completed during my Master’s degree at [_RPTU Kaiserslautern_](https://rptu.de/) and the key systems, concepts, and implementations I worked on.  
It serves as a comprehensive archive of my coursework.

---

# Academic Timeline

## Winter Semester 2023/24 (1st Semester)

- Network Security
- Protocols and Algorithms for Network Security
- Database Systems
- Very Deep Learning – Recent Methods and Technologies
- Social Web Mining

---

## Summer Semester 2024 (2nd Semester)

- Machine Learning I
- Verification of Reactive Systems
- Performance and Security Analysis

---

## Winter Semester 2024/25 (3rd Semester)

- Decentralized Systems
- Worst-Case Analysis of Distributed Systems
- OS-Based Programming of Embedded Systems
- Seminar: Privacy and Security
- Programming Distributed Systems

---

## Summer Semester 2025 (4th Semester)

- Distributed Data Management
- Human-Computer Interaction
- Practical Machine Learning & NLP with AWS
- Engineering with Generative AI
- Project: Secure Decentralized Systems

---

# Distributed Systems & Infrastructure

## Programming Distributed Systems

**Project: MiniDote – Distributed Key-Value Store**  
Repository: <https://github.com/lawRathod/minidote>

<!-- Report: [MiniDote Project Report – To Be Added] -->

### Covered Topics

- RPC / gRPC-based inter-node communication
- Replication and synchronization mechanisms
- Crash failure models
- Network partition simulation
- Consistency vs availability trade-offs
- Distributed testing methodologies

### What I Implemented

- A replicated distributed key-value store
- Inter-node synchronization logic
- Failure scenario simulations
- Convergence and correctness evaluation under partial failures

---

## Distributed Data Management

### Covered Topics

- Data sharding and partitioning strategies
- Replication models
- Distributed transactions
- Storage consistency models
- Trade-offs between performance and correctness

---

## Worst-Case Analysis of Distributed Systems

### Covered Topics

- Adversarial and worst-case system modeling
- Latency bounds under failures
- Formal reasoning about distributed correctness
- Resilience analysis under constrained system assumptions

---

# Decentralized & Secure Systems

## Decentralized Systems

**Project: IPFS Lab & Kubo Modification**  
Repository: <https://github.com/lawRathod/ipfs-lab>

<!-- Report: [IPFS Lab Report – To Be Added] -->

### Covered Topics

- Peer-to-peer networking architectures
- Content-addressable distributed storage
- Peer discovery and bootstrapping mechanisms
- Distributed topology formation
- Network convergence behavior

### Additional Work

- Patched Kubo (IPFS implementation) to disable automatic bootstrapping
- Conducted controlled peer topology experiments
- Evaluated replication and connectivity dynamics
- Observed network behavior under constrained bootstrap conditions

---

## Project: Secure Decentralized Systems

Repository: <https://github.com/lawRathod/uni-project-dec>

<!-- Report: [Secure Decentralized Systems Report – To Be Added] -->

### Covered Topics

- Threat modeling for distributed systems
- Secure multi-node architecture design
- Authentication and communication integrity
- Adversarial resilience evaluation
- Secure protocol integration

---

## Network Security

### Covered Topics

- TLS and secure channel establishment
- Authentication mechanisms
- Secure API design principles
- Network threat modeling

---

## Protocols and Algorithms for Network Security

### Covered Topics

- Cryptographic protocol construction
- Secure key exchange mechanisms
- Protocol-level security analysis
- Formal reasoning about secure communication
- Security-performance trade-offs

---

## Seminar: Privacy and Security

<!-- Report: [Asynchronous Vertical Federated Learning Survey – To Be Added] -->

### Seminar Focus

Asynchronous Vertical Federated Learning (AVFL)

### Covered Topics

- Federated learning paradigms (horizontal vs vertical)
- Vertically partitioned collaborative training
- Asynchronous model update mechanisms
- Delayed gradient challenges
- Resource heterogeneity in distributed learning systems
- Communication constraints in federated environments

### Methods Studied

- Asynchronous Stochastic Gradient Descent (ASGD)
- Variance reduction techniques (SVRG, SAGA)
- Gradient prediction via Taylor approximations
- Secure aggregation protocols
- Cryptographic privacy-preserving mechanisms

### Key Observations

- Trade-offs between efficiency, accuracy, and privacy
- Convergence behavior under asynchronous updates
- Communication-efficient optimization strategies
- Resource utilization improvements over synchronous approaches
- Architectural considerations for scalable privacy-preserving learning

---

# Systems Performance & Verification

## Performance and Security Analysis

### Covered Topics

- Latency and throughput benchmarking
- Profiling distributed systems
- Bottleneck identification
- Performance tuning methodologies
- Security-performance interaction analysis

---

## Verification of Reactive Systems

### Covered Topics

- Model checking
- State machine verification
- Formal correctness guarantees
- Specification validation of reactive systems

---

## OS-Based Programming of Embedded Systems

### Covered Topics

- Concurrency primitives
- Resource-constrained systems programming
- Low-level memory and hardware interaction
- Real-time execution considerations

---

# Machine Learning & AI Systems

## Machine Learning I

### Covered Topics

- Supervised learning algorithms
- Model evaluation techniques
- Regularization and optimization
- Bias-variance trade-offs
- Generalization analysis

---

## Very Deep Learning – Recent Methods and Technologies

### Covered Topics

- Transformer architectures
- Deep neural optimization strategies
- Scaling considerations for large models
- Compute and memory trade-offs
- Empirical evaluation of architectures

---

## Practical Machine Learning & NLP with AWS

### Covered Topics

- Cloud-based ML deployment
- Model serving architectures
- CI/CD pipelines for ML workflows
- Monitoring and scaling ML systems
- Infrastructure considerations for production ML

---

## Engineering with Generative AI

**Project: Generative AI Portfolio**  
Repository: <https://github.com/lawRathod/gen-ai-portfolio>

### Covered Topics

- LLM orchestration patterns
- Prompt engineering strategies
- Structured output generation
- Inference pipeline design
- Latency-aware model integration

### What I Built

- Modular LLM-based applications
- Inference workflows integrating external APIs
- Evaluation mechanisms for output reliability

---

## Social Web Mining

### Covered Topics

- Large-scale data collection methods
- Feature extraction pipelines
- Data preprocessing and cleaning
- Statistical analysis of heterogeneous and noisy datasets

---

# Databases & Human-Centered Systems

## Database Systems

### Covered Topics

- Indexing strategies
- Query optimization
- Storage engine fundamentals
- Transaction isolation levels
- Database performance considerations

---

## Human-Computer Interaction

### Covered Topics

- Usability evaluation methods
- Interface design principles
- User-centered system design
- Interaction modeling and evaluation techniques

---

# Core Themes Across the Degree

- Distributed systems implementation
- Replication and synchronization
- Secure multi-node architectures
- Performance benchmarking and tuning
- Fault tolerance modeling
- Privacy-preserving distributed learning
- Cloud-based ML deployment
- Deep learning and generative AI systems
- Protocol-level security reasoning
- Low-level systems programming
