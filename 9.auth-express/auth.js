const bcrypt = require("bcrypt");

const hashPassword = async (pw) => {
  const hash = await bcrypt.hash(pw, 12); //async hash, 10 is salt, semakin tinggi nilai semakin lama
  return hash
};

//sync
const hashing = (pw) => {
  const hash = bcrypt.hashSync(pw, 10); 
  return hash;
//   console.log(hash);
};

const check = async (pw, hashedpw) => {
  const result = await bcrypt.compare(pw, hashedpw);
  if (result) {
    console.log("Password is Correct");
  } else {
    console.log("Password is incorrect");
  }
};

module.exports = { hashPassword, check};

// hashPassword("ayam");
// login("ayam", '$2b$12$Z/oa5DoJgChDYsMZ/aGea.ZBtiPsQDRPFEPVuqqJ8dWGhlC2a1BiK');
