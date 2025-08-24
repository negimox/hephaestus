This project exposes a POST API at /api/bookings to create booking records in MongoDB.

Setup

- Copy `.env.example` to `.env` and set `MONGODB_URI` (and optionally `MONGODB_DB`).
- Install the `mongodb` package (devs should run their package manager: npm install mongodb).

Behavior

- The endpoint expects JSON with: service, date (ISO string), time, firstName, lastName, email, phone, deviceModel, deviceCondition (optional), notes (optional).
- On success it returns { success: true, id } with status 201.
