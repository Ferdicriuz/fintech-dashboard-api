# Fintech Dashboard API – Postman Collection

## Overview
This Postman collection contains all tested API endpoints for the Fintech Dashboard backend.

## Included Modules
- Authentication (Register, Login)
- Dashboard Summary
- Transactions (Create & Fetch)

## Setup Instructions
1. Import the collection into Postman
2. Create an environment with:
   - BASE_URL = http://localhost:5000
   - TOKEN = <JWT from login endpoint>
3. All protected routes use Bearer Token authentication.

## Postman Version
Collection format: v2.1

## Testing Proof
All endpoints were tested successfully and return expected responses.


<!-- 
[User Browser]
   | Sends form data (signup/login/transaction)
   v
[Frontend JS] --> Attaches JWT if logged in
   |
   v
[Express Backend] --> Validates data, protects routes
   |
   v
[MongoDB Database] --> Stores Users & Transactions
   |
   v
[Backend Response] --> Sent back to Frontend
   |
   v
[Browser renders Dashboard / Transaction]
 -->