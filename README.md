# CampusShare — A Campus Resource Borrowing and Sharing Platform

**CampusShare** is a proposed web application for university students to share useful campus items. A student can list an item they are willing to lend, browse and search listings, request to borrow an item, and track the request and return status. An administrator can manage users and item categories and review reports.

> **Current project status:** This repository contains the project proposal, system-design diagrams, and an interactive front-end prototype. The complete Java Spring Boot and MySQL application is planned for a later development stage; it has **not** been implemented yet. Prototype interactions use sample data and do not represent a live backend.

## 1. Problem and proposed solution

Students sometimes need items such as textbooks, calculators, stationery, lab accessories, or sports equipment for a short period. Buying an item for temporary use may be expensive, while other students may already own one that is not currently being used. Informal sharing can also make it difficult to know what is available, keep track of requests, confirm returns, or report a problem.

CampusShare proposes one place to publish available items and manage the borrowing process. The proposal defines the requirements, planned software process, system architecture, data model, diagrams, schedule, and testing approach. The included prototype gives an initial visual demonstration of the main screens.

## 2. Objectives

- Define the system requirements for students and administrators.
- Design the main workflows and data structures before implementation.
- Provide the six requested diagram types: DFD, use case, activity, ERD, class, and object diagrams.
- Demonstrate the planned user interface with an initial interactive prototype.
- Plan a manageable, six-week development schedule using the Incremental Model.
- Prepare a clear foundation for later implementation, testing, and project delivery.

## 3. Scope and main features

### Student features (planned)

- Register and sign in to the application.
- Create, edit, browse, search, and manage item listings.
- Filter listings by category and availability.
- Submit a borrowing request for an item.
- Approve or reject requests for items the student owns.
- Track an approved borrowing transaction and confirm a return.
- Leave a review after a completed borrowing and report an item or issue.

### Administrator features (planned)

- Manage student accounts.
- Manage item categories.
- Review reports and record their resolution.

### Outside the current scope

The current proposal does not include online payments, real-time chat, AI recommendations, microservices, or other advanced add-ons. Authentication, database persistence, server-side validation, and the complete backend are planned implementation work, not features that are already live in this repository.

## 4. User roles and core workflow

| Role | Responsibilities |
|---|---|
| Student / item owner | List items, maintain listings, review incoming requests, approve or reject requests, and confirm returns. |
| Student / borrower | Search for an item, request to borrow it, check request status, return it, and optionally leave a review. |
| Administrator | Manage users and categories and review reported items. |

**Typical borrowing flow:** a student browses available items and opens an item detail page → submits a request → the owner approves or rejects it → an approved request becomes a borrowing transaction → the item is returned and the transaction is marked as returned. The proposal and diagrams describe this planned workflow; the prototype simulates it using sample data.

## 5. Planned technology and architecture

| Area | Planned technology / approach |
|---|---|
| Programming language | Java |
| Web framework | Spring Boot and Spring MVC |
| Persistence | Spring Data JPA / Hibernate and MySQL |
| Views | Thymeleaf, HTML, CSS, Bootstrap |
| Build | Maven |
| Version control and submission | Git and GitHub |
| Architecture | Simple layered architecture: controllers → services → repositories/entities → MySQL |
| Development process | Incremental Model, planned over six weeks |

The prototype currently uses HTML, CSS, Bootstrap via CDN, and JavaScript. It is separate from the planned Spring Boot application and does not require a database.

## 6. Repository contents

```text
CampusShare/
├── README.md
├── proposal/
│   ├── main.tex            LaTeX source of the proposal
│   ├── references.bib      Bibliography entries
│   └── main.pdf            Compiled proposal
├── diagrams/
│   ├── dfd_context.mmd     DFD context-level source
│   ├── dfd_level1.mmd      DFD Level 1 source
│   ├── use_case.puml       Use case diagram source
│   ├── activity.puml       Activity diagram source
│   ├── erd.mmd             Entity relationship diagram source
│   ├── class_diagram.puml  Class diagram source
│   ├── object_diagram.puml Object diagram source
│   └── *.png               Rendered diagram images used for review
└── prototype/
    ├── index.html          Prototype page structure
    ├── styles.css          Prototype styling
    └── script.js           Sample data and simulated interactions
```

The source files are included so the diagrams and proposal can be reviewed or updated. PNG renders are included for quick viewing without installing diagram tools.

## 7. Where the assignment requirements are addressed

Use this table as a guide to the submitted materials. The proposal PDF is the main document; the folders provide the editable sources and demonstration files.

| Assignment requirement | Where to find it | What it contains |
|---|---|---|
| Project proposal and problem definition | `proposal/main.pdf` — Introduction, Problem Statement, Aim and Objectives, Project Scope | Background, problem being addressed, goals, and project boundaries. |
| Requirements and user roles | `proposal/main.pdf` — Stakeholders and User Roles, Functional Requirements, Non-Functional Requirements | Planned system users, capabilities, and quality expectations. |
| Software process model | `proposal/main.pdf` — Software Development Methodology | The Incremental Model and its suitability for the project. |
| System architecture and technology | `proposal/main.pdf` — Proposed System Architecture and Technology Stack | Planned layered architecture and selected technologies. |
| DFD | `proposal/main.pdf` — System Design; `diagrams/dfd_context.mmd`, `diagrams/dfd_level1.mmd` | System context and a Level 1 breakdown of the main processes and data flows. |
| Use case diagram | `diagrams/use_case.puml` and `diagrams/use_case.png`; also in the proposal PDF | The main actors and the functions they can use. |
| Activity diagram | `diagrams/activity.puml` and `diagrams/activity.png`; also in the proposal PDF | The planned borrowing workflow, including the approval/rejection decision. |
| ERD / database design | `diagrams/erd.mmd` and `diagrams/erd.png`; proposal section Basic Database Design | Planned entities, keys, relationships, and database structure. |
| Class diagram | `diagrams/class_diagram.puml` and `diagrams/class_diagram.png`; also in the proposal PDF | The planned domain classes and their relationships. |
| Object diagram | `diagrams/object_diagram.puml` and `diagrams/object_diagram.png`; also in the proposal PDF | An example snapshot of objects and links at a particular point in the system. |
| UI prototype using at least five domain classes | `prototype/`; proposal section UI Prototype Overview | Screens and simulated interactions mapped to the planned classes; see the class-coverage table below. |
| Schedule and Gantt chart | `proposal/main.pdf` — Six-Week Development Schedule | The proposed six-week task plan and Gantt chart. |
| Milestones and deliverables | `proposal/main.pdf` — Milestones and Deliverables | Checkpoints and expected outputs across the project timeline. |
| Testing strategy and risks | `proposal/main.pdf` — Basic Testing Strategy, Risk Analysis and Mitigation | Planned checks for core workflows and the main project risks with mitigations. |
| References | `proposal/references.bib` and references section in the PDF | Bibliographic source entries used by the proposal. |

## 8. UI prototype and class coverage

### How to open it

1. Extract the repository folder if it is still inside `CampusShare.zip`.
2. Open `prototype/index.html` in a modern browser.
3. If needed, run a local web server from the `prototype` folder:

   ```bash
   cd prototype
   python -m http.server 8000
   ```

   Then open `http://localhost:8000` in the browser.

The page uses Bootstrap and Google Fonts from external CDNs, so an internet connection may be needed for those assets. The prototype is intended to demonstrate the interface, not to provide production security or persistent data storage.

### Domain classes represented by the screens

| Prototype screen | Planned classes represented |
|---|---|
| Home / dashboard | `User`, `Item`, `BorrowRequest`, `BorrowTransaction`, `ItemCategory` |
| Browse and search | `Item`, `ItemCategory`, `User` (owner) |
| Item details | `Item`, `ItemCategory`, `User`, `BorrowRequest`, `Review`, `Report` |
| Add / edit listing | `Item`, `ItemCategory` |
| Incoming requests / my requests | `BorrowRequest`, `BorrowTransaction`, `Item`, `User` |
| My activity | `Item`, `BorrowTransaction`, `BorrowRequest`, `Review` |

This mapping shows that the prototype is designed around more than five classes from the planned class diagram. The interactions are simulated in JavaScript with sample data; they do not save to MySQL or call a Spring Boot backend. For the current submission, open the prototype and review the visible screens and interactions directly.

## 9. Planned development schedule and deliverables

The proposal contains the detailed Gantt chart and milestone table. At a high level, the six-week plan progresses from proposal and design, through database and core feature increments, into UI integration, testing, and final delivery.

| Milestone | Planned focus |
|---|---|
| M1 — Proposal ready | Finalize the proposal and scope. |
| M2 — Design and database ready | Review diagrams, requirements, and database design. |
| M3 — Increment 1 complete | Implement the first core increment. |
| M4 — Increment 2 complete | Add the next planned set of borrowing features. |
| M5 — UI integrated | Connect the interface to implemented application features. |
| M6 — Final delivery | Complete planned tests, documentation, and delivery. |

These are **planned milestones**, not a claim that the backend increments have already been completed. Refer to the proposal for the task-by-task schedule and expected deliverables.

## 10. Building or editing the proposal

### Compile with Overleaf

1. Upload the repository files to Overleaf while preserving the `proposal/` and `diagrams/` folders.
2. Set `proposal/main.tex` as the main document.
3. Compile the LaTeX source. The proposal references the diagram images in `diagrams/` using relative paths, so keep the folder structure intact.

### Compile locally

From the `proposal` directory, use a LaTeX installation that includes the packages required by the document:

```bash
cd proposal
latexmk -pdf main.tex
```

The compiled PDF is already included as `proposal/main.pdf`; compiling again is only necessary if you edit the source.

## 11. Viewing or regenerating diagrams

The repository contains both editable diagram sources and PNG renders.

- **Mermaid (`.mmd`)**: open or paste a source file into [Mermaid Live Editor](https://mermaid.live) to preview or export it.
- **PlantUML (`.puml`)**: use a PlantUML-compatible editor or the [PlantUML online server](https://www.plantuml.com/plantuml) to render it.

If you regenerate a diagram, check that the new image remains consistent with the proposal, class names, statuses, and borrowing workflow before replacing the PNG.

## 12. Important implementation note

The proposal, diagrams, and prototype describe the **planned design**. They should not be interpreted as evidence that the full application, database, authentication, or formal tests are complete. These are planned for the subsequent development stage. The repository is organized to make the current submission easy to review and to provide a foundation for that later work.
