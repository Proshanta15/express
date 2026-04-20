export function login() {
  return `
    <form action="/submit" method="post">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username"><br><br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password"><br><br>
        <button type="submit">Login</button><br><br>
        <a href="/">Back to Home</a>
    </form>
    `;
}
