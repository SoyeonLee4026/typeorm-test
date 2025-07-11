#!/usr/bin/env ts-node
import "reflect-metadata";
import { QaDataSource } from "../seeds/data-source";
import { DatabaseSeeder } from "../seeds/database.seeder";

async function main() {
  console.log("🧪 QA 테스트 데이터 생성 시작...");

  try {
    // 데이터베이스 연결
    await QaDataSource.initialize();
    console.log("🔗 데이터베이스 연결 완료!");

    // 데이터베이스 시더 실행
    const databaseSeeder = new DatabaseSeeder();

    // 기존 데이터 삭제 후 새로 생성
    await databaseSeeder.refresh();

    console.log("🎉 모든 작업 완료!");
  } catch (error) {
    console.error("❌ 오류 발생:", error);
    process.exit(1);
  } finally {
    await QaDataSource.destroy();
    console.log("🔌 데이터베이스 연결 해제!");
  }
}

main();
