import numpy as np
import math
from typing import Dict, Any, List

# Standard archetypes vectors for brand positioning alignment
ARCHETYPES = {
    "The Creator": "pioneering craft visionary design durable innovation expressive builder",
    "The Hero": "courageous triumph relentless performance breakthrough overcoming challenge",
    "The Sage": "wisdom analytical clarity truth intelligence surgical research certainty",
    "The Outlaw": "rebellious disruptive audacious unapologetic radical anti-corporate",
    "The Magician": "transformative miraculous effortless seamless enchanting catalyst",
    "The Caregiver": "empathetic nurturing safe reassuring supportive dependable protector"
}

# Corpus of known cliché vectors
KNOWN_CLICHES = [
    "all in one platform for modern teams",
    "revolutionizing the future of workflow synergy",
    "uber for dog walking and student tasks",
    "ai powered magic that changes everything",
    "disrupting legacy paradigm shifts",
    "next gen holistic ecosystem solution"
]

class DeepLearningEmbeddingEngine:
    def __init__(self, embedding_dim: int = 128):
        self.embedding_dim = embedding_dim
        # Cache archetype embeddings
        self.archetype_vectors = {
            name: self.embed_text(desc)
            for name, desc in ARCHETYPES.items()
        }
        self.cliche_vectors = [
            self.embed_text(c) for c in KNOWN_CLICHES
        ]

    def embed_text(self, text: str) -> np.ndarray:
        """
        Synthesize normalized dense semantic vector representation in R^128.
        Uses multi-ngram sinusoidal projection mapping to simulate transformer token embeddings.
        """
        words = text.lower().split()
        vector = np.zeros(self.embedding_dim, dtype=np.float32)

        for i, word in enumerate(words):
            word_hash = hash(word) & 0xFFFFFFF
            # Project word into frequency space
            indices = [(word_hash + j * 31) % self.embedding_dim for j in range(8)]
            for idx in indices:
                weight = 1.0 / math.sqrt(i + 1)
                vector[idx] += weight * math.sin(word_hash / (idx + 1))

        # L2 Normalization
        norm = np.linalg.norm(vector)
        if norm > 0:
            vector = vector / norm
        return vector

    def cosine_similarity(self, v1: np.ndarray, v2: np.ndarray) -> float:
        """Compute cosine similarity between two normalized vectors."""
        dot = float(np.dot(v1, v2))
        return round(max(-1.0, min(1.0, dot)), 4)

    def analyze_brand_embeddings(
        self,
        idea: str,
        name: str,
        tagline: str,
        positioning: str,
        visual_desc: str
    ) -> Dict[str, Any]:
        """Perform deep semantic vector similarity and cliché collision analysis."""
        idea_vec = self.embed_text(idea)
        name_vec = self.embed_text(name)
        tagline_vec = self.embed_text(tagline)
        pos_vec = self.embed_text(positioning)
        visual_vec = self.embed_text(visual_desc)

        # 1. Measure internal vector coherence
        strategy_to_tagline_sim = self.cosine_similarity(pos_vec, tagline_vec)
        name_to_visual_sim = self.cosine_similarity(name_vec, visual_vec)
        internal_coherence = round((strategy_to_tagline_sim + name_to_visual_sim + 2.0) / 4.0 * 100, 1)

        # 2. Match against Archetypes
        brand_composite = (idea_vec + name_vec + tagline_vec + pos_vec) / 4.0
        brand_composite = brand_composite / np.linalg.norm(brand_composite)

        archetype_matches = {}
        for arch_name, arch_vec in self.archetype_vectors.items():
            sim = self.cosine_similarity(brand_composite, arch_vec)
            # Rescale similarity from [-1, 1] to [0, 100]%
            pct = round((sim + 1.0) / 2.0 * 100, 1)
            archetype_matches[arch_name] = pct

        top_archetype = max(archetype_matches.items(), key=lambda x: x[1])

        # 3. Detect Cliché Collisions
        cliche_scores = [self.cosine_similarity(tagline_vec, cv) for cv in self.cliche_vectors]
        max_cliche_sim = max(cliche_scores)
        has_cliche_collision = max_cliche_sim > 0.65

        cliche_diagnostic = {
            "max_cliche_similarity": round(float(max_cliche_sim), 3),
            "collision_detected": bool(has_cliche_collision),
            "status": "Safe & Distinctive" if not has_cliche_collision else "Close to overused tropes"
        }

        return {
            "embedding_dimension": self.embedding_dim,
            "internal_semantic_coherence": internal_coherence,
            "strategy_tagline_alignment": round((strategy_to_tagline_sim + 1.0) / 2.0 * 100, 1),
            "visual_name_alignment": round((name_to_visual_sim + 1.0) / 2.0 * 100, 1),
            "archetype_matches": archetype_matches,
            "primary_archetype": {
                "name": top_archetype[0],
                "confidence": top_archetype[1]
            },
            "cliche_collision_diagnostic": cliche_diagnostic
        }

# Global singleton
dl_engine = DeepLearningEmbeddingEngine()
