import * as Yup from 'yup'

export const logInSchema = Yup.object().shape({
  username: Yup.string().required('E-mail da conta obrigatório').email('Por favor, insira um e-mail válido'),
  password: Yup.string().required('Por favor, insira a senha de login\n').min(4, 'A senha deve ter no mínimo 4 caracteres'),
})

export const registerSchema = Yup.object().shape({
  emailAddress: Yup.string().required('E-mail da conta obrigatório').email('Por favor, insira um e-mail válido'),
  firstName: Yup.string().required('Primeiro nome obrigatório').min(3, 'No mínimo três caracteres'),
  lastName: Yup.string().required('Último nome obrigatório').min(3, 'No mínimo três caracteres'),
  password: Yup.string().required('Senha de login obrigatória').min(4, 'A senha deve ter no mínimo 4 caracteres'),
  confirmPassword: Yup.string()
    .required('Confirmação da senha obrigatória\n')
    .oneOf([Yup.ref('password')], 'A confirmação da senha está incorreta'),
})
//.oneOf([Yup.ref('password'), null], 'A confirmação da senha está incorreta'),

export const categorySchema = Yup.object().shape({
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
})
