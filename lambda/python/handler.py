import json
import boto3
from datetime import datetime
import os

bucket_name = os.environ.get('BUCKET_NAME')

def lambda_handler(event, context):
    # S3クライアントの初期化
    s3_client = boto3.client('s3')
    
    # バケット名とファイル名の設定
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    file_name = f'logs/request_{timestamp}.json'
    
    try:
        # リクエストデータをJSON形式で保存
        log_data = {
            'timestamp': timestamp,
            'request_data': event,
            'request_id': context.aws_request_id
        }
        
        # S3にアップロード
        s3_client.put_object(
            Bucket=bucket_name,
            Key=file_name,
            Body=json.dumps(log_data, indent=2)
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'ログが正常に保存されました',
                'file_name': file_name
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': 'エラーが発生しました',
                'error': str(e)
            })
        }
