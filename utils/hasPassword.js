import bcrypt from "bcryptjs";

export const hash = (password) => {
  const passBcrypt = bcrypt.hashSync(password, 10);
  return passBcrypt;
};
