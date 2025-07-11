# TypeORM 시드 데이터 관리 시스템

이 프로젝트는 **TypeORM**과 **@faker-js/faker**를 사용하여 QA 환경에서 조직, 부서, 사용자 데이터를 생성하고 관리하는 시스템입니다.

## 🚀 시작하기

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 환경 변수 설정

`.env` 파일을 생성하고 데이터베이스 연결 정보를 설정하세요:

```env
QA_DB_HOST=localhost
QA_DB_PORT=5432
QA_DB_USER=qa_user
QA_DB_PASSWORD=qa_password
QA_DB_NAME=qa_test_db
```

### 3. 시드 데이터 실행

```bash
# QA 테스트 데이터 생성
npm run qa:seed
```