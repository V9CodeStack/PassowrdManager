import { Component } from "react";
import { v4 } from "uuid";

import "./index.css";

const appLogo =
  "https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png";
const passwordManager =
  "https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png";
const website =
  "https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png";
const username =
  "https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png";
const password =
  "https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png";
const search =
  "https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png";
const noPasswords =
  "https://assets.ccbp.in/frontend/react-js/no-passwords-img.png";
const stars =
  "https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png";
const deletes =
  "https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png";

const dummyData = [
  {
    id: v4(),
    website: "Google.com",
    userName: "Vinay",
    password: 1234,
  },
  {
    id: v4(),
    website: "yeahoo.com",
    userName: "kumar",
    password: 9877,
  },
];

class PasswordManager extends Component {
  state = {
    data: [],
    inputWebsite: "",
    inputUsername: "",
    inputPassword: "",
    isFilterActive: false,
    showPassword: false,
  };

  onChangeWebSite = (event) => {
    this.setState({ inputWebsite: event.target.value });
  };

  onChangeUserName = (event) => {
    this.setState({ inputUsername: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ inputPassword: event.target.value });
  };

  onAddUser = (event) => {
    event.preventDefault();
    const { inputWebsite, inputUsername, inputPassword } = this.state;
    const newUser = {
      id: v4(),
      website: inputWebsite,
      userName: inputUsername,
      password: inputPassword,
    };
    this.setState((prevState) => ({
      data: [...prevState.data, newUser],
      inputWebsite: "",
      inputUsername: "",
      inputPassword: "",
      searchInput: "",
    }));
  };

  onShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  onDelete = (id) => {
    const { data } = this.state;
    const updatedItems = data.filter((item) => item.id !== id);
    this.setState({ data: updatedItems });
  };

  onChangeSearch = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  getSearchResults = () => {
    const { searchInput, data } = this.state;
    const searchResults = data.filter((eachItem) =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase())
    );
    return searchResults;
  };

  render() {
    const {
      data,
      inputWebsite,
      inputUsername,
      inputPassword,
      isFilterActive,
      showPassword,
      searchInput,
    } = this.state;
    const searchResults = this.getSearchResults();

    return (
      <div className="app-container">
        <div className="sub-container">
          <div className="logo-container">
            <img className="app-logo" alt="app logo" src={appLogo} />
          </div>
          <div className="input-password-container">
            <div className="password-container">
              <h1 className="password-header">Add New Password</h1>
              <form className="form" onSubmit={this.onAddUser}>
                <div className="input-card">
                  <img className="input-img" alt="website" src={website} />
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Website"
                    value={inputWebsite}
                    onChange={this.onChangeWebSite}
                  />
                </div>
                <div className="input-card">
                  <img className="input-img" alt="username" src={username} />
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Username"
                    value={inputUsername}
                    onChange={this.onChangeUserName}
                  />
                </div>
                <div className="input-card">
                  <img className="input-img" alt="password" src={password} />
                  <input
                    className="input"
                    type="password"
                    placeholder="Enter Password"
                    value={inputPassword}
                    onChange={this.onChangePassword}
                  />
                </div>
                <div className="button-card">
                  <button type="submit" className="btn">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div className="password-image-container">
              <img
                className="password-image"
                alt="password manager"
                src={passwordManager}
              />
            </div>
          </div>
          <div className="below-container">
            <div className="below-card1">
              <h1 className="para">
                Your Passwords: <p>{data.length}</p>
              </h1>
              <div className="below-input-search">
                <img className="input-img" alt="search" src={search} />
                <input
                  className="input"
                  type="search"
                  placeholder="Search"
                  onChange={this.onChangeSearch}
                />
              </div>
            </div>
            <hr />
            <div className="show-password-card">
              <input
                type="checkbox"
                id="checkbox"
                onClick={this.onShowPassword}
              />
              <label className="para" htmlFor="checkbox">
                Show passwords
              </label>
            </div>
            <ul className="ul-list">
              {searchResults.map((eachItem) => (
                <li className="list" key={eachItem.id}>
                  <div className="initial">
                    <p className="para">{eachItem.userName[0].toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="para para-text">{eachItem.website}</p>
                    <p className="para para-text">{eachItem.userName}</p>
                    <p className="para para-text">
                      {showPassword ? (
                        eachItem.password
                      ) : (
                        <img className="strs" alt="stars" src={stars} />
                      )}
                    </p>
                  </div>
                  <div>
                    <button
                      className="delete-btn"
                      type="button"
                      data-testid="delete"
                      onClick={() => this.onDelete(eachItem.id)}
                    >
                      <img className="delete-img" alt={deletes} src={deletes} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {searchResults.length === 0 && (
              <div className="last">
                <img
                  className="noPasswords"
                  alt="no passwords"
                  src={noPasswords}
                />
                <p className="para">No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordManager;
