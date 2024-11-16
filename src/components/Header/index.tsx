import {Button} from "../ui/button.tsx";
import {Cross1Icon, HamburgerMenuIcon} from "@radix-ui/react-icons";
import {pages} from "../../constants/pages.tsx";
import {motion} from "framer-motion";
import Link from "../Link";
import { observer } from "mobx-react-lite";
import {authStore} from "../../stores/authStore";
import { useNavigate } from 'react-router-dom';
import {useCard} from "../../contexts/CardProvider.tsx";
import {useState} from "react";

interface IProps {
    isMenuOpen: boolean;
    toggleMenu: (flag: boolean) => void
}

export const Header = observer((props: IProps) => {
    const { isMenuOpen, toggleMenu} = props;
    const [open, setOpen] = useState<boolean>(false);
    const { card } = useCard();
    const { logout, isLoggedIn } = authStore;
    const navigate = useNavigate();

    const onHanldeClose = () => {
        setOpen(state => !state)
        toggleMenu(!open)
    }

    return (<div className="absolute left-0 top-0 w-full">
        <div></div>

        <div
            className={`fixed inset-y-0 left-0 z-20 w-64 md:w-full p-4 bg-white shadow-md transition-transform transform ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } md:relative md:translate-x-0`}
        >
            <Button
                variant={'secondary'}
                onClick={() => onHanldeClose()}
                className="z-50 absolute left-full md:hidden"
            >
                {isMenuOpen ? <Cross1Icon/> : <HamburgerMenuIcon/>}
            </Button>
            <nav className="flex flex-col md:flex-row h-full">
                {Object.keys(pages).map((key) => {
                    const {path, label, hidden, isProtected} = pages[key];

                    return hidden ? null : (
                        <motion.a
                            key={key}
                            whileHover={{scale: 1.1}}
                        >{
                            isProtected ? isLoggedIn && <Link
                                key={path}
                                to={path}
                                variant={'secondary'}
                                size={'md'}
                                className={(isActive) => isActive ? "active-link" : ""}
                            >
                                {label}
                            </Link> : <Link
                                key={path}
                                to={path}
                                variant={'secondary'}
                                size={'md'}
                                className={(isActive) => isActive ? "active-link" : ""}
                            >
                                {label}
                            </Link>
                        }

                        </motion.a>
                    );
                })}
                <div className={'flex-1 flex md:justify-end'}>
                    <div className={'flex md:justify-end'}>
                        {isLoggedIn && card.total ?
                            <Link to={pages.basket.path} variant={'primary'} size={'md'}>{pages.basket.label}</Link> : null}

                        {!isLoggedIn &&
                            <Link to="/login" className={(isActive) => isActive ? "active-link" : ""}>Login</Link>}

                        {isLoggedIn && (
                            <Button
                                variant={'destructive'}
                                onClick={() => {
                                    logout()

                                    navigate(pages.auth.path);
                                    // setIsMenuOpen(false); // Close menu on logout
                                }}
                            >
                                Log out
                            </Button>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    </div>)
});