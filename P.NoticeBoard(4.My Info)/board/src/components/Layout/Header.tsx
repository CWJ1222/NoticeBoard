import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [showInfo, setShowInfo] = useState(false);
  const handleSignOut = async () => {
    await signOut();
    alert('로그아웃 되었습니다.');
    router.push('/');
  };
  return (
    <header className='bg-gray-800 text-white p-4'>
      <nav className='flex justify-between container mx-auto'>
        <div>
          <Link href='/' legacyBehavior>
            <a className='text-xl font-bold mr-4'>NoticeBoard</a>
          </Link>
          <Link href='/board' legacyBehavior>
            <a className='mr-4' style={{ color: 'yellow' }}>Board</a>
          </Link>
        </div>
        <div className='flex items-center'>
          {user ? (
            <div className='relative'>
              <button
                onClick={() => setShowInfo((prev) => !prev)}
                className='bg-blue-500 text-white px-2 py-1 rounded'
              >
                My Info
              </button>
              {showInfo && (
                <div className='absolute right-0 mt-2 w-60 bg-white text-black rounded shadow-lg p-4'>
                  <p class="text-xs">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p class="text-xs">
                    <strong>Nickname:</strong> {user.nickname}
                  </p>
                  <p class="text-xs">
                    <strong>Coins:</strong> {user.coin}
                  </p>
                  <p class="text-xs">
                    <strong>Joined:</strong>{' '}
                    {new Date(user.created_at).toLocaleString()}
                  </p>
                  <button
                    onClick={handleSignOut}
                    className='bg-red-500 text-white px-2 py-1 rounded mt-2'
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href='/signin' legacyBehavior>
                <a className='mr-4'>Sign In</a>
              </Link>
              <Link href='/signup' legacyBehavior>
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
