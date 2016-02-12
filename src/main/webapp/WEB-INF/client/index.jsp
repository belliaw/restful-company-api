<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Company WS</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <script src="<c:url value="/resources/script.js" />"></script>
    <style>
        .content-panel
        {
            padding: 35px;
            min-height: 300px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            -webkit-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.1) inset;
            -moz-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.1) inset;
            box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.1) inset;
        }

        .content
        {
            text-align: center;
        }

        .accordion-link
        {
            display: block;
        }

        .form-group.required .control-label:after
        {
            content:" *";
        }
    </style>
</head>

<body>
<div class="container">
    <div class="row">
        <div class="col-md-12" style="margin-bottom: 70px"></div>
    </div>
    <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <div class="content-panel">
                <div class="panel-group content" id="group-accordion">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a class="accordion-link" data-toggle="collapse" data-parent="#group-accordion" href="#collapseOne">Create Company</a>
                            </h4>
                        </div>
                        <div id="collapseOne" class="panel-collapse collapse in">
                            <div class="panel-body">
                                <form class="form-horizontal" role="form" id="create-company-form">
                                    <div class="form-group required">
                                        <label for="name" class="control-label col-md-2">Name</label>
                                        <div class="col-md-10">
                                            <input type="text" class="form-control" id="name" name="name" placeholder="Name" required="required">
                                        </div>
                                    </div>
                                    <div class="form-group required">
                                        <label for="address" class="control-label col-md-2">Address</label>
                                        <div class="col-md-10">
                                            <input type="text" class="form-control" id="address" name="address" placeholder="Address" required="required">
                                        </div>
                                    </div>
                                    <div class="form-group required">
                                        <label for="city" class="control-label col-md-2">City</label>
                                        <div class="col-md-10">
                                            <input type="text" class="form-control" id="city" name="city" placeholder="City" required="required">
                                        </div>
                                    </div>
                                    <div class="form-group required">
                                        <label for="country" class="control-label col-md-2">Country</label>
                                        <div class="col-md-10">
                                            <input type="text" class="form-control" id="country" name="country" placeholder="Country" required="required">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="email" class="control-label col-md-2">Email</label>
                                        <div class="col-md-10">
                                            <input type="text" class="form-control" id="email" name="email" placeholder="Email">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="phoneNumber" class="control-label col-md-2">Phone No</label>
                                        <div class="col-md-10">
                                            <input type="text" class="form-control" id="phoneNumber" name="phoneNumber" placeholder="Phone No">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <a href="#info-modal" role="button" class="btn btn-large btn-primary" >Create</a>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2"></div>
    </div>
</div>
<!-- Modals -->
<div id="info-modal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header ">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body">
                <p></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
