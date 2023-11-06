import * as yup from 'yup';

const ValidatorLogin = yup.object().shape({
    usuario: yup
    .string()
    .matches(/^\d{17}$/, 'Deve conter exatamente 17 dígitos numéricos')
    .required('Este campo é obrigatório'),
})

export default ValidatorLogin