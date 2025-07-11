import { Repository } from "typeorm";
import typeormFaker from "typeorm-faker";
import { QaDataSource } from "../scripts/data-source";
import { User } from "../src/entity/user.entity";

export class UserSeeder {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = QaDataSource.getRepository(User);
  }

  async run(): Promise<User[]> {
    console.log("👥 사용자 시드 데이터 생성 중...");

    // User 데이터 생성
    const adminUsers: User[] = await Promise.all([
      typeormFaker.stubOne(User, {
        id: undefined,
        name: "A관리자",
        email: "adminA@dyphi.com",
      }),
      typeormFaker.stubOne(User, {
        id: undefined,
        name: "B관리자",
        email: "adminB@dyphi.com",
      }),
      typeormFaker.stubOne(User, {
        id: undefined,
        name: "C관리자",
        email: "adminC@dyphi.com",
      }),
    ]);

    console.log(`✅ 관리자 ${adminUsers.length}명 생성 완료!`);
    adminUsers.forEach((user) => {
      console.log(`  ✅ ${user.name} (${user.email}) 생성 완료`);
    });

    // 데이터베이스에 저장
    const savedUsers = await this.userRepository.save(adminUsers);

    console.log(`👥 총 ${savedUsers.length}명의 사용자 생성 완료! (관리자 ${adminUsers.length}명 `);
    return savedUsers;
  }

  async clear(): Promise<void> {
    const users = await this.userRepository.find();
    if (users.length > 0) {
      await this.userRepository.remove(users);
      console.log(`🧹 사용자 ${users.length}명 삭제 완료`);
    }
  }
}
