import { UserSeeder } from "../scripts/user.seeder";
import { DepartmentSeeder } from "./department.seeder";
import { OrganizationSeeder } from "./organization.seeder";

export class DatabaseSeeder {
  private userSeeder: UserSeeder;
  private organizationSeeder: OrganizationSeeder;
  private departmentSeeder: DepartmentSeeder;

  constructor() {
    this.userSeeder = new UserSeeder();
    this.organizationSeeder = new OrganizationSeeder();
    this.departmentSeeder = new DepartmentSeeder();
  }

  async seed(): Promise<void> {
    console.log("🌱 데이터베이스 시드 작업 시작...");

    try {
      // 1. 사용자 생성
      const users = await this.userSeeder.run();

      // 2. 기관 생성
      const organizations = await this.organizationSeeder.run();

      // 3. 부서 생성 (기관에 의존)
      const departments = await this.departmentSeeder.run(organizations);

      console.log("🎉 모든 시드 데이터 생성 완료!");
      console.log(`📊 결과: 사용자 ${users.length}명, 기관 ${organizations.length}개, 부서 ${departments.length}개`);
    } catch (error) {
      console.error("❌ 시드 작업 중 오류 발생:", error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    console.log("🧹 데이터베이스 초기화 중...");

    try {
      // 관계 순서대로 삭제 (자식 -> 부모)
      await this.departmentSeeder.clear();
      await this.organizationSeeder.clear();
      await this.userSeeder.clear();

      console.log("✅ 모든 데이터 삭제 완료!");
    } catch (error) {
      console.error("❌ 데이터 삭제 중 오류 발생:", error);
      throw error;
    }
  }

  async refresh(): Promise<void> {
    console.log("🔄 데이터베이스 새로고침 중...");
    await this.clear();
    await this.seed();
  }
}
