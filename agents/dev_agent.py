import subprocess
import json
from .common import extract_json

def create_pr(branch: str, ticket_id: str, title: str, body: str = "") -> str:
    """
    Create a GitHub pull request using `gh pr create`.
    Returns the PR URL on success, raises on failure.
    """
    cmd = [
        "gh", "pr", "create",
        "--base", "main",
        "--head", branch,
        "--title", f"[{ticket_id}] {title}",
        "--body", body or f"Work on {ticket_id}"
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(f"PR creation failed: {result.stderr}")
    # gh pr create outputs the PR URL to stdout
    pr_url = result.stdout.strip()
    return pr_url

def process_ticket(ticket):
    """
    After pushing the branch, create a PR and update status.
    Returns tuple (new_status, pr_url).
    """
    branch_name = ticket.get("branch")
    ticket_id = ticket.get("ticket_id")
    title = ticket.get("title", "")
    try:
        pr_url = create_pr(branch_name, ticket_id, title)
        return "pushed", pr_url
    except Exception as e:
        return "push_failed", None