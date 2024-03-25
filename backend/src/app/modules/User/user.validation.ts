import { Gender, UserStatus } from "@prisma/client";
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

const createDoctor = z.object({
  password: z.string({
    required_error: "Passsword is required",
  }),
  doctor: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.string({
      required_error: "email is required",
    }),
    contactNumber: z.string({
      required_error: "ContactNumber is required",
    }),
    address: z.string().optional(),
    registrationNumber: z.string({
      required_error: "Registration number is required",
    }),
    experience: z.number().optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE]),
    appointmentFee: z.number({
      required_error: "Appointment Fee is required",
    }),
    qualification: z.string({
      required_error: "Qualification is required",
    }),
    currentWorkingPlace: z.string({
      required_error: "Current Working Place is required",
    }),
    designation: z.string({
      required_error: "Designation is required",
    }),
  }),
});

const createPatient = z.object({
  password: z.string({
    required_error: "Passsword is required",
  }),
  patient: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.string({
      required_error: "email is required",
    }),
    contactNumber: z.string({
      required_error: "ContactNumber is required",
    }),
    address: z.string({
      required_error: "Address is required",
    }),
  }),
});
const updateStatus = z.object({
  body: z.object({
    status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED]),
  }),
});

export const userValidation = {
  createAdmin,
  createDoctor,
  createPatient,
  UserStatus,
};
