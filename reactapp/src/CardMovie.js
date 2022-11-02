import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardTitle, CardBody, CardText, Button} from 'reactstrap';
import { Col, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEye, faStar } from '@fortawesome/free-solid-svg-icons';

import './CardMovie.css';
import { eventWrapper } from '@testing-library/user-event/dist/utils';


function CardMovie(props) {

  const [likeState, setStateLikeMovie] = useState("default");
  const [viewState, setStateViewMovie] = useState("default");
  const [viewCount, setCountViewMovie] = useState(56);
  const [myRatingMovie, setMyRatingMovie] = useState(0);

  let averageRating = props.globalRating;
  let rateCount = props.globalCountRating;

  let descConcat = props.movieDesc;
  if (descConcat.length> 150) {
    var description = descConcat.slice(0 ,150) + "..."
  } else { description  = descConcat}



  var likeClick = ()=> {
    // setStateLikeMovie("active");
    if(likeState === "active"){setStateLikeMovie("default")} else {setStateLikeMovie("active")}
  }

  var viewClick = ()=> {
    // setStateLikeMovie("active");
    if(viewState === "active"){setStateViewMovie("default"); setCountViewMovie(viewCount-1)} else {setStateViewMovie("active");setCountViewMovie(viewCount+1)};
  }
  
    var likeColor;
      if(likeState === "default") {
        likeColor = { color: "rgb(0, 222, 169, 0.3)" };
      } else {
        likeColor = { color: "rgb(0, 222, 169, 1)" };
      }

    var viewColor;
    if(viewState === "default") {
      viewColor = { color: "rgb(0, 222, 169, 0.3)" };
    } else {
      viewColor = { color: "rgb(0, 222, 169, 1)" };
    }



        
  
    var tabRating = []
    for(var i=0;i<10;i++){
      let count = i + 1;
        var color = {}
        if(i<myRatingMovie){
            color = {color: 'rgb(0, 222, 169)'}
        }
        tabRating.push(<FontAwesomeIcon style={color} icon={faStar} className='iconeXL' onClick={ () => setMyRatingMovie(count) }/>  )
      let newGlobalRating = (props.globalRating * props.globalCountRating + myRatingMovie)/ (props.globalCountRating + 1);
      averageRating = newGlobalRating
  }

  if(myRatingMovie !== 0) {
    rateCount = rateCount +1;
  }

  var tabGlobalRating = []
  for(var i=0;i<10;i++){
      var color = {}
      if(i<Math.round(averageRating)){
          color = {color: 'rgb(0, 222, 169)'}
      }
      tabGlobalRating.push(<FontAwesomeIcon style={color} icon={faStar} className='icone'/>  )
  }
   
  
  var handleClickAddMovieParent = ()=>{
    if(likeState === "default"){props.addMovie(props.movieName, props.movieImg)} 
  }

  var handleClickDeleteMovieParent = ()=>{
    if(likeState === "active"){props.deleteMovie(props.movieName, props.movieImg)} 
  }

  

    return (
      <Col
      className="bg-light cardContainer"
      xs="12"
      md="6"
      xl="4"
    >
  <Card className="card">
  <CardImg
    alt="Card image cap"
    src={props.movieImg}
    top
    width="100%"
    className='CardImg'
  />
  <CardBody>
     <div className='cardIcone'>
        <Button outline className='buttonIcone'  onClick={ () => [likeClick(), handleClickAddMovieParent(), handleClickDeleteMovieParent()]  } >
          <FontAwesomeIcon icon={faHeart} className='icone' style={likeColor}/>
        </Button>
        <div className="views">
        <CardText className='g3 '>
         {viewCount}
        </CardText>
        <Button outline className='buttonIcone' onClick={ () => viewClick() } >
          <FontAwesomeIcon icon={faEye} className='icone' style={viewColor} />    
        </Button>
        </div>
     </div>
     <div className="rating">
     <CardTitle tag="h5">
     {props.movieName}
    </CardTitle>
    <div className='ratingStarVote'>
      <div className='stars'>
      {tabGlobalRating}
      </div>
    
    <CardText className='g3'>
    {rateCount}
    </CardText>
    </div>
    

    
     </div>
     <CardText className='g3 bold'>
      Description:    
      </CardText>
      <CardText className='g3 desc'>
      {description}
          </CardText>
    <div className="rateYourself">
    <h4>
    Qu'en avez-vous pensé ? </h4>
    <div className="rating">
    {tabRating}
    </div>
    </div>
  </CardBody>
  </Card>
  </Col>
    );
  };


export default CardMovie;