import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const alt = 'CompuPlus | Engineering the Future';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #0f172a, #1e1b4b)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Background Shapes */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-100px',
                        left: '-100px',
                        width: '400px',
                        height: '400px',
                        background: '#06b6d4',
                        borderRadius: '50%',
                        opacity: '0.2',
                        filter: 'blur(100px)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-100px',
                        right: '-100px',
                        width: '500px',
                        height: '500px',
                        background: '#7c3aed',
                        borderRadius: '50%',
                        opacity: '0.2',
                        filter: 'blur(100px)',
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                    }}
                >
                    {/* Logo Representation */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '40px',
                        }}
                    >
                        <svg
                            width="80"
                            height="80"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 2L2 7L12 12L22 7L12 2Z"
                                stroke="#06b6d4"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2 17L12 22L22 17"
                                stroke="#7c3aed"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2 12L12 17L22 12"
                                stroke="#06b6d4"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <h1
                        style={{
                            fontSize: '80px',
                            fontWeight: 'bold',
                            color: 'white',
                            margin: '0',
                            textAlign: 'center',
                            letterSpacing: '-2px',
                        }}
                    >
                        Compu<span style={{ color: '#06b6d4' }}>Plus</span>
                    </h1>

                    <p
                        style={{
                            fontSize: '32px',
                            color: '#94a3b8',
                            marginTop: '20px',
                            textAlign: 'center',
                            maxWidth: '800px',
                            lineHeight: '1.4',
                        }}
                    >
                        Engineering the Future of Technology
                    </p>

                    {/* Badge */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '40px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '50px',
                            padding: '10px 30px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                    >
                        <span style={{ color: '#06b6d4', fontSize: '20px', marginRight: '10px' }}>●</span>
                        <span style={{ color: 'white', fontSize: '20px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                            Trusted Partner
                        </span>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
