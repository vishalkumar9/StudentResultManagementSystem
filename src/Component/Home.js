import React from "react";
import './Home.css'
import vid from "../Video/Education.mp4"

function Home() {
    return (
        <div>
            <video loop autoPlay className="home">
                <source
                    src={vid}
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}export default Home;