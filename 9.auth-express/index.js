const bcrypt = require("bcrypt");

const hashPassword = async (pw) => {
  const hash = await bcrypt.hash(pw, 12); //12 is salt
  console.log(hash);
};

const login = async (pw, hashedpw) => {
  const result = await bcrypt.compare(pw, hashedpw);
  if (result) {
    console.log("login successfully");
  } else {
    console.log("password is incorrect");
  }
};

hashPassword("ayam");
login("ayam", '$2b$12$Z/oa5DoJgChDYsMZ/aGea.ZBtiPsQDRPFEPVuqqJ8dWGhlC2a1BiK');
