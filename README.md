# VisitLogger

Simple Visit Logger using serverless architecture 

# 1. Preface

## 1.1	Introduction & Background

The Visit Logger application offers a simple web interface for the sales people to enter their customer visits at the end of the day or while they are on the move. 
The sales managers are notified when a VIP customer is visited and have access to an analysis platform to run their reports.

## 1.2	Purpose of this Document

This document describes the design and architecture of the solution and presents the basic technologies used.

## 1.3	Scope

### 1.3.1	Included In Scope

The scope of the solution includes:
-	High Level Design overview of the solution
-	Description of each function
-	Phased approach of the project
-	Link to Github repository: https://github.com/gaccad/VisitLogger
-	Link to working application website: https://dev9334.d137fzgar94quk.amplifyapp.com/ 

### 1.3.2	Excluded from Scope

-	Details of code use in lambda function and JavaScript frontend (can be found on the github repository).


# 2.	Architecture Overview

The Visit Logger application consists of multiple components that provide individual capabilities that address specific aspects of the overall solution. These components include:

-	Hosting of frontend dynamic website with JavaScript framework
-	Internal repository for code maintenance and commits
-	API Gateway solution to expose REST API function of backend logic
-	Serverless execution of code required for the 5 different functions of the application
-	NoSQL backend database to store visit data recorded by users as well as legacy data from previous system
-	Email notification functionality to notify supervisors when a visit to a VIP customer is logged
-	Object storage containing Legacy Data to be loaded via serverless function to the NoSQL DB
-	Reporting and analysis solution to aggregate and present data to management

The below picture gives a high-level view of the architecture of the Visit Logger solution. The required capabilities are mapped to a set of AWS products that provide the required functionality.

Each of the components is listed below and will be further detailed in the following chapters.

AWS Amplify	
AWS Lambda 	
API Gateway	
AWS DynamoDB	
AWS CodeCommit	
AWS Simple Email Service	
AWS Athena	
AWS Quicksight	
AWS S3	
AWS Cognito	
AWS IAM	

![alt text](https://github.com/gaccad/VisitLogger/blob/main/Overall%20Architecture.jpg)


## 2.1	Overall Architectural Decisions

-	All functionalities should be serverless whenever possible 
-	NoSQL to be used instead of RDBMS for cost efficiency and due to the loose schema structure
-	Python to be used as language for Lambda functions
-	All functions to run on roles based on least required privileges principle
-	Internal code to be stored on AWS CodeCommit and mirrored on Github for public access
-	AWS QuickSight to be used as analysis solution thanks to the recent DynamoDB connector availability
-	SPICE to be used for Quicksight analysis retrieval: Real time data is not required and large dataset is difficult to manipulate real time
-	DynamoDB insert trigger to be used for email notification instead of adding code to RecordVisit function: decoupling of functionality and scalability options for future event driven calls


## 2.2	Database Structure

-	ID (Primary Key)
-	Customer Name
-	Salesperson (Sort Key)
-	Date
-	Meeting Type
-	Meeting Subject
-	Meeting Details
-	VIPCustomer
-	Feedback
-	LegacyData

## 2.3	Serverless Functions Details

### RecordVisits
- Function: Received JSON object as a parameter from index.html and parses it then puts data into VisitTable in DynamoDB
- Trigger: REST API

### GetVisits 
- Function: Retrieves visit data from VisitTable and passes it to index.html via a JSON objec
- Trigger: REST API

### EmailSupervisor
  -	Function: When a VIP customer visit is logged, the function receives the NewImage JSON object from DynamoDB and sends an email to the supervisor with visit details
  -	Trigger: DynamoDB Stream
  
### LegacyDataLoader
  -	Function: Reads csv file from S3 object storage, parses it and loads the data into the VisitTable in DynamoDB. Only used once to load legacy data.
  -	Trigger: Manual
 
### AthenaDynamoDBConnector
- Function: In built function that connects DynamoDB VisitTable to Athena which is in turned used by QuickSight for data aggregation and analysis
-	Trigger: QuickSight query 

## 2.4	Flow Descriptions

### 2.4.1	Visit Logging

1.	User opens the webpage and enters the required data
2.	The page calls the REST API and passed the captured parameters
3.	REST API calls the lambda function RecordVisit
4.	The lambda function puts the data into the DynamoDB table VisitTable
5.	The user is notified via popup that the visit logging was successful

### 2.4.2	Email Notification

1.	User enters visit data and set the ‘VIP Customer’ field to ‘Yes’
2.	DynamoDB event stream is triggered on insert and calls the EmailSupervisor lambda function
3.	The function uses SES to send email to the supervisor (currently hardcoded) with visit details
 

### 2.4.3	Visit Data Retrieval (Web)

Functionality is currently hidden. Can be tested from get.html page
1.	User clicks on ‘Get recently entered visits’ link
2.	Function returns predefined number of visits

### 2.4.4	Legacy Data Loading

1.	Legacy data is loaded into S3 in csv format
2.	Disable EmailSupervisor Lambda trigger to avoid having to call the function on every insert
3.	Increase timeout on lambda function from 3 seconds to 180 seconds
4.	Lambda function LoadLegacyData is manually executed to load the data into DynamoDB
5.	Enable EmailSupervisor Lambda trigger

### 2.4.5	Visit Data Analysis

1.	Sales manager logs into the Quicksight portal using his username and password
2.	User selects a pre-defined analysis dashboard or can create a new one

![alt text](https://github.com/gaccad/VisitLogger/blob/main/QuickSight%20Dashboard.jpg)

