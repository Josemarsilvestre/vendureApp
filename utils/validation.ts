import * as Yup from "yup";

export const logInSchema = Yup.object().shape({
  username: Yup.string()
    .required("Account email required")
    .email("Please enter a valid email address"),
  password: Yup.string()
    .required("Please enter the login password\n")
    .min(4, "The password must be at least 4 characters long"),
});

export const registerSchema = Yup.object().shape({
  emailAddress: Yup.string()
    .required("Email address required")
    .email("Please enter a valid email address"),
  firstName: Yup.string()
    .required("First name required")
    .min(3, "At least three characters"),
  lastName: Yup.string()
    .required("Last name required")
    .min(3, "At least three characters"),
  password: Yup.string()
    .required("Login password required")
    .min(4, "The password must be at least 4 characters long"),
  confirmPassword: Yup.string()
    .required("Password confirmation required\n")
    .oneOf([Yup.ref("password")], "Password confirmation is incorrect"),
});

export const updateCustomerSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name required")
    .min(3, "At least three characters"),
  lastName: Yup.string()
    .required("Last name required")
    .min(3, "At least three characters"),
  phoneNumber: Yup.string(),
});

export const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Password required"),
  newPassword: Yup.string()
    .required("Please enter the new password\n")
    .min(4, "The password must be at least 4 characters long"),
  confirmPassword: Yup.string()
    .required("Password confirmation required\n")
    .oneOf([Yup.ref("newPassword")], "Password confirmation is incorrect"),
});

export const addressSchema = Yup.object().shape({
  id: Yup.string(),
  fullName: Yup.string().required("First name required"),
  company: Yup.string(),
  streetLine1: Yup.string().required("Please enter the street where you live"),
  city: Yup.string().required("Please select the city where you live"),
  province: Yup.string().required("Please select the area where you live"),
  postalCode: Yup.string()
    .required("Please enter your zip code")
    .min(8, "The zip code is wrong")
    .max(8, "The zip code is wrong"),
  countryCode: Yup.string().required("Please enter your country code"),
  phoneNumber: Yup.string().required("Phone number required"),
});

/**export const reviewSchema = Yup.object().shape({
  title: Yup.string().required('O título da avaliação não pode estar vazio').min(4, 'O título da avaliação deve ter no mínimo 4 caracteres'),
  comment: Yup.string().required('O texto da avaliação não pode estar vazio').min(4, 'O texto da avaliação não deve ter menos de 4 caracteres'),
})*/
