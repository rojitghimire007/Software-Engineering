import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

const useKeyPress = (keys:any, callback:any, node=null) => {

    // use the Callback ref
    const callbackRef = useRef(callback);
    useLayoutEffect(() => {
        callbackRef.current = callback;
    });

    const handleKeyPress = useCallback((event) => {
        if (keys.some((key:any) => event.key === key)) {
            // console.log('*add Pipe Command*');
            callbackRef.current(event);
        };
    }, [keys]);

    useEffect(() => {
        const targetNode = node ?? document;

        //start listening
        targetNode &&
            targetNode.addEventListener('keydown', handleKeyPress);

        //stop listening
        return () => {
            targetNode &&
                targetNode.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress, node]);
};

export default useKeyPress;