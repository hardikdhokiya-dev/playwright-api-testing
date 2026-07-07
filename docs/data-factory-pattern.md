# Data Factory Pattern

## Overview

The Data Factory Pattern is a design pattern used to centralize the creation of test data. Instead of creating request payloads directly inside test cases, a factory generates valid objects that can be reused across multiple tests.

This approach improves maintainability, readability, and scalability of the test framework.

---

# Why Use a Data Factory?

Without a Data Factory:

- Duplicate request payloads across multiple test files.
- Difficult to update when the API contract changes.
- Poor readability.
- Higher maintenance effort.

With a Data Factory:

- Centralized test data generation.
- Reusable default payloads.
- Easy customization for individual test scenarios.
- Cleaner and more readable test cases.
- Supports dynamic/random test data generation.

---

# Example Without a Factory

```ts
const booking = {
    firstname: "John",
    lastname: "Smith",
    totalprice: 100,
    depositpaid: true,
    bookingdates: {
        checkin: "2026-07-01",
        checkout: "2026-07-10"
    },
    additionalneeds: "Breakfast"
};
```

Problems:

- Duplicate payloads.
- Difficult to maintain.
- Large test files.

---

# Example With a Factory

```ts
const booking = BookingDataFactory.createBooking();
```

Or customize only the required fields:

```ts
const booking = BookingDataFactory.createBooking({
    firstname: "John",
    totalprice: 500
});
```

The factory provides sensible defaults while allowing individual fields to be overridden.

---

# Understanding the Method Signature

```ts
static createBooking(
    overrides?: Partial<BookingRequest>
): BookingRequest
```

Let's break this down.

---

## static

A static method belongs to the class itself instead of an instance.

Without static:

```ts
const factory = new BookingDataFactory();
factory.createBooking();
```

With static:

```ts
BookingDataFactory.createBooking();
```

### Why use static?

- No object creation required.
- Factory classes are stateless.
- Cleaner syntax.
- Common industry practice for utility/factory classes.

---

## Optional Parameter (?)

```ts
overrides?
```

The `?` means the parameter is optional.

Both calls are valid:

```ts
BookingDataFactory.createBooking();
```

```ts
BookingDataFactory.createBooking({
    firstname: "John"
});
```

---

## Partial<T>

```ts
Partial<BookingRequest>
```

`Partial<T>` is a built-in TypeScript utility type.

Normally:

```ts
BookingRequest
```

requires every property.

Using:

```ts
Partial<BookingRequest>
```

makes every property optional.

Example:

```ts
{
    firstname: "John"
}
```

This allows tests to override only the values they care about.

---

## Return Type

```ts
: BookingRequest
```

The method always returns a complete `BookingRequest` object.

Benefits:

- Compile-time type checking.
- IntelliSense support.
- Fewer runtime errors.
- Self-documenting code.

---

# Object Spread Operator

```ts
return {
    ...defaultBooking,
    ...overrides
};
```

The spread operator copies properties from one object into another.

Example:

Default object:

```ts
{
    firstname: "Hartrit",
    lastname: "Automation",
    totalprice: 150
}
```

Overrides:

```ts
{
    firstname: "John"
}
```

Result:

```ts
{
    firstname: "John",
    lastname: "Automation",
    totalprice: 150
}
```

Properties defined later overwrite earlier ones.

---

# Why Use Overrides?

Instead of rewriting the entire payload, override only the fields required for a specific scenario.

Example:

```ts
BookingDataFactory.createBooking({
    depositpaid: false
});
```

This keeps tests concise and focused.

---

# Random Test Data

```ts
createRandomBooking()
```

Generates unique values for each execution.

Example output:

```
User1234
User5678
User9012
```

Benefits:

- Prevents duplicate test data.
- Supports parallel execution.
- Reduces dependency on fixed values.
- Useful for APIs that reject duplicate records.

---

# Benefits of Using Interfaces

```ts
BookingRequest
```

Advantages:

- Strong typing.
- Compile-time validation.
- Better IntelliSense.
- Easier refactoring.
- Improved readability.
- Reduced runtime errors.

---

# Best Practices

- Keep default test data valid.
- Override only the fields required for the test.
- Use interfaces for all request and response models.
- Keep factories responsible only for object creation.
- Avoid hardcoding payloads in test files.
- Generate random data only when uniqueness is required.
- Keep factory methods deterministic unless randomness is intentional.

---

# Common Mistakes

❌ Creating request payloads directly inside tests.

❌ Duplicating JSON across multiple files.

❌ Using `any` instead of interfaces.

❌ Mixing API request logic with data creation.

❌ Returning incomplete objects.

❌ Mutating shared default objects.

---

# Interview Questions

## Why use a Data Factory?

To centralize object creation, reduce duplication, improve maintainability, and support reusable test data generation.

---

## Why use interfaces?

Interfaces provide compile-time validation, IntelliSense, improved readability, and safer refactoring.

---

## What is `Partial<T>`?

A TypeScript utility type that makes all properties of a type optional.

---

## Why make the factory method static?

Because the factory has no internal state. Static methods can be called directly without creating an instance.

---

## What does the spread operator do?

It copies properties from one object into another. If duplicate properties exist, the last value overrides the previous one.

---

## Why shouldn't payloads be hardcoded in test cases?

Hardcoded payloads create duplication, make maintenance difficult, and reduce readability.

---

## When would you generate random test data?

- Parallel execution
- Duplicate record prevention
- Unique user creation
- Performance testing
- Independent test execution

---

# Key Takeaways

- Centralize test data creation.
- Use interfaces for compile-time safety.
- Use `Partial<T>` for flexible overrides.
- Prefer static factory methods for stateless utilities.
- Use the spread operator to merge defaults with custom values.
- Keep tests focused on verification, not object construction.
- Write maintainable, reusable, and scalable automation code.

---