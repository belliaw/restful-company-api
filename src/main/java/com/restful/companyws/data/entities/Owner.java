package com.restful.companyws.data.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * Entity class for the Owner model
 *
 * @author: william.bellia
 * @since: 12/02/2016 09:51
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Owner
{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    private String name;
    private String surname;

    @ManyToOne
    @JoinColumn(name="company_id")
    private Company company;
}
