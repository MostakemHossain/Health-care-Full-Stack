import { z } from "zod";
const createAdmin = z.object({
  password: z.string({
    required_error: "Passsword is required",
  }),
  admin: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.string({
      required_error: "email is required",
    }),
    contactNumber: z.string({
      required_error: "ContactNumber is required",
    }),
  }),
});

export const userValidation = {
  createAdmin,
};
