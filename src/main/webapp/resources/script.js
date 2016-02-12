
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function()
{
    url = "http://localhost:8001/companyws";

    errorStr = "ERROR";
    successStr = "SUCCESS";
    //    var data = {
    //        name : "Rising Cats",
    //        address : "20, Avenue Street",
    //        city : "Miami",
    //        country : "USA",
    //        email : "info@rcats.org",
    //        phoneNumber : "+0198373646"
    //    };

    $("#create-company-form a").click(function(e)
    {
        var errors = [];

        if(!$("#create-company-form #name").val())
            errors.push("Name");

        if(!$("#create-company-form #address").val())
            errors.push("Address");

        if(!$("#create-company-form #city").val())
            errors.push("City");

        if(!$("#create-company-form #country").val())
            errors.push("Country");

        if(!areDetailsValid(errors))
            return false;

        //send request
        $.ajax({
            url: (url + "/createCompany"),
            type: "POST",
            dataType: 'json',
            data: $("#create-company-form").serialize(),
            success: function (data, textStatus, jqXHR)
            {
                populateModal(successStr,"Company created with ID:" + data);
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                populateModal(errorStr,"Error in creating company");
            }
        });
        e.preventDefault();

    });

    var areDetailsValid = (function(errors)
    {
        if(errors.length > 0)
        {
            var error_text = "The following fields have incorrect values:<br /><ul>";
            $.each(errors, function(i,value)
            {
                error_text = error_text + "<li>" + value + "</li>";
            });

            error_text = error_text + "</ul>"
            populateModal(errorStr,error_text);
            return false;
        }

        return true;
    });

    var populateModal = (function(status,text)
    {
        switch(status)
        {
            case "SUCCESS":
                $("#info-modal h4").html(
                    "<span class=\"glyphicon glyphicon-ok\" style=\"padding: 5px 15px 5px 5px\"></span>Request Succesful");

                break;
            case "ERROR":
                $("#info-modal h4").html(
                    "<span class=\"glyphicon glyphicon-exclamation-sign\" style=\"padding: 5px 15px 5px 5px\"></span>Request Error");
                break;
        }
        $("#info-modal p").html(text);
        $("#info-modal").modal('show');
    });


});

