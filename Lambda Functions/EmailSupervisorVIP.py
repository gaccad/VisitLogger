

import boto3, os, json

FROM_EMAIL_ADDRESS = 'gaccad@gmail.com'

ses = boto3.client('ses')

def lambda_handler(event, context):
    # Print event data to logs .. 
    print("Received event: " + json.dumps(event))
    print("Hi")
    
    testing = 'N'       # Toggle testing mode to not spam emails
    
    dynamodb = event['Records'][0]['dynamodb']['NewImage']
    
    if (testing == 'N'):
        # Publish message to email
        ses.send_email( Source=FROM_EMAIL_ADDRESS,
            # Destination={ 'ToAddresses': [ event['Input']['email'] ] }, 
            # Message={ 'Subject': {'Data': 'Whiskers Commands You to attend!'},
            #     'Body': {'Text': {'Data': event['Input']['message']}}
            
            Destination={ 'ToAddresses': [ 'gabster22@gmail.com' ] }, 
            Message={ 'Subject': {'Data': 'A VIP customer has been visited' },
                'Body': {'Text': {'Data': 'Hello, \n\nVIP Customer ' + dynamodb["CustomerName"]["S"] + ' has been visited!' + '\n\n' +
                'Meeting Subject: ' + dynamodb["MeetingSubject"]["S"] + '\n' +
                'Meeting Details: ' + dynamodb["MeetingDetails"]["S"] + '\n' +
                'Salesperson: ' + dynamodb["Salesperson"]["S"] + '\n' +
                'Meeting Date: ' + dynamodb["Date"]["S"] + '\n' +
                'Feedback: ' + dynamodb["Feedback"]["S"] + '\n'
                }}    
            }
        )
    elif (testing == 'Y'):
        print("Received event: " + json.dumps(event) + "TESTING")
        print("***** Is customer " + dynamodb["CustomerName"]["S"] + " a VIP customer?:  " + dynamodb["VIPCustomer"]["S"])
    else:
        print("No conditions met")
        
    return 'Success!'