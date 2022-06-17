import './AboutPage.css';
import githubLogo from '../../images/github.svg';
import profileImage from '../../images/profile-image.png';

import React from 'react';

export default function AboutPage() {

    return (
        <div className='about-page-main'>
            <div className='about-page-header'>Welcome to the About Page</div>
            <img 
                src={profileImage}
                alt='profile'
            />
            <div className='about-me'>
                <p className='about-fact'>
                    Hello! My name is Anthony Lovern. I am based out of North Carolina and I am a graduate from App Academy.
                </p>
                <p className='about-fact'>
                    I am able to use Python, Javascript, HTML, CSS, React, Redux, Sequelize, SqlAlchemy, and more.
                </p>
                <p className='about-fact'>
                    I would like to thank you for checking out my project, Nerdrr. If you would like to view more of my work, check out the links below.
                </p>
            </div>
            <div className='links-container'>
                <a
                    href='https://github.com/Amlovern'
                    target='_blank'
                    rel='noreferrer'
                >
                    <img src={githubLogo} height='80px' alt='github' />
                </a>
            </div>
        </div>
    )
}