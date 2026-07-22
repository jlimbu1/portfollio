import json
from unittest.mock import Mock
from .common import extract_json

class PMAgent:
    """
    Placeholder for the actual PM agent class.
    """
    def plan(self, requirements: str) -> dict:
        # Simulated LLM call and JSON extraction
        llm_response = self._mock_llm(requirements)
        return extract_json(llm_response)

    def _mock_llm(self, requirements: str) -> str:
        return f'```json\n{{"ticket": "ABC-123", "title": "Implement feature"}}\n```'

# Test for extract_json using mock LLM responses
def test_extract_json():
    test_cases = [
        ('{"key": "value"}', {"key": "value"}),
        ('```json\n{"key": "value"}\n```', {"key": "value"}),
        ('Some text {"key": "value"} more text', {"key": "value"}),
        ('[1,2,3] extra', [1,2,3]),
        ('```\n[1,2,3]\n```', [1,2,3]),
        ('text before {"a": 1}', {"a": 1}),
        ('```json\n[{"a": 1}]\n``` extra', [{"a": 1}]),
    ]
    for response, expected in test_cases:
        result = extract_json(response)
        assert result == expected, f"Failed for {response!r}"

    # Test failure
    try:
        extract_json("No JSON here")
    except ValueError:
        pass
    else:
        raise AssertionError("Should have raised ValueError")

if __name__ == "__main__":
    test_extract_json()
    print("All extract_json tests passed.")