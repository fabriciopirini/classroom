import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";
import { ssrGetProducts, useMe } from "../../graphql/generated/page";

import { withApollo } from "../../lib/withApollo";

function Home({ data }) {
  const { user, error: fetchUserError, isLoading } = useUser();
  const { data: me } = useMe();

  if (isLoading) return <div>Loading...</div>;
  if (fetchUserError) return <div>{fetchUserError.message}</div>;

  return (
    <div>
      {user ? (
        <div>
          <h2>Hello {user.name}!</h2>
          <Image src={user.picture} alt={user.name} width={200} height={200} />
          <p>{user.email}</p>

          <Link href="/api/auth/logout">Logout</Link>
        </div>
      ) : (
        <Link href="/api/auth/login">Login</Link>
      )}

      <pre>{JSON.stringify(me, null, 2)}</pre>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    return {
      props: {},
    };
  },
});

export default withApollo(ssrGetProducts.withPage()(Home));
