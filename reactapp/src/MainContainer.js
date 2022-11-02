import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, } from 'reactstrap';
import CardMovie from "./CardMovie";



function MainContainer() {
    return(
        <Row>
        <Col className="bg-light border">
        <CardMovie/>
        </Col>
        <Col className="bg-light border">
        <CardMovie/>
        </Col>
        <Col className="bg-light border">
        <CardMovie/>
        </Col>
      </Row>
    )
  }
  export default MainContainer;