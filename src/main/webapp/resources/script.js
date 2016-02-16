/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function populateCompaniesList(url) {

    $.ajax({
        url: (url + "/getAllCompanies"),
        type: "POST",
        dataType: 'json',
        data: {},
        success: function (data, textStatus, jqXHR) {
            $("#collapseTwo table tbody").empty();
            $.each(data, function (i, val) {
                $("#collapseTwo table tbody").append(
                    '<tr><form>' +
                    '<td>' + val.id + '</td>' +
                    '<td>' + val.name + '</td>' +
                    '<td>' + val.address + '</td>' +
                    '<td>' + val.city + '</td>' +
                    '<td>' + val.country + '</td>' +
                    '<td>' + val.email + '</td>' +
                    '<td>' + val.phoneNumber + '</td>' +
                    '</form></tr>'
                );
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            populateModal(errorStr, "Error in fetching data");
        }
    });
}

function populateOwnersList(url) {
    $.ajax({
        url: (url + "/getOwners"),
        type: "POST",
        dataType: 'json',
        data: {},
        success: function (data, textStatus, jqXHR) {
            $("#collapseFour table tbody").empty();
            $.each(data, function (i, val) {
                $("#collapseFour table tbody").append(
                    '<tr>' +
                    '<td>' + val.id + '</td>' +
                    '<td>' + val.name + '</td>' +
                    '<td>' + val.surname + '</td>' +
                    '<td>' + val.companyTO.id + '</td>' +
                    '<td>' + val.companyTO.name + '</td>' +
                    '</tr>'
                );
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            populateModal(errorStr, "Error in fetching data");
        }
    });
}

function populateModal(errorStr, error)
{
    switch (errorStr) {
        case "SUCCESS":
            $("#client-modal h4").html(
                "<span class=\"glyphicon glyphicon-ok\" style=\"padding: 5px 15px 5px 5px\"></span>Request Succesful");

            break;
        case "ERROR":
            $("#client-modal h4").html(
                "<span class=\"glyphicon glyphicon-exclamation-sign\" style=\"padding: 5px 15px 5px 5px\"></span>Request Error");
            break;
    }
    $("#client-modal p").html(error);
    $("#client-modal").modal('show');
}

$(document).ready(function () {

    //Context path should be dynamically loaded
    var url = "https://restful-company-api.herokuapp.com/companyws";

    var errorStr = "ERROR";
    var successStr = "SUCCESS";

    populateCompaniesList(url);
    populateOwnersList(url);

    $("#edit-company-form button").click(function (e) {

        var errors = [];

        if (!$("#edit-company-form #edit-name").val())
            errors.push("Name");

        if (!$("#edit-company-form #edit-address").val())
            errors.push("Address");

        if (!$("#edit-company-form #edit-city").val())
            errors.push("City");

        if (!$("#edit-company-form #edit-country").val())
            errors.push("Country");

        if (!$("#id").val())
            errors.push("Company ID");

        if (!areDetailsValid(errors)) {
            return false;
        }

        $(this).find('span').toggleClass('glyphicon glyphicon-refresh glyphicon-refresh-animate active');
        $(this).prop('disabled', true);

        //AJAX Request
        $.ajax({
            url: (url + "/updateCompany/" + $("#id").val()),
            type: "POST",
            dataType: 'json',
            data: $("#edit-company-form").serialize(),
            success: function (data, textStatus, jqXHR) {
                $("#edit-area").toggleClass("hidden");
                $("#edit-company-form  button").prop('disabled', false);
                $("#edit-company-form button").find('span').removeClass('glyphicon glyphicon-refresh glyphicon-refresh-animate');
                populateModal(successStr, "Company with ID:" + data + " succesfully updated");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#edit-company-form  button").prop('disabled', false);
                $("#edit-company-form button").find('span').removeClass('glyphicon glyphicon-refresh glyphicon-refresh-animate');
                populateModal(errorStr, "Error in fetching company details");
            }
        });
    });

    $("#search-company-form button").click(function (e) {

        var errors = [];

        var companyId = $("#id").val();

        if (!companyId)
            errors.push("Company ID");

        if (!areDetailsValid(errors)) {
            return false;
        }

        $(this).find('span').toggleClass('glyphicon glyphicon-refresh glyphicon-refresh-animate active');
        $(this).prop('disabled', true);

        //AJAX Request
        $.ajax({
            url: (url + "/getCompany/" + companyId),
            type: "POST",
            dataType: 'json',
            data: {},
            success: function (data, textStatus, jqXHR) {
                $("#edit-area").removeClass("hidden");
                $("#edit-name").val(data.name);
                $("#edit-address").val(data.address);
                $("#edit-city").val(data.city);
                $("#edit-country").val(data.country);
                $("#edit-email").val(data.email);
                $("#edit-phoneNumber").val(data.phoneNumber);
                $("#search-company-form  button").prop('disabled', false);
                $("#search-company-form button").find('span').removeClass('glyphicon glyphicon-refresh glyphicon-refresh-animate');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#search-company-form  button").prop('disabled', false);
                $("#search-company-form button").find('span').removeClass('glyphicon glyphicon-refresh glyphicon-refresh-animate');
                populateModal(errorStr, "Error in fetching company details");
            }
        });
    });

    $("#create-company-form button").click(function (e) {
        var errors = [];

        if (!$("#create-company-form #name").val())
            errors.push("Name");

        if (!$("#create-company-form #address").val())
            errors.push("Address");

        if (!$("#create-company-form #city").val())
            errors.push("City");

        if (!$("#create-company-form #country").val())
            errors.push("Country");

        if (!areDetailsValid(errors)) {
            return false;
        }

        $(this).find('span').toggleClass('glyphicon glyphicon-refresh glyphicon-refresh-animate active');
        $(this).prop('disabled', true);

        //send request
        $.ajax({
            url: (url + "/createCompany"),
            type: "POST",
            dataType: 'json',
            data: $("#create-company-form").serialize(),
            success: function (data, textStatus, jqXHR) {
                $("#create-company-form button").prop('disabled', false);
                $("#create-company-form button").find('span').removeClass('glyphicon glyphicon-refresh glyphicon-refresh-animate');
                populateModal(successStr, "Company created with ID:" + data);
                populateCompaniesList(url);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#create-company-form button").prop('disabled', false);
                $("#create-company-form button").find('span').removeClass('glyphicon glyphicon-refresh glyphicon-refresh-animate');
                populateModal(errorStr, "Error in creating company");
            }
        });

        e.preventDefault();
    });

    $("#create-owner-form button").click(function (e) {
        var errors = [];

        if (!$("#create-owner-form #owner-name").val())
            errors.push("Name");

        if (!$("#create-owner-form #owner-surname").val())
            errors.push("Surname");

        if (!$("#create-owner-form #owner-companyid").val())
            errors.push("Company Id");

        if (!areDetailsValid(errors)) {
            return false;
        }

        $(this).find('span').toggleClass('glyphicon glyphicon-refresh glyphicon-refresh-animate active');
        $(this).prop('disabled', true);

        //send request
        $.ajax({
            url: (url + "/createOwner"),
            type: "POST",
            dataType: 'json',
            data: $("#create-owner-form").serialize(),
            success: function (data, textStatus, jqXHR) {
                $("#create-owner-form button").prop('disabled', false);
                $("#create-owner-form button").find('span').removeClass('glyphicon glyphicon-refresh glyphicon-refresh-animate');
                populateModal(successStr, "Owner created with ID:" + data);
                populateOwnersList(url);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#create-owner-form button").prop('disabled', false);
                $("#create-owner-form button").find('span').removeClass('glyphicon glyphicon-refresh glyphicon-refresh-animate');
                populateModal(errorStr, "Error in creating owner");
            }
        });

        e.preventDefault();
    });

    var areDetailsValid = (function (errors) {
        if (errors.length > 0) {
            var error_text = "The following fields have incorrect values:<br /><ul>";
            $.each(errors, function (i, value) {
                error_text = error_text + "<li>" + value + "</li>";
            });

            error_text = error_text + "</ul>"
            populateModal(errorStr, error_text);
            return false;
        }

        return true;
    });
});


