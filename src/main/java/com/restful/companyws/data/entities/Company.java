package com.restful.companyws.data.entities;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Entity class for the Company model
 *
 * @author: william.bellia
 * @since: 12/02/2016 09:46
 */
@Entity
@Data
@AllArgsConstructor
public class Company
{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    private String name;
    private String address;
    private String city;
    private String country;
    private String email;
    private String phoneNumber;
}
