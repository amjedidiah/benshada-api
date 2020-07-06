import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBox,
  faStoreAlt,
  faUser,
  faShoppingBag,
  faUserEdit,
  faTruck,
  faTruckMoving
} from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ContainerDimensions from 'react-container-dimensions';

function Image({
  image, name, size, type, xtraClass, id
}) {
  return (image && image.length === 0) || image === undefined || image === null ? (
    <div className={`text-center ${xtraClass}`}>
      <FontAwesomeIcon
        icon={
          {
            deliveryCompany: faTruck,
            store: faStoreAlt,
            product: faBox,
            user: faUser,
            order: faShoppingBag,
            review: faUserEdit,
            package: faTruckMoving
          }[type]
        }
        className={`fa-${size}x text-secondary`}
      />
    </div>
  ) : (
    <div className={`text-center ${xtraClass}`}>
      {type === 'user' ? (
        <ContainerDimensions>
          {({ height, width }) => (
            <img
              className="card-img img-responsive"
              src={image || (image && image[0])}
              style={{
                minHeight: `${height * 1.15}px`,
                minWidth: `${width}px`
              }}
              alt={name}
            />
          )}
        </ContainerDimensions>
      ) : (
        <Link to={`/${type}s/?id=${id}`}>
          <img className="card-img img-responsive" src={image || (image && image[0])} alt={name} />
        </Link>
      )}
    </div>
  );
}

Image.propTypes = {
  id: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  name: PropTypes.string,
  size: PropTypes.number,
  type: PropTypes.string,
  xtraClass: PropTypes.string
};

export default Image;