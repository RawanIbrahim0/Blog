import { Link, useLocation, useNavigate } from "react-router";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const active = (path) =>
    location.pathname === path
      ? "text-amber-100 font-bold bg-black"
      : "text-black hover:bg-blue-100";

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const userId = localStorage.getItem("userId");

  if (!userId) return null;

  return (
    <nav className="fixed z-100 w-[59%] flex justify-between items-center p-4 bg-amber-100 shadow rounded-2xl mb-6">

      {/* روابط الصفحات */}
      <div className="flex gap-4">
        <Link
          to="/"
          className={`px-4 py-2 rounded-lg transition ${active("/")}`}
        >
          All Users
        </Link>

        <Link
          to="/post"
          className={`px-4 py-2 rounded-lg transition ${active("/post")}`}
        >
          All Posts
        </Link>

        <Link
          to="/createpost"
          className={`px-4 py-2 rounded-lg transition ${active("/createpost")}`}
        >
          Create Posts
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </nav>
  );
}
