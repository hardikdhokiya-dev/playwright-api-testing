# POST /booking

## Overview

The `POST /booking` endpoint creates a new booking in the Restful Booker API.

This endpoint accepts a booking request payload and returns the newly created booking along with a unique booking ID.

**Endpoint**

```
POST /booking
```

**Base URL**

```
https://restful-booker.herokuapp.com
```

---

# Purpose

This endpoint is used to:

- Create a new booking
- Verify request payload validation
- Validate response schema
- Verify business data is persisted correctly
- Generate bookings for subsequent GET, PUT, PATCH, and DELETE tests

---

# Request Headers

| Header | Value |
|----------|-------|
| Content-Type | application/json |
| Accept | application/json |

---

# Request Body

```json
{
  "firstname": "Jasprit",
  "lastname": "Bumrah",
  "totalprice": 500,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2026-07-15",
    "checkout": "2026-07-22"
  },
  "additionalneeds": "Breakfast"
}
```

---

# Successful Response

**Status Code**

```
200 OK
```

Example

```json
{
  "bookingid": 1234,
  "booking": {
    "firstname": "Jasprit",
    "lastname": "Bumrah",
    "totalprice": 500,
    "depositpaid": true,
    "bookingdates": {
      "checkin": "2026-07-15",
      "checkout": "2026-07-22"
    },
    "additionalneeds": "Breakfast"
  }
}
```

---

# Response Fields

| Field | Description |
|--------|-------------|
| bookingid | Unique booking identifier |
| booking | Booking object |
| firstname | Customer first name |
| lastname | Customer last name |
| totalprice | Booking price |
| depositpaid | Deposit paid flag |
| bookingdates | Check-in and check-out dates |
| additionalneeds | Optional booking notes |

---

# Test Cases Implemented

## Happy Path

✔ Create booking successfully

Purpose

- Verify a booking can be created using valid data.

Assertions

- Status code is 200
- Response is successful
- Booking ID is generated
- Response matches request payload
- Content-Type is application/json
- Response time is within acceptable threshold

---

## Override Values

✔ Create booking using overridden values

Purpose

- Verify custom values override factory-generated values.

Assertions

- Response contains overridden values
- Remaining fields are generated correctly

---

## Optional Field

✔ Create booking without additional needs

Purpose

- Verify booking creation succeeds when optional data is omitted.

Assertions

- Status code is 200
- Booking is created successfully

---

## Multiple Booking Creation

✔ Create multiple unique bookings

Purpose

- Verify multiple bookings can be created successfully.

Assertions

- Every request returns 200
- Every booking receives a unique booking ID

---

## Negative Test

✔ Invalid booking request

Purpose

- Verify invalid payload is rejected.

Assertions

- API returns appropriate error status
- Request is not processed successfully

---

# Assertions Used

## Response Assertions

- HTTP Status Code
- Response Success
- Content-Type
- Response Time

## Booking Assertions

- Booking ID exists
- First Name
- Last Name
- Total Price
- Deposit Paid
- Booking Dates
- Additional Needs

---

# Framework Design

This project follows a reusable layered architecture.

```
Tests
    │
    ▼
BookingClient
    │
    ▼
BaseApiClient
    │
    ▼
REST API
```

Supporting Components

- BookingDataFactory
- DateUtils
- JsonReader
- BookingAssertions
- ResponseAssertions

---

# Design Patterns Used

- Factory Pattern
- Client Pattern
- Assertion Layer
- Utility Classes
- Interface-Based Models
- Separation of Concerns

---

# Best Practices

- Generate dynamic test data using Faker.
- Generate dates dynamically using Luxon.
- Avoid hardcoded values.
- Keep tests independent.
- Validate complete response payload.
- Reuse assertions across tests.
- Separate API clients from test logic.
- Follow Arrange-Act-Assert (AAA) pattern.
- Use descriptive test names.
- Use `test.step()` for improved reporting.

---

# Common Mistakes

❌ Hardcoding booking data

❌ Repeating assertions in every test

❌ Writing HTTP requests directly inside test files

❌ Not validating response schema

❌ Depending on existing data

❌ Using duplicated test data

❌ Combining multiple scenarios in a single test

---

# Questions

## Why use a Data Factory?

A data factory centralizes test data generation, reduces duplication, supports dynamic data generation, and allows individual fields to be overridden without affecting the rest of the payload.

---

## Why use Faker?

Faker generates realistic, random data, reducing the risk of collisions and making tests more reliable and closer to real-world scenarios.

---

## Why use Luxon?

Luxon provides robust date handling, supports ISO date formatting, and eliminates hardcoded dates, improving maintainability.

---

## Why separate API Client from Tests?

Separating API communication from test logic improves maintainability, readability, and reusability. Tests focus on business behavior, while client classes encapsulate HTTP implementation details.

---

## Why use Assertions classes?

Centralized assertion classes reduce duplicated code, ensure consistency across tests, and simplify maintenance when response validation changes.

---

## Why use a Set for booking IDs?

A `Set` automatically stores unique values. It is useful for verifying that each booking receives a unique identifier without writing additional duplicate detection logic.


---

# Related Files

```
tests/
└── booking.post.spec.ts

src/
├── assertions/
│   ├── BookingAssertions.ts
│   └── ResponseAssertions.ts
│
├── clients/
│   ├── BaseApiClient.ts
│   └── BookingClient.ts
│
├── factories/
│   └── BookingDataFactory.ts
│
├── interfaces/
│   ├── Booking.ts
│   └── BookingResponse.ts
│
└── utils/
    ├── DateUtils.ts
    └── JsonReader.ts
```

---

# References

- Restful Booker API Documentation
- Playwright API Testing
- Faker
- Luxon

---

**Author**

Hardik Dhokiya

Playwright API Automation Framework