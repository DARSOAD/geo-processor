from __future__ import annotations
from typing import Dict, Type, Callable, Protocol, Sequence
from app.schemas.coordinates import Point

class CentroidStrategy(Protocol):
    def compute(self, points: Sequence[Point]) -> Point: ...

# --- Registry ---
_STRATEGY_REGISTRY: Dict[str, Type[CentroidStrategy]] = {}

def register_strategy(*names: str) -> Callable[[Type[CentroidStrategy]], Type[CentroidStrategy]]:
    """
    Decorator to register strategies under one or more aliases.
    Usage: @register_strategy("simple", "avg")
    """
    def _decorator(cls: Type[CentroidStrategy]) -> Type[CentroidStrategy]:
        for raw in names:
            key = raw.strip().lower()
            if key in _STRATEGY_REGISTRY:
                raise ValueError(f"Strategy already registered: {key}")
            _STRATEGY_REGISTRY[key] = cls
        return cls
    return _decorator

# --- Factory ---
def get_strategy(name: str | None, *, default: str = "simple") -> CentroidStrategy:
    key = (name or default).strip().lower()
    cls = _STRATEGY_REGISTRY.get(key) or _STRATEGY_REGISTRY.get(default)
    if cls is None:
        raise LookupError(f"No strategy registered for '{key}' and no default '{default}'")
    return cls()
