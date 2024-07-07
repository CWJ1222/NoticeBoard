"use client";

import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "@/net/auth";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/sign-in"); // 로그아웃 후 로그인 페이지로 이동
    } catch (error) {
      console.error("로그아웃 중 에러 발생:", error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <header className='mb-9 border-b border-gray-400 p-3 flex justify-between items-center'>
      <div className='flex items-center space-x-4'>
        <div className='text-xl font-bold'>QuantumJump NoticeBoard</div>
        {user && (
          <button
            onClick={handleShowModal}
            className='bg-yellow-500 text-white font-bold text-sm px-3 py-1 rounded-full hover:bg-yellow-600 transition duration-300'
          >
            충전
          </button>
        )}
      </div>
      <div className='flex items-center'>
        {user ? (
          <button
            onClick={handleSignOut}
            className='bg-red-500 text-white font-bold text-xs px-3 py-1 rounded-full hover:bg-red-600 transition duration-300'
          >
            로그아웃
          </button>
        ) : (
          <div className='flex space-x-4'>
            <Link href='/sign-in'>
              <button className='bg-green-500 text-white font-bold text-sm px-3 py-1 rounded-full hover:bg-green-600 transition duration-300'>
                로그인
              </button>
            </Link>
            <Link href='/sign-up'>
              <button className='bg-blue-500 text-white font-bold text-sm px-3 py-1 rounded-full  hover:bg-blue-600 transition duration-300'>
                회원가입
              </button>
            </Link>
          </div>
        )}
      </div>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <div className="space-y-4">
            <button className="bg-gray-200 w-full p-2 rounded">1,000원</button>
            <button className="bg-gray-200 w-full p-2 rounded">5,000원</button>
            <button className="bg-gray-200 w-full p-2 rounded">10,000원</button>
            <button
              className="mt-4 bg-gray-300 w-full p-2 rounded"
              onClick={handleCloseModal}
            >
              닫기
            </button>
          </div>
        </Modal>
      )}
    </header>
  );
}

function Modal({ onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg relative">
        {children}
      </div>
    </div>
  );
}