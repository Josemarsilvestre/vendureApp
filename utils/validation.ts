import * as Yup from 'yup'

export const logInSchema = Yup.object().shape({
  username: Yup.string().required('Account email required').email('Please enter a valid email address'),
  password: Yup.string().required('Please enter the login password\n').min(4, 'The password must be at least 4 characters long'),
})

export const registerSchema = Yup.object().shape({
  emailAddress: Yup.string().required('Account email required').email('Please enter a valid email address'),
  firstName: Yup.string().required('First name required').min(3, 'At least three characters'),
  lastName: Yup.string().required('Last name required').min(3, 'At least three characters'),
  password: Yup.string().required('Login password required').min(4, 'The password must be at least 4 characters long'),
  confirmPassword: Yup.string()
    .required('Password confirmation required\n')
    .oneOf([Yup.ref('password')], 'Password confirmation is incorrect'),
})

/**export const categorySchema = Yup.object().shape({
  name: Yup.string().required('O nome da categoria não pode estar vazio'),
  slug: Yup.string().required('O nome do caminho não pode estar vazio'),
  image: Yup.string()
    .required('Digite o endereço da imagem')
    .url('Endereço de imagem inválido')
    .matches(/\.(gif|jpe?g|png|webp)$/i, 'O endereço da imagem deve ser um URL de imagem válido'),
})

export const bannerSchema = Yup.object().shape({
  title: Yup.string().required('O nome não pode estar vazio'),
  image: Yup.object().shape({
    url: Yup.string()
      .required('Por favor, insira o endereço da imagem.')
      .url('Endereço inválido')
      .matches(/\.(gif|jpe?g|png|webp)$/i, 'O endereço da imagem deve ser um URL de imagem válido'),
  }),
})

export const sliderSchema = Yup.object().shape({
  title: Yup.string().required('O nome não pode estar vazio'),
  image: Yup.object().shape({
    url: Yup.string()
      .required('Por favor, insira o endereço da imagem.')
      .url('Endereço inválido')
      .matches(/\.(gif|jpe?g|png|webp)$/i, 'O endereço da imagem deve ser um URL de imagem válido'),
  }),
})

export const reviewSchema = Yup.object().shape({
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
})

export const nameSchema = Yup.object().shape({
  name: Yup.string().required('É necessário registrar o nome').min(3, 'O nome deve ter mais de 3 caracteres'),
})

export const mobileSchema = Yup.object().shape({
  mobile: Yup.string()
    .required('O número de telefone deve estar registado')
    .min(9, 'O número de celular deve ter 9 dígitos')
    .max(9, 'O número de celular deve ter 9 dígitos'),
}) */
