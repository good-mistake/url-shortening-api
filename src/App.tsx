import React, { useState, useEffect } from "react";
import { ReactComponent as CenterPic } from "./images/illustration-working.svg";
import { ReactComponent as Facebook } from "./images/icon-facebook.svg";
import { ReactComponent as Instagram } from "./images/icon-instagram.svg";
import { ReactComponent as Pinterest } from "./images/icon-pinterest.svg";
import { ReactComponent as Twitter } from "./images/icon-twitter.svg";
import { ReactComponent as Custom } from "./images/icon-fully-customizable.svg";
import { ReactComponent as Detail } from "./images/icon-detailed-records.svg";
import { ReactComponent as Brand } from "./images/icon-brand-recognition.svg";
import { ReactComponent as Logo } from "./images/logo.svg";
interface UrlItem {
  originalUrl: string;
  shortUrl: string;
}
function App() {
  const [url, setUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [urlList, setUrlList] = useState<UrlItem[]>([]);
  const [copy, setCopy] = useState<Record<number, string>>({});
  const [inputError, setInputError] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [hamburger, setHamburger] = useState<boolean>(false);
  const handleNavbar = () => {
    setHamburger(!hamburger);
  };
  const shortenUrl = async () => {
    if (url.trim() === "") {
      setInputError(true);
      return;
    }
    setInputError(false);
    try {
      const response = await fetch("./api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      const newShortenedUrl: string = data.result_url;
      setShortenedUrl(newShortenedUrl);
      setUrlList((prevList) => [
        ...prevList,
        { originalUrl: url, shortUrl: newShortenedUrl },
      ]);
      setCopy("");
    } catch (error) {
      setError(true);
      console.log(error.message);
    }
  };
  const modifyDisplayUrl = (shortUrl: string | null): string => {
    if (!shortUrl) return "Loading...";
    const base = shortUrl.split("/").pop();
    return `https://rel.ink/${base}`;
  };
  const copyToClipboard = (url: string, index: number) => {
    navigator.clipboard.writeText(url).then(
      () => {
        setCopy({ [index]: "Copied!" });
      },
      (err) => {
        setCopy({ [index]: "Failed to copy!" });
      }
    );
  };
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const cut = (url: string): string => {
    return url.length > 28 ? `${url.slice(0, 28)}...` : url;
  };
  return (
    <div className="App">
      <div className="container">
        <header>
          {windowWidth > 768 ? (
            <>
              <nav>
                <h2>
                  <Logo />
                </h2>
                <ul>
                  <li>Features</li>
                  <li>Pricing</li>
                  <li>Resources</li>
                </ul>
              </nav>
              <div>
                <button className="login">Login</button>
                <button className="signUp">Sign Up</button>
              </div>
            </>
          ) : (
            <>
              <nav className="mobileNav">
                <h2>
                  <Logo />
                </h2>
                <div onClick={handleNavbar}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="40"
                    height="40"
                    viewBox="0,0,256,256"
                  >
                    <g
                      fill="#a2a2a4"
                      fillRule="nonzero"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                      strokeDasharray=""
                      strokeDashoffset="0"
                      fontFamily="none"
                      fontWeight="none"
                      fontSize="none"
                      textAnchor="none"
                    >
                      <g transform="scale(5.12,5.12)">
                        <path d="M5,8c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h40c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175zM5,23c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h40c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175zM5,38c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h40c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175z"></path>
                      </g>
                    </g>
                  </svg>
                </div>
                {hamburger ? (
                  <>
                    <ul>
                      <li>Features</li>
                      <li>Pricing</li>
                      <li>Resources</li>
                      <li>
                        <button className="login">Login</button>
                      </li>
                      <li>
                        <button className="signUp">Sign Up</button>
                      </li>
                    </ul>
                  </>
                ) : (
                  ""
                )}
              </nav>
            </>
          )}
        </header>
        <main>
          <section className="description">
            <div>
              <h1>More than just shorter links</h1>
              <p>
                Build your brand’s recognition and get detailed insights on how
                your links are performing.
              </p>
              <button>Get Started</button>
            </div>
            <div>
              <CenterPic />
            </div>
          </section>
          <section className="inputSsection">
            <div
              className={`userInput ${error === true ? "linkErr" : ""} ${
                inputError === true ? "inputErr" : ""
              }`}
            >
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Shorten a link here..."
                className={`${error === true ? "linkErr" : ""} ${
                  inputError === true ? "inputErr" : ""
                }`}
              />
              <button onClick={shortenUrl}>Shorten It!</button>
            </div>

            {error && <p>Error: {error}</p>}
            {shortenedUrl && (
              <div>
                <ul>
                  {urlList?.map((item, index) => (
                    <li key={index}>
                      {windowWidth > 768 ? (
                        <p>{item.originalUrl}</p>
                      ) : (
                        <p>{cut(item.originalUrl)}</p>
                      )}
                      <div>
                        <a
                          href={item.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {modifyDisplayUrl(item.shortUrl)}
                        </a>
                        <button
                          onClick={() => copyToClipboard(item.shortUrl, index)}
                          className={`${copy[index] ? "copied" : ""}`}
                        >
                          {copy[index] ? copy[index] : "Copy"}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
          <section className="detailSection">
            <div>
              <h3>Advanced Statistics</h3>
              <p>
                Track how your links are performing across the web with our
                advanced statistics dashboard.
              </p>
            </div>
            <ul>
              <li>
                <div>
                  <Brand />
                </div>
                <h4>Brand Recognition</h4>
                <p>
                  Boost your brand recognition with each click. Generic links
                  don’t mean a thing. Branded links help instil confidence in
                  your content.
                </p>
              </li>
              <li>
                <div>
                  <Detail />
                </div>
                <h4>Detailed Records</h4>
                <p>
                  Gain insights into who is clicking your links. Knowing when
                  and where people engage with your content helps inform better
                  decisions.
                </p>
              </li>
              <li>
                <div>
                  <Custom />
                </div>
                <h4>Fully Customizable</h4>
                <p>
                  Improve brand awareness and content discoverability through
                  customizable links, supercharging audience engagement.
                </p>
              </li>
            </ul>
          </section>
        </main>
      </div>
      <footer>
        <section className="start">
          <h2>Boost your links today</h2>
          <button>Get Started</button>
        </section>
        <div>
          <h3>
            <Logo />
          </h3>
          <section className="features">
            <h4>Features</h4>
            <ul>
              <li>Link Shortening</li>
              <li>Branded Links</li>
              <li>Analytics</li>
            </ul>
          </section>
          <section className="resources">
            <h4>Resources</h4>
            <ul>
              <li>Blog</li>
              <li>Developers</li>
              <li>Support</li>
            </ul>
          </section>
          <section className="about">
            <h4>Company</h4>
            <ul>
              <li>About</li>
              <li>Our Team</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </section>
          <section className="logos">
            <ul>
              <li>
                <Facebook />
              </li>
              <li>
                <Twitter />
              </li>
              <li>
                <Pinterest />
              </li>
              <li>
                <Instagram />
              </li>
            </ul>
          </section>
        </div>
      </footer>
    </div>
  );
}

export default App;
