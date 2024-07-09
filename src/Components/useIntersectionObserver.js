import React, { useState, useRef } from "react";
import Head from "./Head";
import Footer from "./Footer";
import useIntersectionObserver from './useIntersectionObserver'; // Adjust the path as per your project structure
import photo1 from '../images/Lab_Assistant.png';
import photo2 from '../images/smalllogo.png';
import photo3 from '../images/labtool1 (3).png';
import photo4 from '../images/labtool2.png';
import photo5 from '../images/labtool3.png';
import photo6 from '../images/Labtool4-removebg-preview.png';

function Counter({ start, end, duration }) {
    const [count, setCount] = useState(start);

    React.useEffect(() => {
        const increment = (end - start) / (duration / 100);
        const handle = setInterval(() => {
            setCount((prev) => {
                if (prev >= end) {
                    clearInterval(handle);
                    return end;
                }
                return prev + increment;
            });
        }, 100);

        return () => clearInterval(handle);
    }, [start, end, duration]);

    return (
        <div style={{ fontSize: '40px', fontWeight: 'bold', color: '#101754' }}>
            {Math.floor(count)}
        </div>
    );
}

export default function HomePage() {
    const [loadedSections, setLoadedSections] = useState({
        intro: false,
        services: false,
        about: false,
    });

    const introRef = useRef();
    const servicesRef = useRef();
    const aboutRef = useRef();

    // Intersection observer callback function
    const sectionCallback = (section) => {
        setLoadedSections((prev) => ({
            ...prev,
            [section]: true,
        }));
    };

    // Use intersection observer for each section
    useIntersectionObserver(introRef, () => sectionCallback('intro'), {});
    useIntersectionObserver(servicesRef, () => sectionCallback('services'), {});
    useIntersectionObserver(aboutRef, () => sectionCallback('about'), {});

    const boxStyle = {
        width: '250px',
        height: '320px',
        borderRadius: '10px',
        background: 'linear-gradient(145deg, #cacaca, #f0f0f0)',
        boxShadow: '17px 17px 34px #b1b1b1, -17px -17px 34px #ffffff',
        marginBottom: '40px',
        position: 'relative', // Ensure the container has relative positioning
    };

    const contentStyle = {
        width: '90px',
        height: '90px',
        backgroundColor: '#ABA9A9',
        transform: 'translateX(-50%) rotate(45deg)', // Center horizontally, then rotate
        position: 'absolute',
        top: '13%', // Position at the top
        left: '50%', // Center horizontally
    };

    return (
        <div>
            <Head />

            {/* Section 1 */}
            <div ref={introRef} id="intro" style={{ opacity: loadedSections.intro ? 1 : 0, transition: 'opacity 0.5s ease' }}>
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#E0F7FA', padding: '40px', marginTop: '10px', borderRadius: '50px', border: '30px solid #FFFFFF', borderBottom: '0px' }}>
                    <img
                        src={photo1}
                        alt="Detailing"
                        style={{ maxWidth: '35%', height: 'auto', marginRight: '30px'}}
                    />

                    {/* Right-aligned text */}
                    <div style={{ flex: 1, textAlign: 'left', paddingLeft: '40px', paddingRight: '5%' }}>
                        <p style={{ fontSize: '18px', margin: 0, fontFamily: 'Helvetica', paddingBottom: '8px', color: '#808080' }}>HealthLab Inc. - The pioneer of safety and comfort</p>
                        <p style={{ fontWeight: 'bold', fontSize: '45px', margin: 0, fontFamily: 'Helvetica', position: 'relative', paddingBottom: '20px' }}>
                            <span style={{ color: '#101754' }}>Expert Laboratory Services</span>
                            <span style={{ position: 'absolute', bottom: '-5px', left: 0, width: '50%', borderBottom: '2px solid #101754', padding: '20px' }}></span>
                        </p>
                        <p style={{ fontSize: '18px', margin: 0, fontFamily: 'Helvetica', paddingTop: '50px' }}>We prioritize your comfort and safety, employing the latest techniques to make the process as painless and efficient as possible.</p>
                        <a href="#about" style={{ textDecoration: 'none' }}>
                            <button style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#101754', color: '#FFFFFF', border: 'none', borderRadius: '20px', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center',  width: 'auto' /* Ensure the width fits the content */ }}>
                                Learn More About Us<span style={{ marginLeft: '10px' }}>→</span>
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            {/* Section 2 */}
            <div ref={servicesRef} id="services" style={{ opacity: loadedSections.services ? 1 : 0, transition: 'opacity 0.5s ease' }}>
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <h1 style={{ color: '#101754', marginBottom: '10px' }}>Services</h1>
                </div>

                {/* Service headline and the underline with the small logo */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                    <div style={{ borderBottom: '1px solid #101754', width: '4cm' }}></div>
                    <div style={{ marginRight: '20px', marginLeft: '20px' }}>
                        <img src={photo2} alt="Services Icon" style={{ width: '20px', height: '20px' }} />
                    </div>
                    <div style={{ borderBottom: '1px solid #101754', width: '4cm' }}></div>
                </div>

                {/* Content under Services */}
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px', flexWrap: 'wrap' }}>
                    <div style={{ ...boxStyle, flex: '1 1 250px', maxWidth: '300px', margin: '10px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                            <div style={{ ...contentStyle, display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
                                <img src={photo3} alt="Icon 1" style={{ width: '60px', height: '60px', borderRadius: '20%' }} />
                            </div>
                            <div style={{ marginTop: '160px' }}>
                                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Comprehensive Blood Tests</p>
                                <p style={{ fontSize: '14px' }}>A wide array of blood tests to assess various health indicators</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ ...boxStyle, flex: '1 1 250px', maxWidth: '300px', margin: '10px', textAlign: 'center' }}>
                        <div style={{ ...contentStyle, display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
                            <img src={photo4} alt="Icon 2" style={{ width: '60px', height: '60px', borderRadius: '20%' }} />
                        </div>
                        <div style={{ marginTop: '180px' }}>
                            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Point-of-Care Testing</p>
                            <p style={{ fontSize: '14px', marginLeft: '10px', marginRight:'10px' }}>Rapid testing for immediate results, Point-of-care testing for faster treatment decisions</p>
                        </div>
                    </div>
                    <div style={{ ...boxStyle, flex: '1 1 250px', maxWidth: '300px', margin: '10px', textAlign: 'center' }}>
                        <div style={{ ...contentStyle, display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
                            <img src={photo5} alt="Icon 3" style={{ width: '70px', height: '70px', borderRadius: '20%' }} />
                        </div>
                        <div style={{ marginTop: '180px' }}>
                            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Genetic Testing</p>
                            <p style={{ fontSize: '14px' }}>Detect potential genetic conditions or predispositions for personalized healthcare.</p>
                        </div>
                    </div>
                    <div style={{ ...boxStyle, flex: '1 1 250px', maxWidth: '300px', margin: '10px', textAlign: 'center' }}>
                        <div style={{ ...contentStyle, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={photo6} alt="Icon 4" style={{ width: '60px', height: '60px', borderRadius: '20%' }} />
                        </div>
                        <div style={{ marginTop: '180px' }}>
                            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Drug Testing</p>
                            <p style={{ fontSize: '14px' }}>Testing for drugs of abuse and medication monitoring for better healthcare management.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3 */}
            <div ref={aboutRef} id="about" style={{ opacity: loadedSections.about ? 1 : 0, transition: 'opacity 0.5s ease' }}>
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <h1 style={{ color: '#101754', marginBottom: '10px' }}>About</h1>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '10px' }}>
                    <div style={{ width: '45%' }}>
                        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>Our mission is to provide the highest quality laboratory services to improve healthcare outcomes. We are dedicated to leveraging innovative technologies and ensuring accurate results for our clients.</p>
                    </div>
                    <div style={{ width: '45%' }}>
                        <img src={photo2} alt="Services Icon" style={{ width: '100%', height: 'auto', borderRadius: '10%' }} />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
