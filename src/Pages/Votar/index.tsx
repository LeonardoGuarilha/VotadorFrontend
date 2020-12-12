import React, {
    useRef,
    useCallback,
    useState,
    ChangeEvent,
  } from 'react';
  
  import { Container, Header, HeaderContent, Profile, Main } from './styles';
  import { Link, useHistory, useRouteMatch } from 'react-router-dom';
  import { FiPower } from 'react-icons/fi';
  import { Form } from '@unform/web';
  import { FormHandles } from '@unform/core';
  import Button from '../../components/Button';
  import { useAuth } from '../../hooks/auth';
  import api from '../../services/api';
  import Textarea from '../../components/TextArea';
  import { useToast } from '../../hooks/toast';
  
  interface RecursoDataFormulatio {
    comentario: string;
  }

  interface EditParams {
    id: string;
  }
  
  const Votar: React.FC = () => {
    const { params } = useRouteMatch<EditParams>();
    const history = useHistory();
    const formRef = useRef<FormHandles>(null);
    const { user } = useAuth();
    const { addToast } = useToast();
    const [gostei, setGostei] = useState(false);
  
    
    function handleGostei(event: ChangeEvent<HTMLInputElement>) {
      setGostei(event.target.checked);
    }
  
    const handleSubmit = useCallback(
      async (data: RecursoDataFormulatio) => {
        const { comentario } = data;
        try {
          await api.post('v1/voto', {
            funcionarioId: user.id,
            recursoId: params.id,
            comentario,
            gostei
          });

          history.push('/dashboard');

          addToast({
            type: 'success',
            title: 'Voto registrado com sucesso',
            description:
              'Obrigado por votar =)',
          });        

        } catch (err) {

          addToast({
            type: 'error',
            title: 'Erro ao realizado voto',
            description:
              'Ocorreu um erro o registrar o voto, por favor, tente novamente',
          });  
        }
      },
      [addToast, gostei, history, params.id, user.id],
    );
  
    return (
      <Container>
        <Header>
          <HeaderContent>
            <Profile>
              <div>
                <span>Bem-vindo,</span>
                <Link to="/profile">
                  
                </Link>
              </div>
            </Profile>
          </HeaderContent>
        </Header>
  
        <Main>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <span>Comentário</span>
          <Textarea name="comentario" placeholder="Comentário..." />
          <input onChange={handleGostei} type="checkbox" name="curti" id="curti" />
          <label htmlFor="curti">Gostei</label>

          <Button type="submit">Comentar</Button>
        </Form>
        </Main>
      </Container>
    );
  };
  
  export default Votar;
  