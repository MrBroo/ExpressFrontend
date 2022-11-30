import { Link } from "react-router-dom";
import "./Home.css";
function Home() {
  return (
    <>
      <div className="home">
        <Link to="/register">
          <h1>Register</h1>
        </Link>
        <Link to="/login">
          <h1>Sign In</h1>
        </Link>
      </div>
    </>
  );
}
export default Home;
