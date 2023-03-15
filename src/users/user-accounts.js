const bcrypt = require("bcrypt");
const { getUniqueId } = require("../utils");

class UserAccounts {
  data = [
    {
      id: getUniqueId(),
      username: "xvadim",
      passwordHash:
        "$2a$10$6TdhLfMMM/hbyPQ9r4E.Bu/eIdmx1HKB8YEeI63AaS7CBKmArqBLm",
      avatar:
        "https://sun9-west.userapi.com/sun9-62/s/v1/ig2/JeGBPLAHWop4z0qCasQX_ECpaNJE6qb_W6hQWKyvraOYIhliQKdKbFxRDscG-Mo-WGWSLesx5ljkqaMil-ER5vwJ.jpg?size=494x497&quality=95&type=album",
      name: "Вадим",
      surname: "Мокрушин",
      registrationDate: new Date(),
      viewsHistory: ["Т-34-85", "Pz.Kpfw.-V-Ausf.G-Panther", "ИС-2"],
    },
    {
      id: "0001",
      username: "Zhukov",
      passwordHash:
        "$4a$10$6TdhLfMMM/hbyPQ9r4E.Bu/eIdmx1HKB8Y2eI63AaS7CBKmArqBLm",
      avatar: "https://stihi.ru/pics/2020/05/09/2330.jpg",
      registrationDate: new Date(),
    },
    {
      id: "0002",
      username: "Konev",
      passwordHash:
        "$da$10$6TdhLfMMM/hbyPQ9r4E.Bu/eIdmx1HKd8YEeI63AaS7CBKmArqBLm",
      avatar:
        "https://cdnmundo1.img.sputniknews.com/img/109101/04/1091010461_0:14:2048:2399_2048x2385_80_0_0_0c037a3f49db07b313c1f4a0d267f93a.jpg",
      registrationDate: new Date(),
    },
    {
      id: "0003",
      username: "Heinz-Wilhelm-Guderian",
      passwordHash:
        "$Ua$10$6TdhLfMMM/hbyPQ9r4E.Bu/3Idmx1HKB8YEeI63AaS7CBKmArqBLm",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/1/17/German_General_Heinz_Guderian%2C_possibly_in_Russia%2C_c._1944._%2841575739691%29.jpg",
      registrationDate: new Date(),
    },
  ];

  constructor() {
    this.data.forEach((account) => {
      if (!account.viewsHistory) account.viewsHistory = [];
    });
  }

  getById(id) {
    return this.data.find((user) => user.id === id);
  }

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

  updateUserInfo(id, name, surname, avatar) {
    const user = this.data.find((user) => user.id === id);

    if (user) {
      user.name = name;
      user.surname = surname;
      user.avatar = avatar;

      return true;
    } else {
      return false;
    }
  }

  doesUserExist(username) {
    return !!this.data.find((user) => user.username === username);
  }

  setViewHistory(userId, viewsHistory) {
    const user = this.data.find((user) => user.id === userId);

    if (user) {
      user.viewsHistory = viewsHistory;
      console.log(user);
    }
  }
}

const userAccounts = new UserAccounts();
module.exports = { userAccounts };
