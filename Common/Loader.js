import React from "react";
import { Spinner } from "react-bootstrap";
import Loading from "../components/Loading";

//Whole page loader
export const Loader = (props) => {
  return (
    <div className="loader_wrapper textclr nosimilar_torrent">
       <Loading/>
      {" "}
      {/* <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div>
        
      </div>
      <div className="loader-text">{props.loadingText||"Loading..."}</div> */}
    </div>
  );
};

//Button spinner
export const BtnSpinner = () => {
  return (
    <>
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      <span>Loading...</span>
    </>
  );
};