import Image from "next/image";
import styles from "./page.module.css";
import Head from "../components/Head";
import Header from "../components/Header";
import Footer from "../components/Footer"
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head title="Home" />
      <Header />
      <Contents />
      <Footer />
    </>
  );
}

const Contents = () => {
  return (
    <>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <Link href="/register">Need an account?</Link>
              </p>
              <ul className="error-messages">
                <li>That email is already taken</li>
              </ul>
              <form>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
