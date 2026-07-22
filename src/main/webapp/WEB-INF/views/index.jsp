<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<!DOCTYPE html>
<html>
<head>
    <title>Currency Management</title>
</head>

<body>

<!-- Header with Logged-in User Information & Logout Option -->
<div style="text-align: right; background-color: #f4f4f4; padding: 10px; margin-bottom: 20px;">
    Welcome, <b>${user.name}</b> (${user.role}) | <a href="/logout">Logout</a>
</div>

<h2>Currency Management</h2>

<form action="/currency/save" method="post">

    <!-- Hidden input field to hold the ID during edits -->
    <input type="hidden" name="id" value="${currency.id}">

    Currency Name :
    <input type="text" name="currencyName" value="${currency.currencyName}"><br><br>

    Currency Code :
    <input type="text" name="currencyCode" value="${currency.currencyCode}"><br><br>

    Symbol :
    <input type="text" name="symbol" value="${currency.symbol}"><br><br>

    Country :
    <input type="text" name="country" value="${currency.country}"><br><br>

    Status :
    <input type="checkbox" name="status" ${currency.status != null && currency.status ? 'checked="checked"' : ''}><br><br>

    <input type="submit" value="${currency.id != null ? 'Update' : 'Save'}">

</form>

<hr>

<h3>Currency List</h3>

<table border="1" cellpadding="5">

    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Code</th>
        <th>Symbol</th>
        <th>Country</th>
        <th>Status</th>
        <th>Action</th>
    </tr>

    <c:forEach var="currency" items="${currencyList}">

        <tr>
            <td>${currency.id}</td>
            <td>${currency.currencyName}</td>
            <td>${currency.currencyCode}</td>
            <td>${currency.symbol}</td>
            <td>${currency.country}</td>
            <td>${currency.status}</td>

            <td>
                <!-- Both USER and ADMIN can edit -->
                <a href="/currency/edit/${currency.id}">Edit</a>

                <!-- ONLY ADMIN can view/click Delete -->
                <c:if test="${user.role eq 'ADMIN'}">
                    | <a href="/currency/delete/${currency.id}" onclick="return confirm('Are you sure you want to delete this currency?')">Delete</a>
                </c:if>
            </td>

        </tr>

    </c:forEach>

</table>

</body>
</html>