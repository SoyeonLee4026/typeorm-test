#!/bin/bash

# QA 테스트 데이터 생성 스크립트
echo "🧪 QA 테스트 데이터 생성 시작..."

# .env 파일 경로 설정
ENV_FILE=".env"

# .env 파일이 있으면 불러오기
if [ -f "$ENV_FILE" ]; then
    echo "📄 .env 파일을 불러옵니다..."
    # .env 파일을 읽어서 환경변수로 export
    export $(grep -v '^#' $ENV_FILE | xargs)
    echo "✅ 환경변수 로드 완료!"
else
    echo "⚠️  .env 파일이 없습니다. 기본값 사용..."
    # 기본값 설정
    export QA_DB_HOST=${QA_DB_HOST:-"localhost"}
    export QA_DB_PORT=${QA_DB_PORT:-"5432"}
    export QA_DB_USER=${QA_DB_USER:-"postgres"}
    export QA_DB_PASSWORD=${QA_DB_PASSWORD:-"1q2w3e1!"}
    export QA_DB_NAME=${QA_DB_NAME:-"qa_test_db"}
fi

# 환경변수 확인 (보안상 패스워드는 마스킹)
echo "🔧 현재 DB 설정:"
echo "   Host: $QA_DB_HOST"
echo "   Port: $QA_DB_PORT"
echo "   User: $QA_DB_USER"
echo "   Password: ${QA_DB_PASSWORD:0:1}***"
echo "   Database: $QA_DB_NAME"

# TypeScript 스크립트 실행
echo "📦 TypeScript 스크립트 실행 중..."
pnpm run qa:seed

# 결과 확인
if [ $? -eq 0 ]; then
    echo "✅ QA 데이터 생성 완료!"
else
    echo "❌ QA 데이터 생성 실패!"
    exit 1
fi 