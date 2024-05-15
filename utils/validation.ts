import * as Yup from 'yup'

export const logInSchema = Yup.object().shape({
  username: Yup.string().required('Account email required').email('Please enter a valid email address'),
  password: Yup.string().required('Please enter the login password\n').min(4, 'The password must be at least 4 characters long'),
})

export const registerSchema = Yup.object().shape({
  emailAddress: Yup.string().required('Email address required').email('Please enter a valid email address'),
  firstName: Yup.string().required('First name required').min(3, 'At least three characters'),
  lastName: Yup.string().required('Last name required').min(3, 'At least three characters'),
  password: Yup.string().required('Login password required').min(4, 'The password must be at least 4 characters long'),
  confirmPassword: Yup.string()
    .required('Password confirmation required\n')
    .oneOf([Yup.ref('password')], 'Password confirmation is incorrect'),
})

export const updateCustomerSchema = Yup.object().shape({
  firstName: Yup.string().required('First name required').min(3, 'At least three characters'),
  lastName: Yup.string().required('Last name required').min(3, 'At least three characters'),
  phoneNumber: Yup.string()
    .required('Phone number required')
    .min(9, 'The phone number must be 9 digits long')
    .max(9, 'The phone number must be 9 digits long'),
});

/**export const reviewSchema = Yup.object().shape({
  title: Yup.string().required('O título da avaliação não pode estar vazio').min(4, 'O título da avaliação deve ter no mínimo 4 caracteres'),
  comment: Yup.string().required('O texto da avaliação não pode estar vazio').min(4, 'O texto da avaliação não deve ter menos de 4 caracteres'),
})

export const addressSchema = Yup.object().shape({
  province: Yup.object().shape({
    name: Yup.string().required('Por favor, selecione a província onde você mora'),
  }),
  city: Yup.object().shape({
    name: Yup.string().required('Por favor, selecione a cidade onde você mora'),
  }),
  area: Yup.object().shape({
    name: Yup.string().required('Por favor, selecione o distrito onde você mora'),
  }),
  street: Yup.string().required('O nome da rua não pode estar vazio'),
  postalCode: Yup.string().required('Por favor, insira seu código postal'),
}) */
