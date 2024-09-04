import './Heading.css'; 

import { useEffect, useState } from 'react';



function Heading(){
    const [slideIndex, setSlideIndex] = useState(0);
    const slideDuration = 3000; 

    useEffect(() => {
        const slides = document.querySelectorAll(".heading-pokeImage");
        if (slides.length > 0) {
            slides[slideIndex].classList.add("display");

            const intervalId = setInterval(() => {
                showNextSlide(slides);
            }, slideDuration);

            return () => clearInterval(intervalId); // Clean up on component unmount
        }
    }, [slideIndex]);

    function showNextSlide(slides) {
        slides[slideIndex].classList.remove("display");
        const nextIndex = (slideIndex + 1) % slides.length;
        setSlideIndex(nextIndex);
        slides[nextIndex].classList.add("display");
    }

    return(
        <>
        <div className="main-heading-container">
            <div className='dis-container'>
                <h1>Welcome To PokePedia</h1>
                <h3>A wikipedia for pokemons</h3>
            </div>
            <div className='image-slider'>
                <img src="./800px-0001Bulbasaur.png" alt="Image1" className='heading-pokeImage' id='heading-pokeImage'/>
                <img src="./800px-0004Charmander.png" alt="Image1" className='heading-pokeImage' id='heading-pokeImage'/>
                <img src="./800px-0007Squirtle.png" alt="Image1" className='heading-pokeImage' id='heading-pokeImage'/>
                <img src="./800px-0025Pikachu.png" alt="Image1" className='heading-pokeImage' id='heading-pokeImage'/>
            </div>
        </div>
        </>
    )
}

export default Heading