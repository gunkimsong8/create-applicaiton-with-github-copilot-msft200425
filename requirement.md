## Build a Next.js Application for Book Recommendation

**Goal:**  
Create a simple Next.js application that recommends books based on a user's mood or intent.

---

### Requirements

- Use **Next.js App Router** and **React (Client Component)**.
- Build everything **client-side only**, no backend or database.
- Use a **static list** of 5–10 books, where each book has:
  - `title`: string
  - `tags`: array of mood/genre keywords
  - `summary`: short synopsis text

---

### UI/UX Requirements

- Clean and centered page layout.
- Use **Tailwind CSS** (or minimal custom styling).
- Display:
  - A **large input box** for user to type feelings or mood (e.g., "magical", "motivated").
  - A **Search button** next to the input field.
  - A **Results section** below showing matched books.
- Each recommended book should show:
  - Title (**bold**, bigger text)
  - Summary (**small text**, muted gray color)
- If no books match, display a friendly message:  
  `"No books match your mood. Try different words!"`

---

### Functional Requirements

- When the user submits:
  - Extract keywords from the input.
  - Perform **partial matching** (e.g., "magic" matches "magical") between user input and book tags.
  - Return and display the matching books dynamically.
- If multiple books match, show all relevant matches.

---

### Constraints

- No database or API required (static in-memory data only).
- Write clean, modular, readable code.
- Keep everything minimal but elegant, suitable for live demonstration.

