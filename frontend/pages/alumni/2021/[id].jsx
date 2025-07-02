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
        <section style={{ background: '#1f121A', minHeight: '100vh', color: 'white' }}>
            <NavbarComponent isSticky={true} />
            <Box className="backdrop" style={{ backgroundColor: '#1f121A', color: 'white', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 80 }}>
                <Link href="/alumni/2021" style={{
                    color: 'white',
                    marginBottom: 24,
                    alignSelf: 'flex-start',
                    fontWeight: 600,
                    fontSize: 16,
                    textDecoration: 'none',
                    backgroundColor: '#2d1e29',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <span style={{ marginRight: '8px', fontSize: '18px' }}>←</span> Back to Batch
                </Link>
                <div style={{ background: '#fff', borderRadius: 18, padding: 40, boxShadow: '0 2px 24px rgba(0,0,0,0.10)', maxWidth: 600, width: '100%', textAlign: 'center', border: '1.5px solid #e5e7eb', wordBreak: 'break-word' }}>
                    <div style={{
                        width: 200,
                        aspectRatio: '1/1',
                        background: '#f3f4f6',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        margin: '0 auto 24px auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
                    }}>
                        <img src={`/assets/images/2021/${user.pfp.replace('images/', '')}`} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '1/1' }} />
                    </div>
                    <h1 style={{ margin: 0, color: '#222', fontWeight: 700, fontSize: 32, wordBreak: 'break-word', textAlign: 'center' }}>{user.name}</h1>
                    <p style={{ color: '#888', margin: 0, fontSize: 18, wordBreak: 'break-word', textAlign: 'center' }}>{user.branch}</p>
                    <p style={{ color: '#888', margin: 0, fontSize: 16 }}>{user.tagline}</p>
                    <p style={{ color: '#888', margin: 0, fontSize: 16 }}>Nickname: {user.nickname}</p>
                    <p style={{ color: '#888', margin: 0, fontSize: 16 }}>DOB: {user.dob}</p>
                    <div style={{ margin: '18px 0' }}>
                        {user.instagram && (
                            <a href={`https://instagram.com/${user.instagram}`} target="_blank" rel="noopener noreferrer" style={{ marginRight: 20, color: '#E4405F', fontWeight: 500, fontSize: 18 }}>
                                Instagram
                            </a>
                        )}
                        {user.linkedin && (
                            <a href={user.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', fontWeight: 500, fontSize: 18 }}>
                                LinkedIn
                            </a>
                        )}
                    </div>
                    <Box style={{ textAlign: 'left', margin: '32px 0 16px 0' }}>
                        <h2 style={{ fontSize: 22, color: '#222', fontWeight: 600, marginBottom: 12 }}>Journal</h2>
                        {user.journal && user.journal.length > 0 ? user.journal.map((entry, idx) => (
                            <div key={idx} style={{ marginBottom: 16, background: '#f7f9fb', borderRadius: 8, padding: 12 }}>
                                <strong style={{ color: '#1976d2' }}>{entry.question}</strong>
                                <div style={{ color: '#444', marginTop: 4 }}>{entry.answer}</div>
                            </div>
                        )) : <div style={{ color: '#aaa' }}>No journal entries.</div>}
                    </Box>
                    <Box style={{ textAlign: 'left', margin: '32px 0 0 0' }}>
                        <h2 style={{ fontSize: 22, color: '#222', fontWeight: 600, marginBottom: 12 }}>Testimonials</h2>
                        {user.testimonials && user.testimonials.length > 0 ? user.testimonials.map((t, idx) => (
                            <div key={idx} style={{ marginBottom: 16, background: '#f7f9fb', borderRadius: 8, padding: 12 }}>
                                <div style={{ color: '#444', fontStyle: 'italic' }}>&quot;{t.text}&quot;</div>
                                <div style={{ textAlign: 'right', color: '#888', fontWeight: 500 }}>- {t.from}</div>
                            </div>
                        )) : <div style={{ color: '#aaa' }}>No testimonials.</div>}
                    </Box>
                </div>
            </Box>
            <Bottom />
        </section>
    );
} 