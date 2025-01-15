```mermaid
sequenceDiagram
    participant User
    participant Page
    participant Server

    User->>Page: Opens the Notes page
    Page->>User: Displays the text field and Save button
    User->>Page: Writes a note into the text field
    User->>Page: Clicks the Save button
    Page->>Server: Sends the new note to the server
    Server->>Page: Confirms note saved
    Page->>User: Displays the updated list of notes with the new note
