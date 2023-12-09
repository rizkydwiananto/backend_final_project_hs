import bcrypt from "bcryptjs";

export const verifiedPass = (password, hashPassword) => {
  const comparePass = bcrypt.compareSync(password, hashPassword);
  return comparePass;
};
