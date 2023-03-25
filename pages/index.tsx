import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import useCurrentUser from "../hooks/useCurrentUser";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: user } = useCurrentUser();

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p className="text-white">loged in as: {user?.name}</p>
      <button className="text-white" onClick={() => signOut()}>
        Logout
      </button>
    </>
  );
}
