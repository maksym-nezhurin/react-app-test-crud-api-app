## Auth flow

### Single Page Applications (SPA):

- This setup is ideal for SPAs where maintaining a session using only short-lived access tokens and longer-lived refresh tokens is crucial for security and user experience.
- Use this service for handling all HTTP requests across your application to ensure that the user's session is maintained effectively without manual intervention.

### Implementation Recommendations
- Securing Tokens: Ensure that tokens, especially refresh tokens, are stored securely using mechanisms suitable for your platform (e.g., HttpOnly cookies for web applications).

- Handling Multiple Simultaneous Requests: When the access token expires, and multiple requests are sent before the token is refreshed, your queue system ensures that these requests do not lead to multiple refresh token requests. This is critical to avoid race conditions and potential security issues.

- Session Management: Integrate session timeout and proactive token refresh features based on user activity and token expiry times to enhance security.

Testing and Validation: Rigorously test this setup under different network conditions and authentication states to ensure that all edge cases are handled gracefully.

# Login with test account

Login: 
email: max2@example.com

pass: 123456