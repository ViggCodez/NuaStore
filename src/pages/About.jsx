import React from 'react';

const About = () => {
    return (
        <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--primary-color)' }}>About NuaStore</h1>

            <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Our Story</h2>
                <p style={{ lineHeight: '1.8', color: 'var(--text-light)', marginBottom: '1.5rem' }}>
                    Welcome to NuaStore, your premier destination for curated fashion and lifestyle products.
                    Founded with a passion for quality and style, we aim to bring you the best selection of
                    clothing, accessories, and more.
                </p>
                <p style={{ lineHeight: '1.8', color: 'var(--text-light)' }}>
                    "Nua" represents our commitment to newness and freshness in every collection we launch.
                    We believe that style is a personal journey, and we're here to help you express yourself
                    with confidence.
                </p>
            </div>

            <div className="grid grid-cols-1 grid-cols-2" style={{ gap: '2rem' }}>
                <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Quality First</h3>
                    <p style={{ color: 'var(--text-light)' }}>We never compromise on the quality of our merchandise.</p>
                </div>
                <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Customer Love</h3>
                    <p style={{ color: 'var(--text-light)' }}>Your satisfaction is our top priority, always.</p>
                </div>
            </div>
        </div>
    );
};

export default About;
