import Head from "next/head";
import { useAuth } from "@/lib/auth";
import { Button, Heading, Code, Text } from "@chakra-ui/react";
import { Logo } from "@/styles/theme";
export const Home = () => {
  const auth = useAuth();
  return (
    <div>
      <Head>
        <title>Fast Feedback</title>
      </Head>
      <main>
        <Heading>Fast Feedback</Heading>
        <Logo color="black" w="100px" h="64px" />
        {!auth?.user && (
          <Button onClick={(e) => auth.signinWithGithub()}>Sign In</Button>
        )}
        {/* Optional chaining to safely access nested properties*/}
        <Text>
          Current User: <Code> {auth?.user?.email}</Code>
        </Text>
        {auth?.user && (
          <Button onClick={(e) => auth.signout()}>Sign Out</Button>
        )}
      </main>
    </div>
  );
};

export { Home as default };
