```mermaid
sequenceDiagram
    participant User
    participant SPA
    participant Server

    User->>SPA: Opens the SPA Notes page
    SPA->>User: Displays the user interface (text field, list of notes, Save button)
    User->>SPA: Writes a new note into the text field
    User->>SPA: Clicks the Save button
    SPA->>Server: Sends the new note to the server
    Server->>SPA: Confirms the note is saved
    SPA->>User: Displays the updated list of notes with the new note
