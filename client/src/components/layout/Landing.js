import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Button} from 'react-bootstrap';




const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Penconnectorlab</h1>
          <p className='lead'>
            Create a pentesters profile/portfolio, share posts and get help from
            other pentesters
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
          <div>
      <h2>
      Top 10 Exercise
      </h2>
      </div>
        <Card className style={{ width: '18rem' }}>
        <Card.Img className variant="top" src="cve-2020-11xxx.png" />
        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Text></Card.Text>
          <Button variant="primary">Get Penconnectorlab Pro</Button>
        </Card.Body>
      </Card>
        </div>
      </div>
  </section> 
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
