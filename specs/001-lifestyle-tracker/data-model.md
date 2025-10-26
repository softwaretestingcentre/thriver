# Data Model: Lifestyle Tracker

## Entities

### User
- id: UUID
- email: string
- passwordHash: string
- profile: { name, age, gender, avatar }
- preferences: { notifications: boolean }

### Goal
- id: UUID
- userId: UUID (relation)
- type: enum (lifestyle, diet, exercise)
- target: string/number
- progress: number
- deadline: date

### DataEntry
- id: UUID
- userId: UUID (relation)
- type: enum (lifestyle, diet, exercise)
- value: number/string
- timestamp: datetime

### Notification
- id: UUID
- userId: UUID (relation)
- type: enum (goal, reminder, progress)
- content: string
- deliveryTime: datetime

## Relationships
- User 1:N Goal
- User 1:N DataEntry
- User 1:N Notification

## Validation Rules
- Email must be unique and valid format
- Password must meet security requirements
- Goal type must be one of allowed enums
- DataEntry type must match allowed enums
- Notification deliveryTime must be in future or present

## State Transitions
- Goal: created → active → completed/expired
- DataEntry: created (immutable)
- Notification: scheduled → sent
