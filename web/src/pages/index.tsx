import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      {user ? (
        <div>
          <h2>Hello {user.name}!</h2>

          <img src={user.picture} alt={user.name} width="200" height="200" />
          <p>{user.email}</p>

          <a href="/api/auth/logout">Logout</a>
        </div>
      ) : (
        <a href="/api/auth/login">Login</a>
      )}
    </div>
  );
}
