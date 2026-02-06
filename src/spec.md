# Specification

## Summary
**Goal:** Make the chat backend recognize common positive/thank-you words in user messages (case-insensitive, including within sentences and with punctuation) and respond with a friendly acknowledgment, while keeping existing topic-specific responses unchanged.

**Planned changes:**
- Update the Motoko `answerQuestion(question : Text)` handler to detect positive/thank-you keywords (e.g., “nice”, “good”, “excellent”, “great”, “thanks”) case-insensitively, including punctuation-adjacent and sentence-embedded matches, and return a friendly acknowledgment response when detected.
- Add a new example prompt button in the chat UI that uses a positive/thank-you phrase (e.g., “Thanks” / “Great job”) and fills the input when clicked.

**User-visible outcome:** Users can type (or click an example prompt containing) “thanks”/“great”/similar phrases in any casing and get a friendly acknowledgment response, while other existing chat responses continue to work as before.
