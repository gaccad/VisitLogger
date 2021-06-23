
import json


import boto3
import random

from time import strftime

dynamodb = boto3.resource('dynamodb')

table = dynamodb.Table('HelloWorldDatabase')


now = strftime("%d/%m/%Y")


def lambda_handler(event, context):
    
# Load the data from the received event into the variables
#    name = event['firstName'] +' '+ event['lastName']
    CustomerName = event['CustomerName']
    Salesperson = event['Salesperson']
    Date = event['Date']
    MeetingType = event['MeetingType']
    MeetingSubject = event['MeetingSubject']
    MeetingDetails = event['MeetingDetails']
    VIPCustomer = event['VIPCustomer']
    Feedback = event['Feedback']
    
    
# write name and time to the DynamoDB table 
    response = table.put_item(
        Item={
            "ID": CustomerName + str(now) + str(random.random()),
            "CustomerName":CustomerName,
            "Salesperson":Salesperson,
			"Date":Date,
			"MeetingType":MeetingType,
			"MeetingSubject":MeetingSubject, 
			"MeetingDetails":MeetingDetails, 
			"VIPCustomer":VIPCustomer, 
			"Feedback":Feedback
            })
            
      
      
            
# return a properly formatted JSON object
    return {
        'statusCode': 200,
        
        'body': json.dumps('Thank you, visit for customer ' + CustomerName + ' has been recorded.')
        
# Code used below when I was having CORS issues. The issue was resolve by disabling 'Lambda Proxy Integration in the REST '        
        # 'content-type': 'application/json',
        # 'isBase64Encoded': True|False,
        # 'headers': {
        #     'Access-Control-Allow-Headers': 'Content-Type',
        #     'Access-Control-Allow-Origin': '*',
        #     'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        #}
    }