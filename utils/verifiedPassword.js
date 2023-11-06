import bcrypt from "bcrypt";

export const verifiedPass = (password, hashPassword) => {
  const comparePass = bcrypt.compareSync(password, hashPassword);
  return comparePass;
};
