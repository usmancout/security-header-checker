import React, { useState } from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

function App() {
    const [url, setUrl] = useState('');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    // Security headers to check
    const securityHeaders = {
        'Strict-Transport-Security': {
            description: 'Ensures HTTPS only',
            recommended: 'max-age=31536000'
        },
        'Content-Security-Policy': {
            description: 'Controls resource loading',
            recommended: "default-src 'self'"
        },
        'X-Frame-Options': {
            description: 'Prevents clickjacking',
            recommended: 'SAMEORIGIN'
        },
        'X-Content-Type-Options': {
            description: 'Prevents MIME sniffing',
            recommended: 'nosniff'
        }
    };

    const checkHeaders = async (url) => {
        setLoading(true);
        try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockResults = {
                'Strict-Transport-Security': 'max-age=31536000',
                'Content-Security-Policy': "default-src 'self'",
                'X-Frame-Options': 'DENY',
                'X-Content-Type-Options': 'nosniff'
            };

            setResults(mockResults);
        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false);
    };

    const getStatusIcon = (header, value) => {
        if (!value) return <XCircle color="red" />;
        if (value.includes(securityHeaders[header].recommended)) {
            return <CheckCircle color="green" />;
        }
        return <AlertCircle color="orange" />;
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1>Security Headers Checker</h1>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter website URL"
                    style={{
                        width: '70%',
                        padding: '8px',
                        marginRight: '10px'
                    }}
                />
                <button
                    onClick={() => checkHeaders(url)}
                    disabled={loading || !url}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: loading ? '#ccc' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Checking...' : 'Check Headers'}
                </button>
            </div>

            {results && (
                <div>
                    {Object.entries(securityHeaders).map(([header, info]) => (
                        <div
                            key={header}
                            style={{
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                padding: '15px',
                                marginBottom: '10px'
                            }}
                        >
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'start' }}>
                                {getStatusIcon(header, results[header])}
                                <div>
                                    <h3 style={{ margin: '0 0 5px 0' }}>{header}</h3>
                                    <p style={{ margin: '0 0 10px 0', color: '#666' }}>
                                        {info.description}
                                    </p>
                                    <div style={{ backgroundColor: '#f5f5f5', padding: '10px' }}>
                                        <p style={{ margin: '0 0 5px 0' }}>
                                            <strong>Current Value: </strong>
                                            {results[header] || 'Not set'}
                                        </p>
                                        <p style={{ margin: '0' }}>
                                            <strong>Recommended: </strong>
                                            {info.recommended}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;