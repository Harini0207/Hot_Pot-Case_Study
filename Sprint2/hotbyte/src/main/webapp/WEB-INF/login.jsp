<%@ page language="java" %>
<!DOCTYPE html>
<html>
<jsp:include page="includes/bootstrap_links.jsp" />
<jsp:include page="includes/menu.jsp" />
<body>
<div class="container mt-5">
    <h3>Login to HotByte</h3>
    <form action="login" method="post" class="mt-3 col-md-6">
        <div class="mb-3">
            <input type="email" name="email" class="form-control" placeholder="Email" required />
        </div>
        <div class="mb-3">
            <input type="password" name="password" class="form-control" placeholder="Password" required />
        </div>
        <button type="submit" class="btn btn-success">Login</button>
        <a href="registerPage" class="btn btn-link">New user? Register</a>
    </form>
    <p class="text-danger mt-3">${msg}</p>
</div>
</body>
</html>
