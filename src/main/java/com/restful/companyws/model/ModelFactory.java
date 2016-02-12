package com.restful.companyws.model;

import com.restful.companyws.data.entities.Company;
import com.restful.companyws.model.objects.CompanyTO;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by William on 12/02/2016.
 */
public class ModelFactory
{
    public static CompanyTO getCompanyTO(Company company)
    {
        return new CompanyTO(
                company.getId(),
                company.getName(),
                company.getAddress(),
                company.getCity(),
                company.getCountry(),
                company.getEmail(),
                company.getPhoneNumber()
        );
    }

    public static List<CompanyTO> getCompanyTOs(Iterable<Company> companies)
    {
        List<CompanyTO> companyTOList = new ArrayList<>();

        for (Company company : companies)
        {
            companyTOList.add(new CompanyTO(
                    company.getId(),
                    company.getName(),
                    company.getAddress(),
                    company.getCity(),
                    company.getCountry(),
                    company.getEmail(),
                    company.getPhoneNumber()
            ));
        }

        return companyTOList;
    }
}
