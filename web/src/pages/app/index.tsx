import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

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
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
