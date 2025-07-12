import NavbarComponent from "../../components/navbar";
import { Box, Grid } from "@mui/material";
import Bottom from "@components/footer";
import { useMediaQuery, useTheme } from "@mui/material";
import Link from "next/link";
import alumni2021 from "../../public/alumni_2021.json";
import React, { useState, useMemo, useEffect } from "react";

export default function Batch2021() {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));
    const [search, setSearch] = useState("");


    // Shuffle alumni only on client to avoid hydration mismatch
    const [shuffledAlumni, setShuffledAlumni] = useState(alumni2021);
    useEffect(() => {
        const arr = [...alumni2021];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        setShuffledAlumni(arr);
    }, []);

    // Filter alumni by search
    const filteredAlumni = useMemo(() => {
        if (!search) return shuffledAlumni;
        return shuffledAlumni.filter(user =>
            user.name?.toLowerCase().includes(search.toLowerCase()) ||
            user.branch?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, shuffledAlumni]);

    return (
        <section style={{ background: '#18101A', minHeight: '100vh', color: 'white', paddingTop: isXs ? 60 : 72 }}>
            <NavbarComponent isSticky={true} />
            <Box className="backdrop" style={{ backgroundColor: '#18101A', color: 'white' }}>
                <div className="yearbook-container" style={{ paddingTop: 32, paddingBottom: 8 }}>
                    <div className="text-content" style={{ textAlign: 'center', marginBottom: 12 }}>
                        <h1 className="title" style={{ fontSize: 40, fontWeight: 700, color: '#e0d7f7', marginBottom: 4, letterSpacing: 0.5 }}>Batch of 2021</h1>
                        <p className="subtitle" style={{ fontSize: 20, color: '#bba6d6', marginBottom: 0 }}>Meet the 2021 Alumni!</p>
                    </div>
                </div>
                {/* Search Bar */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 32px 0' }}>
                    <input
                        type="text"
                        placeholder="Search by name, branch, or email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{
                            padding: '14px 22px',
                            borderRadius: 12,
                            border: '1.5px solid #2a1533',
                            fontSize: 18,
                            width: isXs ? '90%' : 420,
                            outline: 'none',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            background: '#23172b',
                            color: '#e0d7f7',
                        }}
                    />
                </div>
                <Grid
                    container
                    spacing={3}
                    justifyContent="center"
                    alignItems="flex-start"
                    className="yearbooksGrid"
                    style={{ maxWidth: 1600, margin: '0 auto' }}
                >
                    {filteredAlumni.map((user, index) => (
                        <Grid
                            item
                            key={user.email || `user-${index}`}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            display="flex"
                            justifyContent="center"
                            alignItems="stretch"
                        >
                            <Link href={`/alumni/2021/${user.email ? user.email.split('@')[0] : `user-${index}`}`} style={{ textDecoration: 'none', width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <div className="alumniCard" style={{
                                    cursor: 'pointer',
                                    width: '100%',
                                    maxWidth: 340,
                                    // minHeight: 320,
                                    // maxHeight: 340,
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #23172b 60%, #2a1533 100%)',
                                    borderRadius: 18,
                                    boxShadow: '0 4px 24px rgba(60,0,80,0.18)',
                                    padding: 28,
                                    margin: '0 auto 24px auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    transition: 'transform 0.15s, box-shadow 0.15s',
                                    border: '1.5px solid #3a1c4a',
                                    boxSizing: 'border-box',
                                    justifyContent: 'flex-start',
                                    overflow: 'hidden',
                                }}
                                    onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(60,0,80,0.28)'; }}
                                    onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(60,0,80,0.18)'; }}
                                >
                                    <Box className="alumniCardLabel" style={{ alignItems: 'center', textAlign: 'center', width: '100%' }}>
                                        <div style={{
                                            width: '100%',
                                            aspectRatio: '1/1',
                                            background: '#2a1533',
                                            borderRadius: 16,
                                            overflow: 'hidden',
                                            marginBottom: 16,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            maxWidth: 180,
                                            maxHeight: 180,
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                        }}>
                                            <img src={`/assets/images/2021/${user.pfp.replace('images/', '')}`} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '1/1', display: 'block' }} />
                                        </div>
                                        <h2 style={{ margin: '8px 0 2px 0', fontSize: 24, fontWeight: 700, color: '#e0d7f7', wordBreak: 'break-word', textAlign: 'center', width: '100%', overflowWrap: 'break-word', letterSpacing: 0.2 }}>{user.name}</h2>
                                        <p style={{ color: '#bba6d6', margin: '0 0 8px 0', fontSize: 17, wordBreak: 'break-word', textAlign: 'center', width: '100%', overflowWrap: 'break-word', letterSpacing: 0.1 }}>{user.branch}</p>
                                    </Box>
                                </div>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Bottom />
        </section>
    );
} 