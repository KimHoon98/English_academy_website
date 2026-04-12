'use client';

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch('/auth/logout', { method: 'POST' });
    window.location.href = '/';
  };

  return (
    <button
      onClick={handleLogout}
      className="text-red-400 hover:text-red-600 transition font-bold text-[15px] cursor-pointer"
    >
      로그아웃
    </button>
  );
}