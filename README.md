# Code Inventory Management System (CIMS)

### Prerequisites
1. Docker
2. AWS CLI
3. zip: `sudo apt-get install zip`

### Setting up LocalStack

```bash
pip3 install awscli-local
```
Create a queue:
```bash
awslocal sqs create-queue --queue-name RepoScanQueue
```
Replace the queue URL in your `.env`.