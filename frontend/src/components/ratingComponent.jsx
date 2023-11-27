import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";

function ratingComponent(rating , numReview) {
  const Rating = rating.rating;
  return (
    <span id="Spasdj">
      {Rating >= 4.5 ? (
        <span className="ratingStar">
          <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} />{" "}
          <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} />{" "}
          <FontAwesomeIcon icon={faStar} />{" "}
        </span>
      ) : Rating > 4 ? (
        <span className="ratingStar">
          <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} />{" "}
          <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} />{" "}
          <FontAwesomeIcon icon={faStarHalfStroke} />
        </span>
      ) : Rating == 4 ? (
        <span className="ratingStar">
          <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} />{" "}
          <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} />{" "}
        </span>
      ) : Rating >= 3.5 ? (
        <span className="ratingStar">
          <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} />{" "}
          <FontAwesomeIcon icon={faStar} />{" "}
          <FontAwesomeIcon icon={faStarHalfStroke} />
        </span>
      ) : Rating >= 3 ? (
        <span className="ratingStar">
          <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} />{" "}
          <FontAwesomeIcon icon={faStar} />{" "}
        </span>
      ) : Rating >= 2.5 ? (
        <span className="ratingStar">
          <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStarHalfStroke} />
        </span>
      ) : Rating >= 2 ? (
        <span className="ratingStar">
          <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} />
        </span>
      ) : Rating >= 1.5 ? (
        <span className="ratingStar">
          <FontAwesomeIcon icon={faStar} />{" "}
          <FontAwesomeIcon icon={faStarHalfStroke} />
        </span>
      ) : Rating >= 1 ? (
        <span className="ratingStar">
          <FontAwesomeIcon icon={faStar} />{" "}
        </span>
      ) : Rating <= 1 ? (
        <span className="ratingStar">
          <FontAwesomeIcon icon={faStarHalfStroke} />
        </span>
      ) : (
        "No Rating"
      )}
    </span>
  );
}

export default ratingComponent;
