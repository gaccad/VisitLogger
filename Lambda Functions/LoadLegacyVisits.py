import boto3
import json
import os
import random
from time import gmtime, strftime

bucket_name = 'visitloggerlegacydata'
csv_key = 'LegacyDataFull.csv' # csvdynamo.csv
table_name = 'HelloWorldDatabase'

#table_name = os.environ['HelloWorldDatabase']   

# temporary file to store csv downloaded from s3
tmp_csv_file = '/tmp/' + csv_key

s3 = boto3.resource('s3')
db_table = boto3.resource('dynamodb').Table(table_name)

def save_to_dynamodb(id, Date, CustomerName, Salesperson, MeetingType, MeetingSubject, MeetingDetails, Feedback, Legacy):

    return db_table.put_item(
        Item={
            'ID': id,
            "CustomerName":CustomerName,
            "Salesperson":Salesperson,
            "Date":Date,
            "MeetingType":MeetingType,
            "MeetingSubject":MeetingSubject, 
            "MeetingDetails":MeetingDetails, 
            "Feedback":Feedback,
            "Legacy": Legacy
        })
        
        
           
			
			

def lambda_handler(event, context):

    s3.meta.client.download_file(
                    bucket_name, 
                    csv_key, 
                    tmp_csv_file)
    
    with open(tmp_csv_file, 'r') as f:
    
        next(f) # skip header
    
        for line in f:
    
            
            Date, CustomerName, Salesperson, MeetingType, MeetingSubject, MeetingDetails, Feedback, Legacy = line.rstrip().split(',')
            id = CustomerName + str(Date) + str(random.random())
            result = save_to_dynamodb(id, Date, CustomerName, Salesperson, MeetingType, MeetingSubject, MeetingDetails, Feedback, Legacy)
            
            #print('Line is: ' + line + Date, CustomerName, Salesperson, MeetingType, MeetingSubject, MeetingDetails, Feedback, Legacy)
            #print()
            #print(result)

    return {'statusCode': 200}