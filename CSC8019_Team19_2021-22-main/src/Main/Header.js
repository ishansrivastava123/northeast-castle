
import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import React from "react";
import CastleIcon from '@mui/icons-material/Castle';
import HomeIcon from '@mui/icons-material/HomeRounded';
import InfoRounded from '@mui/icons-material/InfoRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import './Styling.css';
import { Row, Col, Dropdown } from 'react-bootstrap';
import { Link } from "@reach/router";
import { useState, useEffect } from 'react';
import { navigate } from "@reach/router";

const useStyles = makeStyles(() => ({
    header: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    logo: {
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        color: "#FFFEFE",
        textAlign: "left",
    },
}));

export default function Header() {

    const { header } = useStyles();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [customerName, setCustomerName] = useState(null);
    const handleLogout = () => {
        localStorage.removeItem("isLogin");
        localStorage.removeItem("customerId");
        localStorage.removeItem("customerName");
        setIsLoggedIn(false);
        setCustomerName(null);
        navigate("/home");
    };
    const handleAccountDetails = () => {
        navigate("/accountDetails/"+localStorage.getItem("customerId"));
    };
    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("isLogin"));
        setCustomerName(localStorage.getItem("customerName"));
    }, [])
    const displayDesktop = () => {
        return <Toolbar>
            <Row className="headerTab">
                <Col xs="6" lg="4" className="headerLogo">
                    <p className="headerName">North East Castles</p>
                    <CastleIcon sx={{ fontSize: '7vmin', color: '#2e0106' }} />
                </Col>
                <Col xs="6" lg="8" className="headerPills">
                    <Link to="/home">
                        <div className="headerHome">
                            Home<HomeIcon sx={{ fontSize: '4.5vmin', color: '#2e0106' }} />
                        </div>
                    </Link>
                    <Link to="/castle-info">
                        <div className="headerHome">
                            Castle Info<InfoRounded sx={{ fontSize: '4.5vmin', color: '#2e0106' }} />
                        </div>
                    </Link>
                    {!isLoggedIn && <Link to="/signin">
                        <div className="headerHome">
                            Log In<AccountCircleRoundedIcon sx={{ fontSize: '4.5vmin', color: '#2e0106' }} />
                        </div>
                    </Link>}
                    {isLoggedIn &&
                        <div className="headerHome">
                            Hi, {customerName}
                            <Dropdown drop="start" style={{display:'inline'}}>
                                <Dropdown.Toggle variant="light" id="dropdown-basic" style={{padding:'0.5vmin', color: '#2e0106'}}>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleAccountDetails}>Account Details</Dropdown.Item>
                                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    }
                </Col>
            </Row>
        </Toolbar>;
    };

    return (
        <header>
            <AppBar style={{ background: 'transparent', boxShadow: 'none' }} className={header}>{displayDesktop()}</AppBar>
        </header>
    );

}