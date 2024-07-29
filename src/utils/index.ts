import { z } from "zod";
import { DateValue, parseDate } from "@internationalized/date";
import {
  toast,
  ToastContent,
  ToastOptions,
  Slide,
  Id,
  Bounce,
} from "react-toastify";

export const avatarLetters = (inputString: string | undefined) => {
  const words = inputString?.split(" "); // Split the string into words
  const firstLetters = words?.map((word) => word.charAt(0)); // Extract the first letter of each word
  return firstLetters?.join(""); // Join the first letters back together
};

export const checkImageURL = (url: string) => {
  if (!url) return false;
  else {
    const pattern = new RegExp(
      "^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$",
      "i"
    );
    return pattern.test(url);
  }
};

// const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)

export const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const checkPasswordStrength = (password: string) => {
  const passwordSpecialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

  // Define criteria for password strength
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChars = passwordSpecialChars.test(password);

  // Calculate the total score based on criteria
  let score = 0;
  if (password.length >= minLength) score++;
  if (hasUpperCase) score++;
  if (hasLowerCase) score++;
  if (hasNumbers) score++;
  if (hasSpecialChars) score++;

  // Determine the strength based on the score
  if (score === 5) {
    return "Strong";
    // } else if (score >= 3) {
    //   return 'Moderate';
  } else {
    return "Weak";
  }
};

export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function encryptId(id: string) {
  return btoa(id);
}

export function decryptId(id: string) {
  return atob(id);
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const phoneRegexNew = new RegExp(/(\+|00)(\s*\d{2,4}\s*){1,3}\d{4,20}$/);

const genderOptions = ["Male", "Female"] as const;

export const authFormSchema = (type: string) =>
  z.object({
    // sign up
    firstName:
      type === "sign-in"
        ? z.string().trim().optional()
        : z
            .string({ message: "First name is required." })
            .trim()
            .min(3, {
              message: "First name must be at least 3 characters long.",
            })
            .max(256, {
              message: "First name must be between 3 and 256 characters long.",
            }),
    lastName:
      type === "sign-in"
        ? z.string().trim().optional()
        : z
            .string({ message: "Last name is required." })
            .trim()
            .min(3, {
              message: "Last name must be at least 3 characters long.",
            })
            .max(256, {
              message: "Last name must be between 3 and 256 characters long",
            }),
    // dateOfBirth:
    //   type === "sign-in"
    //     ? z.string().optional()
    //     : z
    //         .string({ message: "Date of birth is required." })
    //         .date()
    //         .refine(
    //           (date) => {
    //             // Calculate age
    //             const today = new Date();
    //             const birthDate = new Date(date);
    //             let age = today.getFullYear() - birthDate.getFullYear();
    //             const m = today.getMonth() - birthDate.getMonth();
    //             if (
    //               m < 0 ||
    //               (m === 0 && today.getDate() < birthDate.getDate())
    //             ) {
    //               age--;
    //             }
    //             // Check if age is at least 18
    //             return age >= 18;
    //           },
    //           {
    //             message: "You must be at least 18 years old.",
    //           }
    //         ),
    // dateOfBirth:
    //   type === "sign-in"
    //     ? z.optional(
    //         z.custom<DateValue | null | undefined>(
    //           (val) => val === null || val === undefined || val instanceof Date
    //         )
    //       )
    //     : z.custom<DateValue | null>(
    //         (val) => val === null || val instanceof Date,
    //         {
    //           message: "Date of birth is required.",
    //         }
    //       ),
    // dateOfBirth: z.optional(
    //   z.custom<DateValue | null | undefined>(
    //     (val) => val === null || val === undefined || val instanceof Date
    //   )
    // ),
    // .refine(
    //   (date) => {
    //     // Calculate age
    //     const today = new Date();
    //     const birthDate = new Date(date);
    //     let age = today.getFullYear() - birthDate.getFullYear();
    //     const m = today.getMonth() - birthDate.getMonth();
    //     if (
    //       m < 0 ||
    //       (m === 0 && today.getDate() < birthDate.getDate())
    //     ) {
    //       age--;
    //     }
    //     // Check if age is at least 18
    //     return age >= 18;
    //   },
    //   { message: "You must be at least 18 years old." }
    // ),
    // confirmPassword:
    //   type === "sign-in"
    //     ? z.string().optional()
    //     : z.string({ message: "Confirm password is required." }),
    gender: type === "sign-in"
      ? z.optional(z.enum(genderOptions))
      : z.enum(genderOptions, { message: "Gender is required." }),
    terms: z.boolean().optional(),
    rememberSession: z.boolean().optional(),
    // both
    email:
      type === "sign-in" || type === "sign-up"
        ? z
            .string({ message: "Email is required." })
            .email({ message: "Enter a valid email address." })
        : z.string().optional(),
    password:
      type === "sign-in" || type === "sign-up"
        ? z
            .string({ message: "Password is required." })
            .min(8, { message: "Password must be at least 8 characters." })
            .regex(passwordValidation, {
              message:
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
            })
            .trim()
        : z.string().optional(),
  });
// .refine(
//   (values) => {
//     if (type === "sign-up") {
//       return values.password === values.confirmPassword;
//     }
//     return true;
//   },
//   {
//     message: "Passwords must match!",
//     path: ["confirmPassword"],
//   }
// );

export const defaultToastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

type ToastType = "success" | "error" | "info" | "warning" | "default";

/**
 * Display toast
 *
 * @param {ToastType} type
 * @param {ToastContent} content
 * @param {ToastOptions} [options=defaultToastOption]
 * @return {Id}
 */
export const showToast = (
  type: ToastType,
  content: ToastContent,
  options: Partial<ToastOptions> = {}
): Id => {
  const optionsToApply = { ...defaultToastOptions, ...options };

  switch (type) {
    case "success":
      return toast.success(content, optionsToApply);
    case "error":
      return toast.error(content, optionsToApply);
    case "info":
      return toast.info(content, optionsToApply);
    case "warning":
      return toast.warn(content, optionsToApply);
    case "default":
      return toast(content, optionsToApply);
    default:
      return toast(content, optionsToApply);
  }
};
