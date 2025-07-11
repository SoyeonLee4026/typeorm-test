import { Repository } from "typeorm";
import { Organization } from "../../sarcocloud/src/entity/organization.entity";
import { QaDataSource } from "./data-source";

export class OrganizationSeeder {
  private organizationRepository: Repository<Organization>;

  constructor() {
    this.organizationRepository = QaDataSource.getRepository(Organization);
  }

  async run(): Promise<Organization[]> {
    console.log("🏢 기관 시드 데이터 생성 중...");

    const orgData = [
      { name: "A기관", status: "active" },
      { name: "B기관", status: "active" },
      { name: "C기관", status: "inactive" },
    ];

    const organizations: Organization[] = [];

    for (const data of orgData) {
      const organization = new Organization();
      organization.name = data.name;

      const savedOrg = await this.organizationRepository.save(organization);
      organizations.push(savedOrg);

      console.log(`  ✅ ${data.name} 생성 완료 (ID: ${savedOrg.id})`);
    }

    console.log(`🏢 총 ${organizations.length}개 기관 생성 완료!`);
    return organizations;
  }

  async clear(): Promise<void> {
    const organizations = await this.organizationRepository.find();
    if (organizations.length > 0) {
      await this.organizationRepository.remove(organizations);
      console.log(`🧹 기관 ${organizations.length}개 삭제 완료`);
    }
  }
}
