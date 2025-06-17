<%@ page language="java" %>
<%@ page session="true" %>
<!DOCTYPE html>
<html>
<jsp:include page="includes/bootstrap_links.jsp" />
<jsp:include page="includes/menu.jsp" />
<body>
<div class="container mt-5">
    <h2>Hello Admin, ${currentUser.name}</h2>
    <p class="lead">You can manage restaurants, menus, and orders here.</p>
</div>
</body>
</html>
