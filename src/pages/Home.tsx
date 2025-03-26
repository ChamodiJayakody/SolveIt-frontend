import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const currentUser = useSelector((state: any) => state.user.currentUser);
  
  return (
    <div className="flex flex-col mt-24 h-full text-center text-white">
      <h1 className="text-5xl font-extrabold leading-tight sm:text-6xl">
            Track, Manage, and Solve Issues with{" "}
            <span className="text-yellow-400">SolveIt</span>
          </h1>
      <p className="text-xl m-8">A modern issue tracking system designed for seamless collaboration,
      efficiency, and rapid resolution.</p>
      <div className="space-x-4">
        {!currentUser && (
          <>
            <Link
              to="/sign-in"
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg text-lg"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg text-lg"
            >
              Sign Up
            </Link>
          </>
        )}
        {currentUser && (
          <Link
            to="/create-ticket"
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg text-lg"
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;