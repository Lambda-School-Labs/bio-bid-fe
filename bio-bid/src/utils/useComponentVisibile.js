import { useState, useEffect, useRef } from 'react';

export default (initialIsVisible) => {
    const [ isVisible, setIsVisible ] = useState(initialIsVisible);
    const ref = useRef(null);

    const handleClickOutside = e => {
        if(ref.current && !ref.current.contains(e.target)){
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [ref]);

    return { ref, isVisible, setIsVisible};
}