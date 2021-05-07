/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import "./Box.css";
import { Card } from "react-bootstrap";

const Cards = () => {
  const cardInfo = [
    {
      image: "cve-2020-11xxx.png",
      title: "Code Review Badge",
      text: "The Code Review Badge",
    },
    {
      image:
        "oauth2_xss_auth_ii.png",
      title: "Authentication / Authorization Badge",
      text: "Authentication / Authorization Badge",
    },
    {
      image:
        "http_12.png",
      title: "HTTP Badge",
      text: "HTTP Badge",
    },
    {
      image:
        "express_lfr.png",
      title: "Express Local File Read",
      text: "Brown Badge",
    },
    {
      image: "oauth2_xss_auth.png",
      title: "Authentication / Authorization Badge",
      text: "Authentication / Authorization Badge two",
    },
    {
      image:
        "play_session_Injection.png",
      title: "Play Session Injection",
      text: "Play Session Injection Your Way",
    },
    {
      image:
        "xss_and_mysql_file.png",
      title: "XSS and MySQl File",
      text: "XSS and MySQl File",
    },
    {
      image:
        "axis2_and_tomcat_manager.png",
      title: "Axis2 Web service and Tomcat Manager",
      text: "Axis2 Web service and Tomcat Manager",
    },
    {
    
      image:
        "cve-2012-6081.png",
      title: "CVE-2012-6081: MoinMoin code executionteph Curry",
      text: "CVE-2012-6081: MoinMoin code execution",
    },
    {
      image:
        "web_for_pentester.png",
      title: "Web for Penttester",
      text: "Web for Pentester",
    },
  ];

  const renderCard = (card, index) => {
    return (
      <Card style={{ width: "18rem" }} key={index} className="box">
        <Card.Img variant="top" src="holder.js/100px180" src={card.image} />
        <Card.Body>
          <Card.Title>{card.title}</Card.Title>
          <Card.Text>{card.text}</Card.Text>
        </Card.Body>
      </Card>
    );
  };

  return <div className="grid">{cardInfo.map(renderCard)}</div>;
};

export default Cards;