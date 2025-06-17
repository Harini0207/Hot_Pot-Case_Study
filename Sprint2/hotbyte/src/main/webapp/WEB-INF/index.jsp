<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<jsp:include page="includes/bootstrap_links.jsp" />

<head>
  <meta charset="UTF-8">
  <title>HotByte 🍽️</title>
</head>

<body>
<jsp:include page="includes/menu.jsp" />

<div class="container mt-5 text-center">
  <h1>Welcome to HotByte 🍔</h1>
  <p>Your favorite food delivered fast at your door!</p>
  <img src="<c:url value='/images/food.jpg' />" alt="Food Image" class="img-fluid rounded shadow" style="max-width: 600px;">
</div>

</body>
</html>
