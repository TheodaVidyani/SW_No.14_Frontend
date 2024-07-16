import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import Dhome from "../Dhome";
import loadingAnimation from "../Components/Animation5.json"; // Replace with the actual path

export default function Doctor() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading delay
        setTimeout(() => {
            setIsLoading(false);
        }, 4000);
    }, []);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        },
        speed: 1
    };

    return (
        <div className={`patient-container ${isLoading ? "loading" : ""}`}>
            {isLoading ? (
                <div className="loading-animation">
                    <div className="loading-animation-wrapper">
                        <Lottie options={defaultOptions} height={'100%'} width={'77%'} style={{marginTop:'0%'}}/>
                    </div>
                </div>
            ) : (
                <Dhome/>
            )}
        </div>
    );
}
