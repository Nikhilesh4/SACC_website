import { useRouter } from 'next/router';
import NavbarComponent from "../../../components/navbar";
import Bottom from "@components/footer";
import { Box, Grid } from "@mui/material";
import Link from "next/link";
import alumni2021 from "../../../public/alumni_2021.json";

export default function User2021() {
    const router = useRouter();
    const { id } = router.query;
    const user = alumni2021.find((u) => u.email && u.email.split('@')[0] === id);

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <section style={{ background: '#18101A', minHeight: '100vh', color: 'white' }}>
            <NavbarComponent isSticky={true} />
            <Box className="backdrop" style={{ backgroundColor: '#201824', color: 'white', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 120, paddingBottom: 40, paddingLeft: 40, border: '1.5px solid #32243a' }}>
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
                    <span style={{ marginRight: '10px', fontSize: '20px' }}>  </span> Back to Batch
                </Link>
                <div style={{ background: 'linear-gradient(135deg, #22192A 60%, #2a1a2c 100%)', borderRadius: 22, padding: '48px 48px 32px 48px', boxShadow: '0 6px 32px rgba(60,0,80,0.22)', maxWidth: 1200, width: '100%', textAlign: 'center', border: '1.5px solid #3a1c4a', wordBreak: 'break-word', margin: '0 auto', color: '#e0d7f7', display: 'flex', flexDirection: 'row', gap: 40, alignItems: 'flex-start', justifyContent: 'center' }}>
                    <div style={{
                        width: 260,
                        minWidth: 180,
                        aspectRatio: '1/1',
                        background: '#2a1533',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        margin: '0 0 0 0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.10)'
                    }}>
                        <img src={`/assets/images/2021/${user.pfp.replace('images/', '')}`} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '1/1' }} />
                    </div>
                    <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
                        <h1 style={{ margin: 0, color: '#e0d7f7', fontWeight: 800, fontSize: 36, wordBreak: 'break-word', textAlign: 'left', letterSpacing: 0.5 }}>{user.name}</h1>
                        <p style={{ color: '#bba6d6', margin: '4px 0 12px 0', fontSize: 22, fontWeight: 500 }}>{user.branch}</p>
                        {user.tagline && <p style={{ color: '#e0d7f7', margin: '0 0 12px 0', fontSize: 18, fontStyle: 'italic' }}>&ldquo;{user.tagline}&rdquo;</p>}
                        <div style={{ color: '#bba6d6', marginBottom: 10, fontSize: 16 }}>
                            {user.nickname && <span style={{ marginRight: 18 }}>Nickname: <b style={{ color: '#e0d7f7' }}>{user.nickname}</b></span>}
                            {user.dob && <span>DOB: <b style={{ color: '#e0d7f7' }}>{user.dob}</b></span>}
                        </div>
                        <div style={{ margin: '18px 0' }}>
                            {user.instagram && (
                                <a href={`https://instagram.com/${user.instagram}`} target="_blank" rel="noopener noreferrer" style={{ marginRight: 24, color: '#E4405F', fontWeight: 600, fontSize: 19, textDecoration: 'none' }}>
                                    Instagram
                                </a>
                            )}
                            {user.linkedin && (
                                <a href={user.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', fontWeight: 600, fontSize: 19, textDecoration: 'none' }}>
                                    LinkedIn
                                </a>
                            )}
                        </div>
                        <Box style={{ textAlign: 'left', margin: '32px 0 16px 0' }}>
                            <h2 style={{ fontSize: 22, color: '#e0d7f7', fontWeight: 700, marginBottom: 12 }}>Journal</h2>
                            {user.journal && user.journal.length > 0 ? user.journal.map((entry, idx) => (
                                <div key={idx} style={{ marginBottom: 16, background: '#201724', borderRadius: 8, padding: 14, color: '#e0d7f7', border: '1px solid #32243a' }}>
                                    <strong style={{ color: '#bba6d6' }}>{entry.question}</strong>
                                    <div style={{ color: '#e0d7f7', marginTop: 4 }}>{entry.answer}</div>
                                </div>
                            )) : <div style={{ color: '#aaa' }}>No journal entries.</div>}
                        </Box>
                        <Box style={{ textAlign: 'left', margin: '32px 0 0 0' }}>
                            <h2 style={{ fontSize: 22, color: '#e0d7f7', fontWeight: 700, marginBottom: 12 }}>Testimonials</h2>
                            {user.testimonials && user.testimonials.length > 0 ? user.testimonials.map((t, idx) => (
                                <div key={idx} style={{ marginBottom: 16, background: '#201724', borderRadius: 8, padding: 14, color: '#e0d7f7', border: '1px solid #32243a' }}>
                                    <div style={{ color: '#e0d7f7', fontStyle: 'italic' }}>&quot;{t.text}&quot;</div>
                                    <div style={{ textAlign: 'right', color: '#ffb347', fontWeight: 700 }}>- {t.from}</div>
                                </div>
                            )) : <div style={{ color: '#aaa' }}>No testimonials.</div>}
                        </Box>
                    </div>
                </div>
            </Box>
            <Bottom />
        </section>
    );
} 