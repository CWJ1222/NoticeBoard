import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between container mx-auto">
        <div className="flex items-center">
          <Link href="/" legacyBehavior>
            <a className="text-xl font-bold mr-4">My Project</a>
          </Link>
          <Link href="/board" legacyBehavior>
            <a className="mr-4">Board</a>
          </Link>
        </div>
        <div>
          {user ? (
            <div className="flex items-center">
              <span className="mr-4">Email: {user.email}</span>
              <span className="mr-4">Coins: {user.coin}</span>
              <span className="mr-4">Joined: {new Date(user.created_at).toLocaleDateString()}</span>
              <button onClick={handleSignOut} className="bg-red-500 text-white p-2">Sign Out</button>
            </div>
          ) : (
            <>
              <Link href="/signin" legacyBehavior>
                <a className="mr-4">Sign In</a>
              </Link>
              <Link href="/signup" legacyBehavior>
                <a>Sign Up</a>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;