import { useRouter } from 'next/router';
import NavbarComponent from "../../../components/navbar";
import Bottom from "@components/footer";
import { Box, Grid } from "@mui/material";
import Link from "next/link";
import { useState } from 'react';
import alumni2021 from "../../../public/alumni_2021.json";

export default function User2021() {
    const router = useRouter();
    const { id } = router.query;
    const user = alumni2021.find((u) => u.email && u.email.split('@')[0] === id);
    const [showAllTestimonials, setShowAllTestimonials] = useState(false);

    if (!user) {
        return <div>User not found</div>;
    }

    const hasMoreTestimonials = user.testimonials && user.testimonials.length > 3;
    const displayedTestimonials = showAllTestimonials
        ? user.testimonials
        : user.testimonials?.slice(0, 3);

    return (
        <section style={{ background: '#18101A', minHeight: '100vh', color: 'white' }}>
            <NavbarComponent isSticky={true} />
            <Box className="backdrop" style={{ backgroundColor: '#201824', color: 'white', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 120, paddingBottom: 40, paddingInline: '5%', border: '1.5px solid #32243a' }}>
                <Link href="/alumni/2021" style={{
                    color: '#e0d7f7',
                    marginBottom: 32,
                    alignSelf: 'flex-start',
                    fontWeight: 600,
                    fontSize: 17,
                    textDecoration: 'none',
                    backgroundColor: '#23172b',
                    padding: '12px 22px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.18)',
                    border: '1.5px solid #2a1533',
                    marginLeft: 0
                }}>
                    <span style={{ marginRight: '10px', fontSize: '20px' }}>←</span> Back to Batch
                </Link>

                {/* Personal Details Card */}
                <div style={{
                    background: 'linear-gradient(135deg, #22192A 60%, #2a1a2c 100%)',
                    borderRadius: 22,
                    padding: '48px',
                    boxShadow: '0 6px 32px rgba(60,0,80,0.22)',
                    width: '100%',
                    maxWidth: 1200,
                    textAlign: 'center',
                    border: '1.5px solid #3a1c4a',
                    wordBreak: 'break-word',
                    margin: '0 auto 32px auto',
                    color: '#e0d7f7'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 28
                    }}>
                        <div style={{
                            width: 200,
                            height: 200,
                            background: '#2a1533',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                            margin: '0 auto'
                        }}>
                            <img src={`/assets/images/2021/${user.pfp.replace('images/', '')}`} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <h1 style={{ margin: 0, color: '#e0d7f7', fontWeight: 800, fontSize: 36, wordBreak: 'break-word', letterSpacing: 0.5 }}>{user.name}</h1>
                            <p style={{ color: '#bba6d6', margin: '4px 0 12px 0', fontSize: 22, fontWeight: 500 }}>{user.branch}</p>
                            {user.tagline && <p style={{ color: '#e0d7f7', margin: '0 0 12px 0', fontSize: 18, fontStyle: 'italic' }}>&ldquo;{user.tagline}&rdquo;</p>}

                            <div style={{ color: '#bba6d6', marginBottom: 10, fontSize: 16 }}>
                                {user.nickname && <span style={{ marginRight: 18 }}>Nickname: <b style={{ color: '#e0d7f7' }}>{user.nickname}</b></span>}
                                {user.dob && <span>DOB: <b style={{ color: '#e0d7f7' }}>{user.dob}</b></span>}
                            </div>

                            <div style={{ margin: '18px 0' }}>
                                {user.instagram && (
                                    <a href={`https://instagram.com/${user.instagram}`} target="_blank" rel="noopener noreferrer" style={{
                                        marginRight: 24,
                                        color: '#E4405F',
                                        fontWeight: 600,
                                        fontSize: 17,
                                        textDecoration: 'none',
                                        backgroundColor: 'rgba(228, 64, 95, 0.1)',
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        transition: 'all 0.2s ease',
                                        display: 'inline-block'
                                    }}>
                                        Instagram
                                    </a>
                                )}
                                {user.linkedin && (
                                    <a href={user.linkedin} target="_blank" rel="noopener noreferrer" style={{
                                        color: '#1976d2',
                                        fontWeight: 600,
                                        fontSize: 17,
                                        textDecoration: 'none',
                                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        transition: 'all 0.2s ease',
                                        display: 'inline-block'
                                    }}>
                                        LinkedIn
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Journal Section */}
                {user.journal && user.journal.length > 0 && (
                    <div style={{
                        background: 'linear-gradient(135deg, #22192A 60%, #2a1a2c 100%)',
                        borderRadius: 22,
                        padding: '32px 48px',
                        boxShadow: '0 6px 32px rgba(60,0,80,0.22)',
                        width: '100%',
                        maxWidth: 1200,
                        border: '1.5px solid #3a1c4a',
                        wordBreak: 'break-word',
                        margin: '0 auto 32px auto',
                        color: '#e0d7f7'
                    }}>
                        <h2 style={{ fontSize: 26, color: '#e0d7f7', fontWeight: 700, marginBottom: 20, textAlign: 'center' }}>Journal</h2>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 16
                        }}>
                            {user.journal.map((entry, idx) => (
                                <div key={idx} style={{
                                    marginBottom: 16,
                                    background: '#201724',
                                    borderRadius: 12,
                                    padding: 20,
                                    color: '#e0d7f7',
                                    border: '1px solid #32243a',
                                    boxShadow: '0 3px 10px rgba(0,0,0,0.12)'
                                }}>
                                    <strong style={{ color: '#bba6d6', fontSize: 18, display: 'block', marginBottom: 8 }}>{entry.question}</strong>
                                    <div style={{ color: '#e0d7f7', marginTop: 4, lineHeight: 1.6 }}>{entry.answer}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Testimonials Section */}
                {user.testimonials && user.testimonials.length > 0 && (
                    <div style={{
                        background: 'linear-gradient(135deg, #22192A 60%, #2a1a2c 100%)',
                        borderRadius: 22,
                        padding: '32px 48px',
                        boxShadow: '0 6px 32px rgba(60,0,80,0.22)',
                        width: '100%',
                        maxWidth: 1200,
                        border: '1.5px solid #3a1c4a',
                        wordBreak: 'break-word',
                        margin: '0 auto',
                        color: '#e0d7f7'
                    }}>
                        <h2 style={{ fontSize: 26, color: '#e0d7f7', fontWeight: 700, marginBottom: 20, textAlign: 'center' }}>Testimonials</h2>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 16,
                        }}>
                            <div style={{
                                maxHeight: showAllTestimonials ? '2000px' : '800px',
                                overflow: 'hidden',
                                transition: 'max-height 0.8s ease-in-out',
                            }}>
                                {displayedTestimonials.map((t, idx) => (
                                    <div key={idx} style={{
                                        marginBottom: 16,
                                        background: '#201724',
                                        borderRadius: 12,
                                        padding: 20,
                                        color: '#e0d7f7',
                                        border: '1px solid #32243a',
                                        boxShadow: '0 3px 10px rgba(0,0,0,0.12)'
                                    }}>
                                        <div style={{ color: '#e0d7f7', fontStyle: 'italic', lineHeight: 1.6 }}>&quot;{t.text}&quot;</div>
                                        <div style={{ textAlign: 'right', color: '#ffb347', fontWeight: 700, marginTop: 8 }}>- {t.from}</div>
                                    </div>
                                ))}
                            </div>

                            {hasMoreTestimonials && (
                                <button
                                    onClick={() => setShowAllTestimonials(!showAllTestimonials)}
                                    style={{
                                        background: 'linear-gradient(135deg, #3a1c4a 0%, #461e5a 100%)',
                                        color: '#e0d7f7',
                                        border: 'none',
                                        padding: '12px 24px',
                                        borderRadius: 10,
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        marginTop: 16,
                                        alignSelf: 'center',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
                                        width: 'fit-content',
                                        margin: '0 auto'
                                    }}
                                >
                                    {showAllTestimonials ? 'Show Less' : 'Show More'}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </Box>
            <Bottom />
        </section>
    );
} 