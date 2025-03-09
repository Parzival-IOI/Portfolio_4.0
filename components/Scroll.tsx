'use client'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import { Arrow } from './Icon'

const Scroll = () => {

    const {ref: _ref_, inView: _view} = useInView({
        // triggerOnce : true,
        threshold : 0.5,
        rootMargin : "0px",
        delay : 500,
    })

    const up = (e : React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }

    return (
        <>
            <div className='absolute w-1 top-[50vh] right-8' ref={_ref_}></div>
            <button type='button' onClick={(e) => up(e)} className={`w-10 aspect-square rounded-full bg-slate-900/80 flex justify-center items-center z-50 right-4 bottom-4 transition-opacity duration-1000 fixed opacity-0 ${_view ? '' : 'opacity-100 animate-bounce'}`}>
                <Arrow/>
            </button>
        </>
    )
}

export default Scroll