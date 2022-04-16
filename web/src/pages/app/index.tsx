import { gql, useQuery } from "@apollo/client";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";
import { useGetProductsQuery } from "../../graphql/generated/graphql";

import { withApollo } from "../../lib/withApollo";

function Home() {
  const { user, error: fetchUserError, isLoading } = useUser();
  const { data, loading, error: queryError } = useGetProductsQuery();

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

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    return {
      props: {},
    };
  },
});

export default withApollo(Home);
