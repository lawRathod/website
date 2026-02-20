---
title: "Membership Inference Attacks on Graph Neural Networks"
date: "2025-09-11"
description: "Implementing a framework to test how vulnerable Graph Neural Networks are to membership inference attacks - can attackers determine if your data was used to train a model?"
tags: ["machine-learning", "privacy", "gnn", "security", "pytorch"]
published: true
---

# Can Your Graph Neural Network Keep a Secret? Exploring Membership Inference Attacks on GNNs

Machine learning models are increasingly being trained on sensitive data, social networks, medical records, financial transactions. But here's an uncomfortable question: can an attacker figure out whether _your_ data was used to train a model just by querying it?

This is the core question behind **Membership Inference Attacks (MIA)**, and in this project, I implemented a framework to test how vulnerable Graph Neural Networks are to this privacy threat.

## The Problem: Privacy Leakage in GNNs

Graph Neural Networks have become the go-to architecture for learning on relational data, social networks, citation graphs, biological networks. But their very strength, leveraging neighborhood information, might also be their weakness.

When a GNN is trained on a graph, it learns patterns from the training nodes. The hypothesis is that the model behaves _differently_ on data it has seen during training versus data it hasn't. An attacker can exploit this difference to infer membership.

## The Approach: Train on Subgraph, Test on Subgraph (TSTS)

I implemented the TSTS methodology from [this research paper](https://arxiv.org/abs/2101.06570). The attack works as follows:

1. **Target Model**: Train a GNN on the actual training data (the model we want to attack)
2. **Shadow Model**: Train a similar GNN on synthetic data that mimics the real distribution
3. **Attack Model**: Train a binary classifier that learns to distinguish "in training" vs "out of training" based on model outputs

The key insight is that the shadow model helps the attacker learn what "training data behavior" looks like, even without access to the actual training data.

## Implementation Highlights

### Supported GNN Architectures

The framework supports four popular GNN architectures:

- **GCN** (Graph Convolutional Network) , The classic spectral approach
- **GAT** (Graph Attention Network) , Attention-based message passing
- **GraphSAGE** , Sampling-based inductive learning
- **SGC** (Simplified Graph Convolution) , Efficient linear approximation

### Advanced Feature Engineering

One contribution of this implementation is enhanced feature engineering for the attack model. Beyond basic node features, I compute:

- **Degree statistics**: In-degree, out-degree, normalized degree
- **Clustering coefficients**: Local clustering and triangle counts
- **Centrality indicators**: Hub, leaf, and isolated node flags
- **Ego-network features**: Aggregated neighbor statistics
- **Feature interactions**: Degree-weighted feature combinations

These features help the attack model capture subtle differences in how the target model treats training vs. non-training nodes.

### Improved Attack Model

The baseline attack model achieved ~70-75% accuracy. I developed an improved version with:

- 5-layer architecture with BatchNorm and Dropout
- Temperature scaling for better-calibrated posteriors
- Learning rate scheduling for stable convergence

This pushed attack accuracy to **80-85%** in some configurations.

## Datasets

The framework works with both standard benchmarks and custom social network data:

**Standard Datasets**: Cora, CiteSeer, PubMed, Flickr, Reddit

**Custom Datasets**:

- **Twitch**: Streamer networks with affiliate status prediction
- **Event**: Social event networks with gender prediction

Each custom dataset contains ~256 subgraphs with ~120 nodes each, split into training, non-training, and synthetic subsets.

## Results Summary

| Model | Dataset | Attack Accuracy | AUROC |
| ----- | ------- | --------------- | ----- |
| GAT   | Twitch  | 48-52%          | ~0.50 |
| GAT   | Event   | 48-52%          | ~0.50 |
| GCN   | Twitch  | 50-55%          | ~0.52 |
| SAGE  | Event   | 48-50%          | ~0.49 |

Interestingly, the attack performance varies significantly across configurations. Some subgraphs are highly vulnerable (attack correctly identifies 96% of training samples) while others are resistant.

## Key Takeaways

1. **GNNs do leak membership information**, though the extent varies by architecture and data
2. **Feature engineering matters**, advanced graph features significantly improve attack success
3. **Model calibration is crucial**, temperature scaling helps the attack model learn better decision boundaries
4. **Not all data is equally vulnerable**, some subgraphs/nodes are more susceptible than others

## What's Next?

This framework provides a foundation for:

- Testing new GNN architectures for privacy vulnerabilities
- Developing and evaluating defense mechanisms (differential privacy, regularization)
- Understanding what makes certain data more vulnerable to membership inference

## Try It Yourself

The full code is available on [GitHub](https://github.com/lawRathod/uni-project-dec).

The code is organized into three main components:

```
bridge.py          → Data format conversion (pickle → PyG)
rebmi_adapter.py   → Feature engineering & data organization
TSTS.py            → Main attack pipeline
```

Configure your experiment in `TSTS.py`:

```python
model_type = "GAT"              # GCN/GAT/SAGE/SGC
data_type = "Custom_Event"      # Dataset selection
CUSTOM_ADVANCED_FEATURES = True # Enhanced features
USE_IMPROVED_ATTACK = True      # Improved attack model
```

---

_This project was completed as part of my university coursework, implementing and extending the methodology from "Membership Inference Attack on Graph Neural Networks" (arXiv:2101.06570)._
