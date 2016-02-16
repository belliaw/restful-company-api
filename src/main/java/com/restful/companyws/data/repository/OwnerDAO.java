package com.restful.companyws.data.repository;

import com.restful.companyws.data.entities.Company;
import com.restful.companyws.data.entities.Owner;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * @author: william.bellia
 * @since: 12/02/2016 09:56
 */
public interface OwnerDAO extends CrudRepository<Owner,Long>
{
    List<Owner> findByCompany(Company company);
}
