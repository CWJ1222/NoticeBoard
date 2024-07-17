import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const PaymentModal = ({ onClose }) => {
  const handlePayment = (amount) => {
    alert(`${amount}원 selected`);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg w-80 relative z-10">
        <h2 className="text-xl font-bold mb-4">Select Amount</h2>
        <div className="flex flex-col space-y-4">
          <button className="bg-gray-800 text-white py-2 rounded" onClick={() => handlePayment(3000)}>3,000원</button>
          <button className="bg-gray-800 text-white py-2 rounded" onClick={() => handlePayment(5000)}>5,000원</button>
          <button className="bg-gray-800 text-white py-2 rounded" onClick={() => handlePayment(10000)}>10,000원</button>
        </div>
        <button className="mt-4 bg-red-500 text-white py-2 rounded w-full" onClick={onClose}>Close</button>
      </div>
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
    </div>
  );
};

const Header = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [showInfo, setShowInfo] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

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
          <a 
            className='mr-4' 
            style={{ color: 'orange' }} 
            onClick={() => setShowPaymentModal(true)} 
            role="button"
          >
            Payment
          </a>
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
                    <strong>Joined:</strong>{''}
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
      {showPaymentModal && <PaymentModal onClose={() => setShowPaymentModal(false)} />}
    </header>
  );
};
export default Header;
