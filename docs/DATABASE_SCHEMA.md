# Database Schema

FlowBoard uses MongoDB with Mongoose for object modeling. The primary collections are `Users`, `Projects`, and `Elements`.

## 1. User
Stores user credentials, profile information, and relationships to various projects.
- **`name`** *(String)*: Unique username.
- **`email`** *(String)*: Unique email address.
- **`passwordHash`** *(String)*: Bcrypt hashed password.
- **`profilePicture`** *(String)*: Path to the user's avatar. Default is `/public/anonymous-pfp.jpeg`.
- **`projects`** *(Array of ObjectIds)*: References to `Project` documents the user owns.
- **`sharedProjects`**, **`likedProjects`**, **`starredProjects`**, **`archivedProjects`** *(Array of ObjectIds)*: References to `Project` documents that the user interacts with.

## 2. Project
Represents a FlowBoard canvas, including metadata, collaborators, and its content elements.
- **`name`** *(String)*: The name of the project.
- **`owner`** *(ObjectId)*: Reference to the `User` who created it.
- **`collaborators`** *(Array of ObjectIds)*: References to `User`s who have edit access.
- **`content`** *(Array of ObjectIds)*: References to `Element`s that make up the Yjs canvas data. **Note:** While this stores elements, the CRDT Yjs `data` isn't strictly required to be persisted here for pure relational structures but acts as a fallback representation.
- **`visibility`** *(String)*: "Public" or "Private". Default "Private".
- **`tags`** *(Array of String)*: Tags for searchability.
- **`likes`**, **`views`**, **`forkCount`** *(Number)*: Engagement metrics. Default 0.
- **`comments`** *(Array of Subdocuments)*: Embedded array of comment schemas (user, content, createdAt, likes).
- **`thumbnail`** *(String)*: Image representing the project canvas.

## 3. Element
Represents individual shapes, paths, or text boxes on a project canvas.
- **`project`** *(ObjectId)*: Reference to the parent `Project`.
- **`type`** *(String)*: Shape type. Enum: `["rectangle", "ellipse", "circle", "triangle", "hexagon", "arrow", "line", "text", "image", "graph", "table"]`.
- **`data`** *(Mixed)*: Schema-less object to store any specific properties of the element (e.g., width, height, coordinates, color). Not strictly required by the db validation logic to have a fixed structure since it accommodates Yjs node payloads.
- **`createdBy`** *(ObjectId)*: Reference to the `User` who created the element.
