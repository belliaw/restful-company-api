package com.restful.companyws.api;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author: William.Bellia
 * @since: 12/02/2016 16:15
 */

@Controller
public class WebController
{
    @RequestMapping(value = "/client", method = RequestMethod.GET)
    public String index()
    {
        return "index";
    }
}

