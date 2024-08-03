import {
    MenuMenu,
    MenuItem,
    Menu,
    DropdownMenu,
    DropdownItem,
    DropdownDivider,
    Dropdown,
    Icon
} from 'semantic-ui-react'
import { useAuth } from '../auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const options = [
    {
        key: 'user',
        text: (
            <span>
                Signed in as <strong>⮥</strong>
            </span>
        ),
        disabled: true,
    },
    { 
        key: 'aboutus',
        text: 'About us',
        value: 'aboutus',
        icon: "info"
    },
    { 
        key: 'logout',
        text: 'Sign Out',
        value: 'logout',
        icon: "sign out" 
    }
];


export function MenuNavBar() {

    const { doLogout, login } = useAuth();
    const navigate = useNavigate();
    const onAboutUs = (e, data) => navigate('/about-us');
    const onCart = (e, data) => navigate('/cart');

    const handlerActiveItemClick = (e, component) => {
        e.preventDefault(); 
        switch (component.name) {
            case 'home':
                navigate('/');
                break;
            case 'cart':
                navigate('/cart');
                break;
            case 'users':
                navigate('/users');
                break;
            default:
                break;
        }
    };

    const handlerOnChangeSelectOptionsMenuRight = (e, { value }) => {
        switch (value) {
            case 'logout':
                doLogout();
                break;
            case 'aboutus':
                navigate("/about-us");
                break;
            default:
                break;
        }
    };

    return (<>
        <Menu fixed='top' color='blue' inverted pointing secondary >

            <Dropdown icon="settings" className='link item'>
                <DropdownMenu >
                    <DropdownItem icon='cart' text='Go to cart...' onClick={(e, data) => onCart(e, data)} />
                    <DropdownItem icon='info' text='About us' onClick={ (e, data) => onAboutUs(e, data)}/>
                    <DropdownDivider />
                    <DropdownItem disabled icon='setting' text='Settings' />
                </DropdownMenu>
            </Dropdown>

            <MenuItem
                icon='home'
                name='home'
                onClick={handlerActiveItemClick}
            />
            <MenuItem
                icon='cart'
                name='cart'
                onClick={handlerActiveItemClick}
            />
            <MenuItem
                icon='users'
                name='users'
                onClick={handlerActiveItemClick}
            />
            <MenuMenu position='right'>
                <Dropdown
                    item
                    simple
                    options={options}
                    trigger={<span>
                        <Icon color='green' name='user' /> {`Hello, ${login.user?.username}`}
                    </span>}
                    onChange={handlerOnChangeSelectOptionsMenuRight}
                />
            </MenuMenu>
        </Menu>
    </>);
}