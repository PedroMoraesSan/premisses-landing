import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailProps {
  userFirstname: string;
}

export const NotionWaitlistEmail = ({ userFirstname }: EmailProps) => (
  <Html>
    <Head />
    <Preview>Obrigado por entrar na lista de espera, {userFirstname}! 🎉</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://premisses.com/premisses-logo.png`}
          width="220"
          height="100"
          alt="Premisses Logo"
          style={logo}
        />
        <Text style={greeting}>Olá {userFirstname},</Text>
        <Text style={paragraph}>
          Obrigado por entrar na lista de espera do Premisses! Estamos muito
          animados em ter você a bordo desta jornada para transformar a forma
          como requisitos de software são criados.
        </Text>
        <Text style={paragraph}>
          O Premisses é uma plataforma inteligente que utiliza Inteligência
          Artificial para facilitar a criação de requisitos, integrando times
          de desenvolvimento, engenheiros, analistas e stakeholders em um único
          ambiente colaborativo.
        </Text>
        <Text style={paragraph}>
          Vamos mantê-lo informado sobre o progresso e notificá-lo assim que
          estivermos prontos para você usar. Se tiver alguma dúvida ou feedback,
          não hesite em responder este email — estamos aqui para ouvir!
        </Text>
        <Text style={signOff}>
          Atenciosamente,
          <br />
          Equipe Premisses
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          Você recebeu este email porque se inscreveu na lista de espera do
          Premisses. Se acredita que isso foi um engano, sinta-se à vontade
          para ignorar este email.
        </Text>
      </Container>
    </Body>
  </Html>
);

NotionWaitlistEmail.PreviewProps = {
  userFirstname: "Tyler",
} as EmailProps;

export default NotionWaitlistEmail;

const main = {
  background: "linear-gradient(-225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)",
  fontFamily: 'figtree, "Helvetica Neue", Helvetica, Arial, sans-serif',
  padding: "40px 0",
  color: "#cccccc",
};

const container = {
  margin: "0 auto",
  padding: "24px 32px 48px",
  backgroundColor: "#1a1a1a",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
};

const logo = {
  margin: "0 auto",
  paddingBottom: "20px",
};

const greeting = {
  fontSize: "18px",
  lineHeight: "28px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  marginBottom: "20px",
};

const link = {
  color: "#F7FF9B",
  textDecoration: "underline",
};

const signOff = {
  fontSize: "16px",
  lineHeight: "26px",
  marginTop: "20px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8c8c8c",
  fontSize: "12px",
};
