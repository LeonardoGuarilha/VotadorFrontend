import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';

import * as Yup from 'yup';
import { useToast } from '../../hooks/toast';
import getValidationErros from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Content, AnimationContainer } from './styles';
import api from '../../services/api';
import Textarea from '../../components/TextArea';

interface SignInFormData {
  titulo: string;
  descricao: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          titulo: Yup.string()
            .required('Título obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        console.log(data);

        await api.post('v1/recurso', data);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Recurso criado com sucesso!',
          description:
            'Recurso criado com sucesso, o mesmo já pode ser votado =)',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErros(err);
          formRef.current?.setErrors(erros);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao criar o recurso',
          description:
            'Ocorreu um erro ao criar o recurso, por favor, tente novamente',
        });
      }
    },
    [addToast, history]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Criar recurso</h1>

            <Input name="titulo" placeholder="Título" />
            <Textarea name="descricao" placeholder="Descrição do recurso..." />

            <Button type="submit">Criar</Button>

          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
