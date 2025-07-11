import { Repository } from "typeorm";
import { QaDataSource } from "../seeds/data-source";
import { User } from "../src/entity/user.entity";

export class UserSeeder {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = QaDataSource.getRepository(User);
  }

  async run(): Promise<User[]> {
    console.log("👥 사용자 시드 데이터 생성 중...");

    const userData = [
      { name: "A관리자", email: "adminA@dyphi.com" },
      { name: "B관리자", email: "adminB@dyphi.com" },
      { name: "C관리자", email: "adminC@dyphi.com" },
    ];

    const users: User[] = [];

    for (const data of userData) {
      const user = new User();
      user.name = data.name;
      user.email = data.email;

      const savedUser = await this.userRepository.save(user);
      users.push(savedUser);

      console.log(`  ✅ ${data.name} (${data.email}) 생성 완료`);
    }

    console.log(`👥 총 ${users.length}명의 사용자 생성 완료!`);
    return users;
  }

  async clear(): Promise<void> {
    const users = await this.userRepository.find();
    if (users.length > 0) {
      await this.userRepository.remove(users);
      console.log(`🧹 사용자 ${users.length}명 삭제 완료`);
    }
  }
}
