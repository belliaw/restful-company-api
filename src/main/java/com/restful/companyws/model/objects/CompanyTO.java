package com.restful.companyws.model.objects;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * The Transfer object for the {@link com.restful.companyws.data.entities.Company}
 *
 * @author: william.bellia
 * @since: 12/02/2016 09:58
 */
@Data
@AllArgsConstructor
public class CompanyTO
{
    private long id;
    private String name;
    private String address;
    private String city;
    private String country;
    private String email;
    private String phoneNumber;
}
