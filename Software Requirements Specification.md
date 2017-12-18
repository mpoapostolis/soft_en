# Software Requirements Specification

### for **goKiddo**

#### 15/11/17 - Version 0.1 prepared by **TeamRocket**

- [1. Introduction](#1-introduction)
  * [1.1 Purpose](#11-purpose)
  * [1.2 Document Conventions](#12-document-conventions)
  * [1.3 Intended Audience and Reading Suggestions](#13-intended-audience-and-reading-suggestions)
  * [1.4    Product Scope](#14----product-scope)
  * [1.5    References](#15----references)
- [2.  Overall Description](#2--overall-description)
  * [2.1    Product Perspective](#21----product-perspective)
  * [2.2    Product Functions](#22----product-functions)
  * [2.3    User Classes and Characteristics](#23----user-classes-and-characteristics)
  * [2.4    Operating Environment](#24----operating-environment)
  * [2.5    Design and Implementation Constraints](#25----design-and-implementation-constraints)
  * [2.6    User Documentation](#26----user-documentation)
  * [2.7    Assumptions and Dependencies](#27----assumptions-and-dependencies)
- [3.  External Interface Requirements](#3--external-interface-requirements)
  * [3.1    User Interfaces](#31----user-interfaces)
  * [3.2    Hardware Interfaces](#32----hardware-interfaces)
  * [3.3    Software Interfaces](#33----software-interfaces)
  * [3.4    Communications Interfaces](#34----communications-interfaces)
  * [4.     System Features](#4-----system-features)
- [5.  Other Nonfunctional Requirements](#5--other-nonfunctional-requirements)
  * [5.1     Performance Requirements](#51-----performance-requirements)
  * [5.2    Safety Requirements](#52----safety-requirements)
  * [5.3    Security Requirements](#53----security-requirements)
  * [5.4    Software Quality Attributes](#54----software-quality-attributes)
  * [5.5    Business Rules](#55----business-rules)
    + [5.5.1 Digital wallet](#551-digital-wallet)
    + [5.5.1 Ticket policy](#551-ticket-policy)
    + [5.5.1 Revenue model](#551-revenue-model)
- [6.  Other Requirements](#6--other-requirements)
- [Appendix A: Glossary](#appendix-a--glossary)
- [Appendix B: Analysis Models](#appendix-b--analysis-models)
- [Appendix C: To Be Determined List](#appendix-c--to-be-determined-list)

### 1. Introduction

#### 1.1 Purpose
We aim to create a simple, effective and comprehensive booking system that helps parents book activities for their kids.

#### 1.2 Document Conventions

#### 1.3 Intended Audience and Reading Suggestions
The intended audience of the current document are:
- the developers of this project
- third-parties associated with the production process
- potential investors
- technical reviewers tasked with assessing the state of the project (along with their grannies).

#### 1.4 	Product Scope
The proposed software enables the parents to navigate their numerous options for kid activities using a responsive interface, offering multiple search filters, all from the comfort of a single page on their phone, tablet or personal computer. For service suppliers, we present an attractive way of supplying key information on the offered activities and the ability of self-promotion, in order to reach a wider audience.

#### 1.5 	References

### 2. 	Overall Description

#### 2.1 	Product Perspective
The application is a web-based system implementing the client-server model. It offers the following features:

- Cross platform support: The application is compatible with any connected device capable of running JavaScript.
- User account: The system allows the user to create an account and manage a digital wallet.
- Search: The user can search for activities of their liking using various filters.
- Booking system: The user can book activities using a digital currency associated with our digital wallet.

#### 2.2 	Product Functions
Our product promises to deliver the following functionality, sorted by user class

- Anonymous user
    - Query activities using various filters (category, distance, price)
    - Register as a Parent or Service supplier
- Parent
    - Manage a digital wallet
    - Book activities using our digital currency
    - Query activities using various filters (category, distance, price)
    - Mark activities as favorite
    - Access a calendar overview of future and past activities
    - Review activities
- Service supplier
    - Manage a digital wallet
    - Register service details
    - Define pricing policy
    - Choose from a set of predefined refund policies
    - Promote service to gain favorable search result position
- Administrator
    - Grant and revoke user privileges
    - Permanently ban users
    - Reset user password
- Marketer
    - Query activities using various filters (category, distance, price)
    - Manage the advertisements of affiliated companies


#### 2.3 	User Classes and Characteristics
As mentioned above, we identify the following user classes, based on the product functions they use:

- Anonymous user
- Parent
- Service supplier
- Administrator
- Marketer

#### 2.4 	Operating Environment
Cloud based Ubuntu 16.04 VM

#### 2.5 	Design and Implementation Constraints
The application should be responsive on all devices and achieve efficient network utilization, via source code minification and gzipped data transfer.

#### 2.6 	User Documentation

#### 2.7 	Assumptions and Dependencies
We assume that all electronic payments are simulated, in the sense that no *real* money is transferred to and from a digital wallet.

There is a binary dependency on a separate module, tasked with processing images submitted by the users, in order to add a watermark and optimize the image size. The details of this module will be specified in later revisions.

There is also a depency on a third-party online map service, to be specified in later revisions.

### 3. 	External Interface Requirements

#### 3.1 	User Interfaces

#### 3.2 	Hardware Interfaces

#### 3.3 	Software Interfaces

#### 3.4 	Communications Interfaces

#### 4. 	System Features

### 5. 	Other Nonfunctional Requirements

#### 5.1     Performance Requirements
We require that:
- each transaction confirmation requires at most 0.5 seconds.
- each query returns results in at most 1 second.
- the system can support up to 10.000 users.



#### 5.2 	Safety Requirements

#### 5.3 	Security Requirements
As the application deals with sensitive personal data, we ensure privacy protection by implementing
- an encrypted website
- token based authentication
- encrypted data storage

#### 5.4 	Software Quality Attributes

#### 5.5 	Business Rules
##### 5.5.1 Digital wallet
We only grant a digital wallet to registered users.
Any user with a digital wallet can top up their points via credit card or PayPal.
We set the exchange rate to be `1 euro = 10 coins` and we offer a `10%` coin bonus for purchases over 100 euros.

##### 5.5.1 Ticket policy
Every is uniquely identified by its ticketID. We present all service providers with the following refund policy options:

- Full refund for cancellations up to 24h before the activity, 50% refund afterwards
- Full refund for cancellations up to 96h before the activity, 30% refund afterwards
- A 50 % refund for all cancellations

##### 5.5.1 Revenue model
Our revenue model identifies three basic revenue streams:
- 10% commission on every ticket sale
- Promotion fees for service suppliers
- Advertisement fees for affiliated companies

### 6. 	Other Requirements

### Appendix A: Glossary

### Appendix B: Analysis Models

### Appendix C: To Be Determined List
- Determine Appendix C