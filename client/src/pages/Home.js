import React, { Component } from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import HomeInfo from "../components/HomeInfo";
import { RightAlignButton } from "../styles";

const StyledHome = styled.div`
  max-width: ${props => props.theme.formWidth};
  margin: 2rem auto;
  padding: 1rem;

  .single-home {
    margin: 1rem auto 0;

    .border-top-bottom {
      border-top: 1px solid ${props => props.theme.formBorderColor};
      border-bottom: 1px solid ${props => props.theme.formBorderColor};
    }

    .button-group {
      flex-direction: column-reverse;
      .call-to-action-button {
        margin-bottom: 1rem;
        width: 100%;
      }
      .button {
        width: 100%;
      }
    }
    @media screen and (min-width: 768px) {
      .button-group {
        flex-direction: row;
        .call-to-action-button {
          margin-bottom: 0;
          width: 150px;
        }
        .button {
          width: 150px;
          margin-right: 1rem;
        }
      }
    }
  }
`;

export default class Home extends Component {
  state = {
    address: "",
    city: "",
    state: "",
    zip: "",
    code: ""
  };

  // Get a single home using the id from the params
  getHome = () => {
    const BACKEND_API_URL =
      process.env.NODE_ENV !== "production"
        ? `http://localhost:5000/api/homes/${this.props.match.params.id}`
        : `https://protected-oasis-33800.herokuapp.com/api/homes/${this.props.match.params.id}`;

    axios
      .get(`${BACKEND_API_URL}`)
      .then(req => {
        const { address, city, state, zip, code } = req.data.data;
        return this.setState({
          address,
          city,
          state,
          zip,
          code
        });
      })
      .catch(err => console.log(err));
  };

  deleteHome = () => {
    axios
      .delete(`http://localhost:5000/api/homes/${this.props.match.params.id}`)
      .then(res => {
        if (res.data.redirect === "/homes") {
          window.location = "/homes";
        }
      })
      .catch(err => console.log(err));
  };

  async componentDidMount() {
    this.getHome();
  }

  render() {
    const { address, city, state, zip, code } = this.state;
    return (
      <StyledHome>
        <h2>Address to Edit</h2>
        <div className="single-home">
          <HomeInfo
            className="border-top-bottom"
            address={address}
            city={city}
            state={state}
            zip={zip}
            code={code}
          />
          <RightAlignButton className="button-group">
            <input
              className="button"
              type="button"
              name="deleteHome"
              value="Delete"
              onClick={this.deleteHome}
            />
            <Link
              className="edit"
              to={`/homes/${this.props.match.params.id}/edit`}
            >
              <input
                className="call-to-action-button"
                type="button"
                name="editHome"
                value="Edit"
              />
            </Link>
          </RightAlignButton>
        </div>
      </StyledHome>
    );
  }
}
