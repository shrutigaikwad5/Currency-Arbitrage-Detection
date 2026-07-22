<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<!DOCTYPE html>
<html>
<head>
    <title>User & Admin Login</title>
</head>
<body>

<h2>Login System</h2>

<c:if test="${not empty error}">
    <p style="color:red; font-weight:bold;">${error}</p>
</c:if>

<form action="/login" method="post">

    <!-- Role Selection Radio Buttons -->
    <label><b>Select Login Type:</b></label><br>
    <input type="radio" id="user" name="role" value="USER" checked>
    <label for="user">User</label>&nbsp;&nbsp;

    <input type="radio" id="admin" name="role" value="ADMIN">
    <label for="admin">Admin</label><br><br>

    Email: <br>
    <input type="email" name="email" required><br><br>

    Password: <br>
    <input type="password" name="password" required><br><br>

    <input type="submit" value="Login">

</form>

</body>
</html>