import { useContext, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { CiLogout,CiBellOn,CiSettings } from "react-icons/ci";
import { IoMdContact } from "react-icons/io";


//icons
const UserIcon = styled(FaRegUser)`
  font-size: 1rem;
  margin-right: 3px;
  `;
const EmotionIcon = styled(MdOutlineEmojiEmotions)`
  font-size: 1.3rem;
  margin-right: 3px;
  `;
const ReminderIcon = styled(CiBellOn)`
  font-size: 1.3rem;
  `;
const LogoutIcon = styled(CiLogout)`
  font-size: 1rem;
  margin-right: 3px;
  `;
const SettingIcon = styled(CiSettings)`
  font-size: 1rem;
  margin-right: 3px;
  `;
 

const HeaderContainer = styled.header`
  background-color: #FFFF;
  color: white;
  padding: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;
// Central Container (panel & emotions) 
const CenterLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0 auto; /* Centra este grupo en el nav */
`;

// Right Container (Reminders y Logout)
const RightLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;

`;

const NavLink = styled.a`
  color: #1F5AAE;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem
  &:hover {
    text-decoration: underline;
  }
`;

const ButtonLink = styled(NavLink)`
font-weight: normal;
  background-color: #1F5AAE;
  color: #FFFFFF;
  padding: 0.4rem 1rem;
  border-radius: 4px;
`;

const Titulo = styled.h1`
  color: ${props => props.color || 'black'};
  font-size: ${props => props.size || '2em'};
`;
const Title = styled.a`
  color: #1F5AAE;
  margin-top: 0;
`;

/* avatar and dropdown */
const AvatarIcon = styled(IoMdContact)`
  font-size: 40px; 
  color: #1F5AAE;  
  padding: 4px;
`;
const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  width: 200px;
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  gap: 0.5rem;
  &:hover {
    background-color: #f1f1f1;
  }
`;
const UserName = styled.span`
  color: #2C3D4F; 
  font-weight: bold;
`;

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo>
          <Link href="/">
            <Title>♥️ Terapia Emocional</Title>
          </Link>
        </Logo>
        {user && (
          <CenterLinks>
            <Link href="/dashboard">
              <NavLink>
                <UserIcon /> Panel
              </NavLink>
            </Link>
            <Link href="/emotions">
              <NavLink>
                <EmotionIcon /> Emociones
              </NavLink>
            </Link>
          </CenterLinks>
        )}
        {/* Enlaces de la derecha */}
        <RightLinks>
          {user ? (
            <>
              <Link href="/reminders">
                <NavLink>
                  <ReminderIcon />
                </NavLink>
              </Link>
              <AvatarContainer onClick={toggleDropdown}>
              {user.avatar ? (
                 <Avatar src={user.avatar} alt="Avatar" />
                  ) : (
                <AvatarIcon />
              )}
                <UserName>{user.name}</UserName>
                {isDropdownOpen && (
                  <Dropdown>
                    <DropdownItem onClick={logout}>
                      <LogoutIcon/>Cerrar sesión
                    </DropdownItem>
                    <DropdownItem>
                      <SettingIcon/>Configuración
                    </DropdownItem>
                  </Dropdown>
                )}
              </AvatarContainer>
            </>
          ) : (
            <>
              <Link href="/login">
                <NavLink>Iniciar Sesión</NavLink>
              </Link>
              <Link href="/register">
                <ButtonLink>Registro</ButtonLink>
              </Link>
            </>
          )}
        </RightLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;