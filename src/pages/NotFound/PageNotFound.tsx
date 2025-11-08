import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import notFound from '../../components/pageNotFound.jpg'
import './PageNotFound.css'
const PageNotFound: React.FC = () => {
  return (
    <section className='notFound'>
      <div className="container">
        <h1>Looks like you're lost</h1>
        <p>We can't seem to find the page you're looking for.</p>
        <Link to={"/"}>
          Back to the Homepage <span><HiOutlineArrowNarrowRight /> </span>
        </Link>
      </div>
        <img src={notFound} alt="Not Found" className="notFoundImg" />
    </section>
  );
}

export default PageNotFound;
