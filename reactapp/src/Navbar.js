import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, } from 'reactstrap';
import { NavItem, NavLink, Nav, Button, UncontrolledPopover, PopoverHeader, PopoverBody  } from 'reactstrap';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';



function Navbar(props) {

var moviesCount = props.moviesCount;
var favoriteMovieList = props.favoriteMovieList;




var movieList = favoriteMovieList.map(function(movie,i) {
  return (
    <div className='movieWish'>
    <img src={movie.movieImg} className='img'/>     
    <div>{movie.movieName}</div>
    <FontAwesomeIcon icon={faCircleXmark} className='removeIcone'/> 
  </div>
  )
}) 

    return (
      <Row >
      <Col className="bg-light">
      <div>
    <Nav
    >
      <NavItem>
        <NavLink
          active
          href="#"
        >
          <img alt="Logo" src="./logo.png"/>
  
        </NavLink>
      </NavItem>
      {/* <NavItem>
        <NavLink href="#">
          Another Link
        </NavLink>
      </NavItem> */}
     
      <div>
            <Button className='boutonNavbar'
                id="UncontrolledPopover"
                type="button"
            >
                Favoris {moviesCount}
            </Button>
            <UncontrolledPopover
                placement="bottom"
                target="UncontrolledPopover"
                className='popover'
            >
                <PopoverHeader className='popoverTitle'>
                Vos films favoris
                </PopoverHeader>
                <PopoverBody className='bodyPopover'>
                {movieList}
                </PopoverBody>
            </UncontrolledPopover>
        </div>
  
    </Nav>
  </div>
  <div className="divider">

      </div>
      </Col>
      
    </Row>
    );
  };

  export default Navbar;