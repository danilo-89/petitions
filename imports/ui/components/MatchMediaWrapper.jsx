// Bethany Drake - https://betterprogramming.pub/using-window-matchmedia-in-react-8116eada2588
import React, { useState, useEffect } from 'react';

const MatchMediaWrapper = ({ mobileContent, desktopContent }) => {
    const [isNarrowScreen, setIsNarrowScreen] = useState(false)
    useEffect(() => {
        const mediaWatcher = window.matchMedia("(max-width: 767px)")
        setIsNarrowScreen(mediaWatcher.matches);

        function updateIsNarrowScreen(e) {
            setIsNarrowScreen(e.matches);
        }
        if (mediaWatcher.addEventListener) {
            mediaWatcher.addEventListener('change', updateIsNarrowScreen)
            return function cleanup() {
                mediaWatcher.removeEventListener('change', updateIsNarrowScreen)
            }
        } else {
            mediaWatcher.addListener(updateIsNarrowScreen)
            return function cleanup() {
                mediaWatcher.removeListener(updateIsNarrowScreen)
            }
        }
    })

    return isNarrowScreen ? mobileContent : desktopContent;
}

export default MatchMediaWrapper;