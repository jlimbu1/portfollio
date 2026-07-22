import json
import re

def extract_json(response: str) -> dict:
    """
    Robustly extract JSON from a string that may contain markdown fences
    or extraneous text.
    """
    # Remove markdown code fences if present
    cleaned = re.sub(r'```(?:json)?\s*', '', response).strip()
    cleaned = cleaned.replace('```', '')

    # Find first { or [
    start = min(
        (cleaned.find('{'), cleaned.find('[')),
        key=lambda x: x if x != -1 else float('inf')
    )
    # Find last } or ]
    end_curly = cleaned.rfind('}')
    end_square = cleaned.rfind(']')
    end = max(end_curly, end_square)

    if start != -1 and end != -1 and start < end:
        candidate = cleaned[start:end+1]
        try:
            return json.loads(candidate)
        except Exception:
            pass

    # Fallback: try removing non-JSON prefix/suffix
    match = re.search(r'(\{.*\}|\[.*\])', response, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(1))
        except Exception:
            pass

    # Final attempt: try parsing the whole response after stripping
    stripped = response.strip()
    try:
        return json.loads(stripped)
    except Exception:
        pass

    raise ValueError(f"Failed to extract JSON from: {response[:500]}...")