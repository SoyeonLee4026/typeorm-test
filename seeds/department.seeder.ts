import { Repository } from "typeorm";
import { Department } from "../src/entity/department.entity";
import { Organization } from "../src/entity/organization.entity";
import { QaDataSource } from "./data-source";

export class DepartmentSeeder {
  private departmentRepository: Repository<Department>;

  constructor() {
    this.departmentRepository = QaDataSource.getRepository(Department);
  }

  async run(organizations: Organization[]): Promise<Department[]> {
    console.log("🏛️ 부서 시드 데이터 생성 중...");

    const deptData = [
      // A기관 부서들
      { name: "A-1부서", organizationId: organizations[0].id },
      { name: "A-2부서", organizationId: organizations[0].id },
      { name: "A-3부서", organizationId: organizations[0].id },
      // B기관 부서들
      { name: "B-1부서", organizationId: organizations[1].id },
      { name: "B-2부서", organizationId: organizations[1].id },
      { name: "B-3부서", organizationId: organizations[1].id },
    ];

    const departments: Department[] = [];

    for (const data of deptData) {
      const department = new Department();
      department.name = data.name;
      department.organizationId = data.organizationId;

      const savedDept = await this.departmentRepository.save(department);
      departments.push(savedDept);

      console.log(`  ✅ ${data.name} 생성 완료 (소속: ${data.organizationId})`);
    }

    console.log(`🏛️ 총 ${departments.length}개 부서 생성 완료!`);
    return departments;
  }

  async clear(): Promise<void> {
    const departments = await this.departmentRepository.find();
    if (departments.length > 0) {
      await this.departmentRepository.remove(departments);
      console.log(`🧹 부서 ${departments.length}개 삭제 완료`);
    }
  }
}
