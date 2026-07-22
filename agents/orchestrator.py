import subprocess
import json

def check_missing_prs(tickets, status="pushed"):
    """
    Check via `gh pr list` if any tickets in the given status have no open PRs.
    Returns list of tickets that need manual PR.
    """
    # Get all open PRs
    pr_output = subprocess.run(
        ["gh", "pr", "list", "--json", "headRefName"],
        capture_output=True, text=True, check=True
    )
    open_branches = set()
    for pr in json.loads(pr_output.stdout):
        open_branches.add(pr.get("headRefName"))

    needs_manual = []
    for ticket in tickets:
        branch = ticket.get("branch")
        if ticket.get("status") == status and branch not in open_branches:
            needs_manual.append(ticket)
    return needs_manual

def dispatch_lead_agent(tickets, previous_lead_dispatched_for_deadlock=False):
    """
    Dispatch the Lead agent only if there are tickets ready and avoid deadlock.
    """
    # Step 1: Check for pushed tickets with no PRs
    stuck_tickets = check_missing_prs(tickets, "pushed")
    if stuck_tickets:
        # Mark them as needs_manual_pr and skip Lead dispatch
        for t in stuck_tickets:
            t["status"] = "needs_manual_pr"
            print(f"Marked ticket {t['ticket_id']} as needs_manual_pr due to missing PR.")
        return  # skip Lead this cycle

    # Step 2: Find tickets that should be reviewed (e.g., in review status)
    # Placeholder logic for dispatch
    # ...