import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Nav = ({ libraryStatus, setLibraryStatus, darkMode, setDarkMode }) => {
  return (
    <Navbar darkModeActive={darkMode}>
      <h1>Musikan</h1>
      <NavRight darkModeActive={darkMode}>
        <input
          onClick={() => setDarkMode(!darkMode)}
          type="checkbox"
          id="switch"
        />
        <label htmlFor="switch"></label>
        <button onClick={() => setLibraryStatus(!libraryStatus)}>
          Library <FontAwesomeIcon icon={faMusic} />
        </button>
      </NavRight>
    </Navbar>
  );
};

const Navbar = styled.div`
  display: flex;
  justify-content: space-around;
  min-height: 10vh;
  align-items: center;
  ${(props) => !props.darkModeActive} {
    h1 {
      color: #fefbf3;
    }
  }
`;
const NavRight = styled.div`
  display: flex;
  align-items: center;
  label {
    margin-right: 1rem;
    position: relative;
    display: block;
    width: 3.5rem;
    height: 2rem;
    border-radius: 50px;
    cursor: pointer;
    background: #04293f;
    transition: 0.5s ease;
    border: 0.2rem solid #04293f;
  }
  // dark mode
  input[type="checkbox"] {
    width: 0;
    height: 0;
    visibility: hidden;
  }
  label::after {
    content: "";
    position: absolute;
    width: 1.6rem;
    height: 1.6rem;
    background: #fefbf3;
    border-radius: 50px;
    transition: all 0.5s ease;
  }
  input:checked + label {
    background: #fefbf3;
    border: 0.2rem solid #fefbf3;
  }
  input:checked + label:after {
    transform: translateX(100%);
    background: #04293f;
  }
  button {
    background-color: transparent;
    cursor: pointer;
    border: 2px solid #04293f;
    padding: 0.5rem;
    transition: all 0.3s ease;
    color: #04293f;
    &:hover {
      background: #04293f;
      border: #04293f 2px solid;
      color: #fefbf3;
    }
    ${(props) => !props.darkModeActive} {
      color: #fefbf3;
      border: 2px solid #fefbf3;
      &:hover {
        background: #fefbf3;
        border: #fefbf3 2px solid;
        color: #04293f;
      }
    }
  }
  @media screen and (max-width: 640px) {
    button {
      z-index: 10;
    }
  }
`;

export default Nav;
