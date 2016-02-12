package com.restful.companyws.data.repository;

import com.restful.companyws.data.entities.Company;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * @author: william.bellia
 * @since: 12/02/2016 09:53
 */
public interface CompanyDAO extends CrudRepository<Company,Long>
{
}
