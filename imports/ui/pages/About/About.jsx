import React from 'react';
import './About.css';
import { Github } from 'react-bootstrap-icons';

const About = () => {
    return ( 
        <div className="container">
            <div className="pt-4">
                <div className="d-flex justify-content-center mb-4">
                    <span className="about__logo">
                        <img src="/logo.svg" alt="petitions logo" />
                        <span className="logo-title">about</span>
                    </span>
                </div>
                <hr />
                <p>This is not a commercial project. It's just a concept platform made with ReactJS and MeteorJS framework for purpose of learning to code and for showing in my portfolio.</p>
                <hr />
                <p>By registering and using this platform you agree that you are responsible for compliance with any applicable local laws.</p>
                <hr />
                <p>You're responsible for making sure that your posted content complies with all applicable laws and regulations. You agree that you will not use this app or any data or services provided through the app for, or to encourage, any unlawful purpose.</p>
                <hr />
                <p>Don't enter any real personal data when using this platform.</p>
                <hr />
                <div className="text-center pt-2">
                <a href="https://github.com/danilo-89/petitions" target="_blank" rel="noopener noreferrer"><Github /> github</a>
                </div>
            </div>
        </div>
    );
}

export default About;