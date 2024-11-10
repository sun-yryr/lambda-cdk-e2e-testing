FROM public.ecr.aws/lambda/python:3.12-x86_64

# MEMO: SAM のオプションでエンドポイントを設定することができないため、イメージに埋め込む
# FYI: https://github.com/aws/aws-sam-cli/issues/3795
ENV AWS_ENDPOINT_URL=http://localstack:4566
