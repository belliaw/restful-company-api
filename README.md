			
Restful API - Company Webservice
================================

Introduction
------------

The application presented in this repository mainly consists 
of a RESTful api which exposes 6 methods. The signature for 
these methods is mainly composed of ResponseEntity object as 
its return type and POST request parameters as the type 
of parameters required for input.

The technologies presented are Spring as the backbone framework,
Spring MVC, Spring Data with Hibernate as its repository, Lombok package to 
present cleaner and more concise beans and a PostGRES database
as its storage repository. A jQuery/Bootstrap client is also presented so
that it provides a user friendly interface for the api. 

License
-------

The application may be downloaded, modified and used freely for
educational, research and commercial purposes without any obligation 
whatsoever to the author. 

Version
-------

The version presented in this Repository is 1.0.0

Requirements
------------

The application is packaged in such a way that it can be easily
deployed on the Heroku Cloud Platform (http://www.heroku.com)
Hence the basic requirements are a standard JDK installation, a 
working Maven installation (https://maven.apache.org/), Heroku Toolbelt
(https://toolbelt.heroku.com/) and a Heroku account. Heroku Toolbelt 
also allows the application to run locally as well. A working
installation of git is also required in order to pull the application
from its Github repository.

Interface Modules
-------

The application provides two API modules for access which are:
	- com.restful.companyws.api.Controller -> Exposes the RESTful interface
	- com.restful.companyws.api.WebController -> Provides the jQuery client

GitHub
------ 

The github repository for this appliction is located on 
https://github.com/belliaw/restful-company-api

Configuration
-------------

The application may have its data source properties adjusted accordingly
in the configuration.properties file, which is located in the resources
folder of the project.

Installation
------------

In order to install the application, first pull the
repository from Github by using the command 'git clone
https://github.com/belliaw/restful-company-api'. Once downloaded 
go to the root folder of the application and type 'mvn clean install'.

Running the application
-----------------------

Heroku provides a very detailed documentation on how to run an 
application on their cloud which can be found on
https://devcenter.heroku.com/articles/getting-started-with-java#introduction.
Note that the application contains a Procfile which also allows it to run
locally. This is achieved by executing the command 'heroku local' on
your workstation.

*Note*
A working instance is currently uploaded on Heroku and can be located 
on https://restful-company-api.herokuapp.com. In order to access the jQuery
client please access https://restful-company-api.herokuapp.com/companyws/client.

**NOTE**
As stated in Heroku's website, free dynos do not run for 24/7, since they sleep
for 6 hours and is set to SLEEP mode after an inactivity of 30 minutes. In the
scenario of being unable to access the client or the API, kindly try again after
a few minutes. Furthermore, the PostGRES schema is refreshed when the dyno 
restarts, hence data in previous requests is lost. This is due to the fact that
the application's spring context is configured to create a schema upon deployment. 
This may be disabled accordingly in the context by commenting the line and rebuild the project:

	- <prop key="hibernate.hbm2ddl.auto">${db.mode}</prop>
	
In the case of difficulty please contact the author on the details listed hereunder
in the Authors section.

API Reference
-------------

The RESTful api of this application consists of 6 methods. Below is a reference on
how these methods may be queries using cURL:
* createCompany *An Id of type long of the newly created company is returned*:

	* curl --data "name={name}&address={address}&city={city}&country={country}" {URL}/companyws/createCompany
```
$ curl --data "name=Tech Works&address=20, Ave Street&city=Copenhagen&country=Denmark"http://restful-company-api.herokuapp.com/companyws/createCompany
```
		
* getCompany/{company-id} *A JSON object containing company details is returned*:
		
	* curl {URL}/companyws/getCompany/{id}
```
$ curl http://restful-company-api.herokuapp.com/companyws/getCompany/3
```		

* getAllCompanies *A JSON object containing a list of companies is returned*:
	
	* curl {URL}/getAllCompanies
```	
$ curl http://restful-company-api.herokuapp.com/companyws/getAllCompanies
```		
	
* updateCompany/{company-id} *An Id of type long of the updated company is returned*:
	
	* curl --data "edit-name={name}&edit-address={address}&edit-city={city}
			&edit-country={country}&edit-email={email}&edit-phoneNumber={phonenumber}" 
			{URL}/companyws/updateCompany/{company-id}
```
$ curl --data "edit-name=Tech Works&edit-address=20, Ave Street&edit-city=Copenhagen&edit-country=Denmark&edit-email=contact@techworks.com&edit-phoneNumber=098272621" http://restful-company-api.herokuapp.com/companyws/updateCompany/3
```		

* createOwner *An Id of type long of the newly created owner is returned*:
	
	* curl --data "owner-name={name}&owner-surname={surname}&owner-companyid={company-id}" {URL}/companyws/createOwner
```
$ curl --data "owner-name=William&owner-surname=Bellia&owner-companyid=3" http://restful-company-api.herokuapp.com/companyws/createOwner
```
		
* getOwners *A JSON object containing a list of owners is returned*:
	
	* curl {URL}/companyws/getOwners
```
$ curl http://restful-company-api.herokuapp.com/companyws/getOwners
```		

Authors
-------------

Application has been developed and deployed by William Bellia.
Contact: william.bellia85@gmail.com







