<%@ page language="java" %>
<%@ page session="true" %>
<!DOCTYPE html>
<html>
<jsp:include page="includes/bootstrap_links.jsp" />
<jsp:include page="includes/menu.jsp" />
<body>
<div class="container mt-5">
    <h2>Welcome, ${currentUser.name} 👋</h2>
    <p class="lead">Explore today's special food items below:</p>

    <div class="row">
        <div class="col-md-4">
            <div class="card">
                <img src="images/pizza.jpg" class="card-img-top" alt="Pizza">
                <div class="card-body">
                    <h5 class="card-title">Veg Pizza</h5>
                    <p class="card-text">Loaded with cheese, veggies, and love.</p>
                    <button class="btn btn-success">Order Now</button>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card">
                <img src="images/biryani.jpg" class="card-img-top" alt="Biryani">
                <div class="card-body">
                    <h5 class="card-title">Hyderabad Briyani</h5>
                    <p class="card-text">Aromatic and flavourful rice dish.</p>
                    <button class="btn btn-success">Order Now</button>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
