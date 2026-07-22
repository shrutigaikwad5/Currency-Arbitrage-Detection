<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<!DOCTYPE html>
<html>
<head>
    <title>User Management</title>
</head>
<body>

<div style="text-align: right; background-color: #f4f4f4; padding: 10px; margin-bottom: 20px;">
    Welcome, <b>${user.name}</b> (${user.role}) |
    <a href="/currency">Currency Page</a> |
    <a href="/logout">Logout</a>
</div>

<h2>User Management (Admin Dashboard)</h2>

<form action="/users/save" method="post">
    <input type="hidden" name="id" value="${userForm.id}">

    Full Name: <br>
    <input type="text" name="name" value="${userForm.name}" required><br><br>

    Email Address: <br>
    <input type="email" name="email" value="${userForm.email}" required><br><br>

    Password: <br>
    <input type="password" name="password" value="${userForm.password}" required><br><br>

    Role: <br>
    <select name="role" required>
        <option value="USER" ${userForm.role eq 'USER' ? 'selected' : ''}>USER</option>
        <option value="ADMIN" ${userForm.role eq 'ADMIN' ? 'selected' : ''}>ADMIN</option>
    </select><br><br>

    <!-- Currency Dropdown Selection -->
    Select Primary Currency: <br>
    <select name="preferredCurrency">
        <option value="">-- Select Currency --</option>
        <c:forEach var="curr" items="${currencyList}">
            <option value="${curr.currencyCode}">${curr.currencyName} (${curr.symbol})</option>
        </c:forEach>
    </select><br><br>

    <input type="submit" value="${userForm.id != null ? 'Update User' : 'Save User'}">
</form>

<hr>

<h3>System Users List</h3>

<table border="1" cellpadding="5">
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
    </tr>

    <c:forEach var="u" items="${userList}">
        <tr>
            <td>${u.id}</td>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td>${u.role}</td>
            <td>
                <a href="/users/edit/${u.id}">Edit</a> |
                <a href="/users/delete/${u.id}" onclick="return confirm('Delete this user?')">Delete</a>
            </td>
        </tr>
    </c:forEach>
</table>

</body>
</html>