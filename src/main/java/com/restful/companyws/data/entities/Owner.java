package com.restful.companyws.data.entities;

import lombok.Data;

import javax.persistence.*;

/**
 * Entity class for the Owner model
 *
 * @author: william.bellia
 * @since: 12/02/2016 09:51
 */
@Entity
@Data
public class Owner
{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    private String name;
    private String surname;

    @ManyToOne
    private Company company;
}
