/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    var url = "http://localhost:8001/companyws";

    var errorStr = "ERROR";
    var successStr = "SUCCESS";

    var res = $.parseJSON('[{"id":33,"name":"4","address":"4fsaffdsafdsfdfsfasfsfasfdafaf3","city":"43","country":"43","email":"43","phoneNumber":"532"},{"id":34,"name":"4","address":"43","city":"43","country":"43","email":"43","phoneNumber":""}]');

    loadCompanyGroup();
    ////get data
    //alert($.parseJSON(res).id);
    //$.each(res, function (i, val) {
    //    $("#collapseTwo table tbody").append(
    //        '<tr><form>' +
    //        '<td>' + val.id + '</td>' +
    //        '<td>' + val.name + '</td>' +
    //        '<td>' + val.address + '</td>' +
    //        '<td>' + val.city + '</td>' +
    //        '<td>' + val.country + '</td>' +
    //        '<td>' + val.email + '</td>' +
    //        '<td>' + val.phoneNumber + '</td>' +
    //        '<td><button role="button" class="btn btn-primary btn-sm glyphicon glyphicon-edit"></button></td>' +
    //        '</form></tr>'
    //    );
    //});

    //$("#collapseTwo table tbody tr button").click(function()
    //{
    //    updateModal($(this).closest('tr'));
    //});


    //$.ajax({
    //    url: (url + "/getAllCompanies"),
    //    type: "POST",
    //    dataType: 'json',
    //    data: {},
    //    success: function (data, textStatus, jqXHR)
    //    {
    //
    //    },
    //    error: function (jqXHR, textStatus, errorThrown)
    //    {
    //        //$("#create-company-form button").prop('disabled',false);
    //        //$("#create-company-form button").find('span').removeClass('glyphicon glyphicon-refresh glyphicon-refresh-animate');
    //        populateModal(errorStr,"Error in creating company");
    //    }
    //});

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
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#create-company-form button").prop('disabled', false);
                $("#create-company-form button").find('span').removeClass('glyphicon glyphicon-refresh glyphicon-refresh-animate');
                populateModal(errorStr, "Error in creating company");
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

    var populateModal = (function (status, text) {
        switch (status) {
            case "SUCCESS":
                $("#client-modal h4").html(
                    "<span class=\"glyphicon glyphicon-ok\" style=\"padding: 5px 15px 5px 5px\"></span>Request Succesful");

                break;
            case "ERROR":
                $("#client-modal h4").html(
                    "<span class=\"glyphicon glyphicon-exclamation-sign\" style=\"padding: 5px 15px 5px 5px\"></span>Request Error");
                break;
        }
        $("#client-modal p").html(text);
        $("#client-modal").modal('show');
    });

});

function loadCompanyGroup()
{
    $("#companies_grid").jqGrid({
        //url: url + '/getAllCompanies',
        url: "data.json",
        //editurl: 'clientArray',
        datatype: "json",
        colModel: [
            {
                label: 'ID',
                name: 'id',
                width: 30,
                key: true,
                editable: false,
                editrules: {required: true}
            },
            {
                label: 'Name',
                name: 'Name',
                width: 50,
                editable: true // must set editable to true if you want to make the field editable
            },
            {
                label: 'Address',
                name: 'Address',
                width: 125,
                editable: true
            },
            {
                label: 'City',
                name: 'City',
                width: 70,
                editable: true
            },
            {
                label: 'Country',
                name: 'Country',
                width: 70,
                editable: true
            },
            {
                label: 'Email',
                name: 'Email',
                width: 80,
                editable: true
            },
            {
                label: 'PhoneNumber',
                name: 'PhoneNumber',
                width: 80,
                editable: true
            }
        ],
        sortname: 'id',
        sortorder: 'asc',
        loadonce: true,
        navOptions: {reloadGridOptions: {fromServer: true}},
        viewrecords: true,
        width: 500,
        height: 200,
        rowNum: 10,
        pager: "#companies_grid_pager",
    });

    $('#companies_grid').navGrid('#companies_grid_pager',
        {
            edit: true,
            add: true,
            del: true,
            search: false,
            refresh: false,
            view: false,
            position: "left",
            cloneToTop: false
        },
        // options for the Edit Dialog
        {
            editCaption: "Edit",
            recreateForm: true,
            checkOnUpdate: true,
            checkOnSubmit: true,
            closeAfterEdit: true,
            reloadAfterSubmit: true,
            afterComplete: function (response, postdata) {
                $("#companies_grid").setGridParam({datatype: 'json', page: 1}).trigger('reloadGrid');
                return [true];
            },
            errorTextFormat: function (data) {
                return 'Error: ' + data.responseText
            }
        },
        // options for the Add Dialog
        {
            closeAfterAdd: true,
            recreateForm: true,
            reloadAfterSubmit: true,
            afterComplete: function (response, postdata) {
                $("#companies_grid").setGridParam({datatype: 'json', page: 1}).trigger('reloadGrid');
                return [true];
            },
            errorTextFormat: function (data) {
                return 'Error: Unable to perform request. Was data input valid?';
            }
        },
        // options for the Delete Dailog
        {
            errorTextFormat: function (data) {
                return 'Error: ' + data.responseText
            }
        });
}

