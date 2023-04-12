import React from 'react';
import './InfoBlock.scss';



function InfoBlock ( ) {
  return (
        <div className="info-block">
          <div className="info-block__info">
                <img src={require("../../../assets/images/image1.jpg")} alt="info" />
                <div className="info-block__info-text">
                    <h2 className="info-block__title">Lorem ipsum dolor sit <span>amet</span></h2>
                    <p className="info-block__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                    in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                    sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </div>
            </div>
            <div className="info-block__info">
                <div className="info-block__info-text">
                    <h2 className="info-block__title">Lorem ipsum dolor sit <span>amet</span></h2>
                    <p className="info-block__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                    in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                    sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </div>
                <img src={require("../../../assets/images/image2.jpg")} alt="info" />
            </div>
        </div>
  );
};

export default InfoBlock;