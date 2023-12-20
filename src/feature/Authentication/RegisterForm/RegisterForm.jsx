import {useForm} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {ServerCommunicator} from "../../../services/ServerCommunicator";
import {useContext, useState} from "react";
import {OverlayContext} from "../../../shared/context/overlay/OverlayContext";

const schema = yup.object({
    login: yup.string()
        .required('Login jest wymagany'),
    password: yup.string()
        .required('Hasło jest wymagane')
        .matches(/[0-9]/, 'Hasło musi zawierać cyfrę')
        .matches(/[a-z]/, 'Hasło musi zawierać małą literę')
        .matches(/[A-Z]/, 'Hasło musi zawierać dużą literę')
        .matches(/\W/, 'Hasło musi zawierać znak specjalny'),
    password2: yup.string()
        .required('Pole wymagane')
        .oneOf([yup.ref('password'), null], 'Hasła muszą być takie same'),
    email: yup.string()
        .email('Niepoprawny format email')
        .required('Email jest wymagany'),
})

const RegisterForm = () => {
    const { setType, clearOverlay } = useContext(OverlayContext);
    const [email, setEmail] = useState(null);
    const [showEmailMessage, setShowEmailMessage] = useState(false);
    const [formDisabled, setFormDisabled] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,

    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        setType('loading');
        setFormDisabled(true);
        ServerCommunicator.handleRequest('post', '/register', data).then(res => {
            if(res.success) {
                setEmail(data.email);
                setShowEmailMessage(true)
            } else {
                setError('password2', {message: res.message});
                setFormDisabled(false);
            }
            clearOverlay();
        });
    }

    return (
        showEmailMessage ?
            <div>
                <p>
                    Wysłano email na adres: <span className='email-message'>{email}</span>. Aby zakończyć rejestrację konta,
                    musisz skorzystać z linku, który Tobie wysłaliśmy. Dopiero potem będziesz mógł zacząć korzystać ze swojego konta.
                </p>
                <p>
                    Kliknij <span className='re-send animated-hover' onClick={handleSubmit(onSubmit)}>tutaj</span> aby wysłać maila jeszcze raz.
                </p>
            </div> :
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='login'>Login</label>
                <input type='text' {...register('login')} disabled={formDisabled}/>
                <p className='error'>{errors.login?.message}</p>

                <label htmlFor='email'>Email</label>
                <input type='text' {...register('email')} disabled={formDisabled}/>
                <p className='error'>{errors.email?.message}</p>

                <label htmlFor='password'>Hasło</label>
                <input type='password' {...register('password')} disabled={formDisabled}/>
                <p className='error'>{errors.password?.message}</p>

                <label htmlFor='password2'>Powtórz hasło</label>
                <input type='password' {...register('password2')} disabled={formDisabled}/>
                <p className='error'>{errors.password2?.message}</p>

                <div className='account_type'>
                    <input type='checkbox' {...register('wantToBeOperator')} disabled={formDisabled}/>
                    <span>Chcesz świadczyć usługi operatora na naszej stronie?</span>
                </div>

                <input type='submit' value='Zarejestruj się' disabled={formDisabled}/>
            </form>
    )
}

export default RegisterForm;