<%@ page language="java" %>
<!DOCTYPE html>
<html>
<jsp:include page="includes/bootstrap_links.jsp" />
<jsp:include page="includes/menu.jsp" />
<body>
<div class="container mt-5">
    <h3>Register for HotByte</h3>
    <form action="register" method="post" class="mt-3 col-md-8">
        <div class="mb-3">
            <input type="text" name="name" class="form-control" placeholder="Full Name" required />
        </div>
        <div class="mb-3">
            <input type="email" name="email" class="form-control" placeholder="Email" required />
        </div>
        <div class="mb-3">
            <input type="password" name="password" class="form-control" placeholder="Password" required />
        </div>
        <div class="mb-3">
            <input type="tel" name="phone" class="form-control" placeholder="Phone Number" required />
        </div>
        <div class="mb-3">
            <textarea name="address" class="form-control" placeholder="Address" required></textarea>
        </div>
        <div class="mb-3">
            <label>Gender:</label><br/>
            <input type="radio" name="gender" value="male" required /> Male
            <input type="radio" name="gender" value="female" /> Female
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
    </form>
</div>
</body>
</html>
