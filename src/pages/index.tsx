import {
  Button,
  Input,
  Row,
  Spacer,
  Text,
  useTheme,
  useToasts,
} from "@geist-ui/react";
import { ArrowRightCircle, Box } from "@geist-ui/react-icons";
import api from "@services/api";
import "inter-ui/inter.css";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiLockClosed, HiOutlineMail } from "react-icons/hi";

const Entrar = () => {
  const { palette } = useTheme();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [senha, setSenha] = useState("");
  const [, setToast] = useToasts();
  const router = useRouter();

  async function handleLogin() {
    setLoading(true);

    if (!senha || !email) {
      setLoading(false);
      setToast({ text: "Informe usuário e/ou senha.", type: "warning" });
      return;
    }

    const res = await signIn("credentials", {
      email,
      senha,
      redirect: false,
    });

    if (res?.error) {
      setLoading(false);
      setToast({  text: "E-mail ou usuário inválidos, por favor tente novamente.", 
                  type: "warning" });
      return;
    }

    setEmail("");
    setSenha("");
    router.push("/dashboard");
  }

  return (
    <>
      <Head>
        <title>Orion | Entrar </title>
      </Head>
      <Row
        align="middle"
        justify="space-between"
        style={{ backgroundColor: palette.foreground, padding: 10 }}
      >
        <Link href="/">
          <Box size={50} color="#fff" />
        </Link>
      </Row>
      <Row justify="center" style={{ marginTop: 50, padding: 10 }}>
        <div>
          <Text h1 style={{ textAlign: "center" }}>
            Entrar
          </Text>
          <Input
            type="email"
            icon={<HiOutlineMail />}
            placeholder="e-mail"
            width="100%"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onSubmit={handleLogin}
          />
          <Spacer y={0.5} />
          <Input.Password
            icon={<HiLockClosed />}
            placeholder="senha"
            width="100%"
            style={{
              margin: 0,
            }}
            value={senha}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleLogin();
            }}
            onSubmit={handleLogin}
            onChange={(e) => setSenha(e.target.value)}
          />
          <Spacer y={0.5} />
          <Button
            loading={loading}
            onClick={handleLogin}
            type="secondary-light"
            iconRight={<ArrowRightCircle size={100} />}
            style={{ width: "100%" }}
          >
            Entrar
          </Button>
          <Text onClick={() => router.push('/esqueci-senha') } p style={{ textAlign: "center", cursor: "pointer" }} size={12}>
            Esqueceu a senha?
          </Text>
        </div>
      </Row>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: `${process.env.APP_WEB_URL}/dashboard`,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Entrar;
