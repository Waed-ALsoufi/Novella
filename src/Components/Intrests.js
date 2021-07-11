import React, { useState } from "react";
import "../Style/Intrests.css";
import Drama from "../Images/Drama.jpeg";
import Policy from "../Images/Policy.jpeg";
import Scientific from "../Images/Scientific.jpeg";
import History from "../Images/History.jpg";
import Fictional from "../Images/Fictional.jpeg";
import Children from "../Images/Children.jpeg";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { useAuth } from "./Auth";
import fire from "./firebase";
import { Link } from "react-router-dom";

function Intrests(props) {
  const { currentUser } = useAuth();
  const [intrestsData, setIntrestData] = useState([
    {
      name: "Drama",
      intrImg: Drama,
      check: false,
    },
    {
      name: "Policy",
      intrImg: Policy,
      check: false,
    },
    {
      name: "Scientific",
      intrImg: Scientific,
      check: false,
    },
    {
      name: "History",
      intrImg: History,
      check: false,
    },
    {
      name: "Fictional",
      intrImg: Fictional,
      check: false,
    },
    {
      name: "Children",
      intrImg: Children,
      check: false,
    },
  ]);
  return (
    <div className="Intrests">
      <div>
        <h1 className="tellUs">Tell us about your interests? </h1>
      </div>

      <div className="row">
        {intrestsData.map((intrest, index) => (
          <div className="col" key={index}>
            <div className="itrImg">
              <img src={intrest.intrImg} alt="" />
              <div className="intrname">
                <FormControlLabel
                  value="start"
                  control={
                    <Checkbox
                      color="primary"
                      checked={intrest.check}
                      onChange={() => {
                        const newIntrest = intrestsData.filter(
                          (last) => last.name !== intrest.name
                        );
                        newIntrest.push({
                          name: intrest.name,
                          check: !intrest.check,
                          intrImg: intrest.intrImg,
                        });
                        setIntrestData(newIntrest);
                      }}
                    />
                  }
                  label={intrest.name}
                  labelPlacement="start"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="Intrestsbut"
        onClick={() => {
          const newIntrest = intrestsData.filter((last) => last.name === true);
          setIntrestData(newIntrest);
          fire
            .firestore()
            .collection("users")
            .doc(currentUser.uid)
            .update({ intrestsData })
            .then(() => props.history.push("/Home"));
        }}
      >
        Next
      </button>
    </div>
  );
}

export default Intrests;
