import React from 'react';
import PropTypes from 'prop-types';
import './LinkLink.scss';
import { Link } from 'react-router-dom'

const LineLink = ({ href, title, extra }) => {
  return (
    <Link to={href} className="lineLink">
      <div className="lineLink__title">{title}</div>
      <div className="lineLink__extra">{extra}</div>
      <i className="lineLink__arrow" />
    </Link>
  );
};

LineLink.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  extra: PropTypes.string
};

export default LineLink;
