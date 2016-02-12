package com.restful.companyws.api;

import com.restful.companyws.data.entities.Company;
import com.restful.companyws.data.repository.CompanyDAO;
import com.restful.companyws.model.ModelFactory;
import com.restful.companyws.model.objects.CompanyTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * The Controller of the web application. It exposes the required RESTFul methods
 *
 * @author: william.bellia
 * @since: 12/02/2016 10:03
 */
@RestController
public class Controller
{

    @Value("${ctrl.nodata}")
    private String nodata;

    @Value("${ctrl.serviceunavailable}")
    private String serviceUnavailable;

    @Value("${ctrl.unknownerror}")
    private String unknownError;

    @Value("${ctrl.companynotfound}")
    private String companyNotFound;

    /**
     * Inject a reference of Company Repository
     */
    @Autowired
    private CompanyDAO companyRepo;

    /**
     * Class logger definition
     */
    static final Logger LOG = LoggerFactory.getLogger(Controller.class);

    @RequestMapping(value = "/createCompany")
    public ResponseEntity<?> createCompany(@RequestParam("name") String name,
                                           @RequestParam("address") String address,
                                           @RequestParam("city") String city,
                                           @RequestParam("country") String country,
                                           @RequestParam(value = "email", required = false) String email,
                                           @RequestParam(value = "phoneNumber", required = false) String phoneNumber)
    {
        LOG.info("Received createCompany request with parameters [{}],[{}],[{}],[{}],[{}],[{}],[{}]",name,address,city,country,email,phoneNumber);
        Company newCompany = new Company(
                0,
                name,
                address,
                city,
                country,
                email,
                phoneNumber);
        try
        {
            companyRepo.save(newCompany);

            LOG.info("Company succesfully created with id [{}]", newCompany.getId());
        }
        catch (Exception ex)
        {
            LOG.error("Error in creating company", ex);
            return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        }

        return new ResponseEntity<>(newCompany.getId(), HttpStatus.OK);
    }

    @RequestMapping(value = "/getAllCompanies")
    public ResponseEntity<?> getAllCompanies()
    {
        LOG.info("Received getAllCompanies request");

        try
        {
            List<CompanyTO> companyTOs = ModelFactory.getCompanyTOs(
                    companyRepo.findAll()
            );

            LOG.info("getAllCompanies request complete");

            return new ResponseEntity<>(companyTOs,HttpStatus.OK);
        }
        catch(Exception ex)
        {
            LOG.error("Error in fetching companies", ex);
            return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @RequestMapping(value = "/getCompany/{id}")
    public ResponseEntity<?> getCompany(@PathVariable("id") long id)
    {
        LOG.info("Received getCompany request for ID:[{}]",id);

        try
        {
            CompanyTO companyTO = ModelFactory.getCompanyTO(
                    companyRepo.findOne(id)
            );

            LOG.info("Company with ID:[{}] Name:[{}] found",companyTO.getId(),companyTO.getName());

            return new ResponseEntity<>(companyTO,HttpStatus.OK);
        }
        catch(Exception ex)
        {
            LOG.error("Error in fetching company",ex);
            return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @RequestMapping(value = "/updateCompany/{id}")
    public ResponseEntity<?> updateCompany(@PathVariable("id") long id,
                                           @RequestParam("name") String name,
                                           @RequestParam("address") String address,
                                           @RequestParam("country") String country,
                                           @RequestParam(value = "email", required = false) String email,
                                           @RequestParam(value = "phoneNumber", required = false) String phoneNumber)
    {
        return null;
    }





}
