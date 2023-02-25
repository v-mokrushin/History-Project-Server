const bcrypt = require("bcrypt");

function getUniqueId() {
  Date.now().toString(36) +
    Math.floor(
      Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
    ).toString(36);
}

class UserAccounts {
  data = [
    {
      id: getUniqueId(),
      username: "xvadim",
      passwordHash:
        "$2a$10$6TdhLfMMM/hbyPQ9r4E.Bu/eIdmx1HKB8YEeI63AaS7CBKmArqBLm",
      avatar:
        "https://sun9-west.userapi.com/sun9-15/s/v1/ig2/x1fWlb8M2-5AwmyD_RPV5BO2dCJ3CUTO-PxuFqqWtexhfoREodJ5Nm33S_G4hwthLyU5caadsISSbkuPYD0C4jaO.jpg?size=1620x2160&quality=95&type=album",
      name: "Вадим",
      surname: "Мокрушин",
      registrationDate: new Date(),
    },
  ];

  login(username, password) {
    const accountInformation = this.data.find(
      (user) => user.username === username
    );
    if (!accountInformation) {
      return undefined;
    } else if (bcrypt.compareSync(password, accountInformation.passwordHash)) {
      return { ...accountInformation, passwordHash: undefined };
    } else {
      return null;
    }
  }

  registrate(username, password) {
    const newAccount = {
      id: getUniqueId(),
      username,
      passwordHash: bcrypt.hashSync(password, 10),
      registrationDate: new Date(),
    };
    this.data.push(newAccount);
    return { ...newAccount, passwordHash: undefined };
  }

  doesUserExist(username) {
    return !!this.data.find((user) => user.username === username);
  }
}

const userAccounts = new UserAccounts();
module.exports = { userAccounts };
