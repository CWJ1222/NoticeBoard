import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link href="/" legacyBehavior>
            <a className="hover:text-gray-300">MyApp</a>
          </Link>
        </div>
        <nav className="flex space-x-4">
          <Link href="/signin" legacyBehavior>
            <a className="hover:text-gray-300">Sign In</a>
          </Link>
          <Link href="/signup" legacyBehavior>
            <a className="hover:text-gray-300">Sign Up</a>
          </Link>
          <Link href="/board" legacyBehavior>
            <a className="hover:text-gray-300">Board</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;