<!doctype html>
<html>
<head>
    <title>Administrator panel - Login</title>
    <link rel="stylesheet" href="css/stylesheet.css"><!--Local stylesheet-->
    
    <link rel="stylesheet" href="../css/bootstrap.css">
    <script src="../js/jq341.js"></script> <!--Jquery 3.4.1-->
    <script src="../js/bootstrap.bundle.js"></script><!--Bootstrap 4-->
</head>
<body class="h-100 w-100 bg-dark">
    <div class="d-flex align-items-center flex-column justify-content-center h-100">
            <div class="card shadow" style="width: 24rem;">
            <div class="card-body">
                <div class="card-title text-center lead p-0 m-0">
                    Administrator panel login
                </div>
                <div class="container-fluid w-100 small p-0">
                    <ul class="nav justify-content-center">
                        <li class="nav-item">
                            <a class="nav-link active" href="../">Return to home page</a>
                        </li>
                    </ul>
                </div>
                <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Username</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                    <small><a href="#" id="forgot-password" class="text-muted" data-toggle="tooltip" title="Well, you should probably know how to reset it yourself. :)">Forgot password?</a>
                </div>

                <button type="submit" class="btn btn-success w-100">Login</button>
                <small class="text-muted">*All visits are being recorded.<small>
                </form>
            </div>
            </div>
    </div>
<script>
$('#forgot-password').tooltip();
</script>
</body>
</html>