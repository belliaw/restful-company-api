package com.restful.companyws.api;

import com.restful.companyws.data.entities.Company;
import com.restful.companyws.data.entities.Owner;
import com.restful.companyws.data.repository.CompanyDAO;
import com.restful.companyws.data.repository.OwnerDAO;
import com.restful.companyws.model.ModelFactory;
import com.restful.companyws.model.objects.CompanyTO;
import com.restful.companyws.model.objects.OwnerTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
     * Inject a reference of Owner Repository
     */
    @Autowired
    private OwnerDAO ownerRepo;

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
        LOG.info("Received createCompany request with parameters [{}],[{}],[{}],[{}],[{}],[{}],[{}]", name, address, city, country, email, phoneNumber);
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

            return new ResponseEntity<>(companyTOs, HttpStatus.OK);
        }
        catch (Exception ex)
        {
            LOG.error("Error in fetching companies", ex);
            return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @RequestMapping(value = "/getCompany/{id}")
    public ResponseEntity<?> getCompany(@PathVariable("id") long id)
    {
        LOG.info("Received getCompany request for ID:[{}]", id);

        try
        {
            Company company;
            if ((company = companyRepo.findOne(id)) == null)
            {
                LOG.info("Company with ID:[{}] not found", id);
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            CompanyTO companyTO = ModelFactory.getCompanyTO(company);

            LOG.info("Company with ID:[{}] Name:[{}] found", companyTO.getId(), companyTO.getName());

            return new ResponseEntity<>(companyTO, HttpStatus.OK);
        }
        catch (Exception ex)
        {
            LOG.error("Error in fetching company", ex);
            return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @RequestMapping(value = "/updateCompany/{id}")
    public ResponseEntity<?> updateCompany(@PathVariable("id") long id,
                                           @RequestParam("edit-name") String name,
                                           @RequestParam("edit-address") String address,
                                           @RequestParam("edit-city") String city,
                                           @RequestParam("edit-country") String country,
                                           @RequestParam(value = "edit-email", required = false) String email,
                                           @RequestParam(value = "edit-phoneNumber", required = false) String phoneNumber)
    {
        LOG.info("Received updateCompany request for ID:[{}]", id);

        try
        {
            //first get the company by id
            Company company = companyRepo.findOne(id);

            if (company == null)
            {
                LOG.info("Company with ID:[{}] not found", id);
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            //update entity with parameters receievd from request
            company.setName(name);
            company.setAddress(address);
            company.setCity(city);
            company.setCountry(country);
            company.setEmail(email);
            company.setPhoneNumber(phoneNumber);

            companyRepo.save(company);

            LOG.info("Company with ID:[{}] updated succesfully", company.getId());

            return new ResponseEntity<>(company.getId(), HttpStatus.OK);
        }
        catch (Exception ex)
        {
            LOG.error("Error in fetching company", ex);
            return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @RequestMapping(value = "/getOwners")
    public ResponseEntity<?> getOwners()
    {
        LOG.info("Received getOwners request");

        try
        {
            List<OwnerTO> ownerTOs = ModelFactory.getOwnersTOs(
                    ownerRepo.findAll());

            LOG.info("getOwners request complete");

            return new ResponseEntity<>(ownerTOs, HttpStatus.OK);
        }
        catch (Exception ex)
        {
            LOG.error("Error in fetching owners", ex);
            return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @RequestMapping(value = "/createOwner")
    public ResponseEntity<?> getOwners(@RequestParam("owner-name") String name,
                                       @RequestParam("owner-surname") String surname,
                                       @RequestParam("owner-companyid") long id)
    {
        LOG.info("Received createOwner request with parameters [{}],[{}],[{}]", name, surname, id);

        try
        {
            //first get the company by id
            Company company = companyRepo.findOne(id);

            if (company == null)
            {
                LOG.info("Company with ID:[{}] not found", id);
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            Owner newOwner = new Owner(
                    0,
                    name,
                    surname,
                    company);

            ownerRepo.save(newOwner);

            LOG.info("Owner succesfully created with id [{}]", newOwner.getId());

            return new ResponseEntity<>(newOwner.getId(), HttpStatus.OK);
        }
        catch (Exception ex)
        {
            LOG.error("Error in creating owner", ex);
            return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
}
