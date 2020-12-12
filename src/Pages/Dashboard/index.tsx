import React, { useState, useEffect } from 'react';
import 'react-day-picker/lib/style.css'; // vem padrão com o day-picker

import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Section,
  Appointment,
} from './styles';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface Recursos {
  id: string;
  titulo: string;
  quantidadeVotos: number;
}

const Dashboard: React.FC = () => {
  const[recurso, setRecursos] = useState<Recursos[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    api.get('v1/recursos/contador').then((response) => {
        setRecursos(response.data);
    });
  }, []);


  return (
    <Container>
      <Header>
        <HeaderContent>
          <Profile>
            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                {user.nome}
              </Link>
            </div>
          </Profile>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <Link to="criarrecurso">Criar recurso</Link>
          <Section>
            {recurso.map(recurso => (
              <Appointment key={recurso.titulo}>
                <h1>{recurso.titulo}</h1>
                <Link to={`/votar/${recurso.id}`}>Votar</Link>
                
              </Appointment>
            ))}
          </Section>
        </Schedule>
      </Content>
    </Container>
  );
};

export default Dashboard;
