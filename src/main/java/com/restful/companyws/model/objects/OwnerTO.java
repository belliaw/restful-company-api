package com.restful.companyws.model.objects;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author: william.bellia
 * @since: 12/02/2016 09:59
 */
@Data
@AllArgsConstructor
public class OwnerTO
{
    private long id;
    private String name;
    private String surname;
    private CompanyTO companyTO;

}
