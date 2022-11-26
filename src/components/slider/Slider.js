import { useEffect, useState, useCallback, useRef } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { sliderData } from "./slider-data";
import "./Slider.scss";

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderLength = sliderData.length;
  const autoSlide = true;
  let slideInterval = useRef();
  let intervalTime = 5000;



  const nextSlide = useCallback(() => {
    /**
     * 0 === 3 - 1 ? 0 : 0 + 1;
     * 1 === 3 - 1 ? 0 : 1 + 1;
     * 2 === 3 - 1 ? 0 : 2 + 1;
     * 0 === 3 - 1 ? 0 : 0 + 1;
     */
    // current => current === 3 - 1 ? 0 : current + 1;
    setCurrentSlide(current => current === sliderLength - 1 ? 0 : current + 1);
  }, [sliderLength])

  const prevSlide = () => {
    /**
     * 0 === 0 ? 3 - 1 : 0 - 1;
     * 2 === 0 ? 3 - 1 : 2 - 1;
     * 1 === 0 ? 3 - 1 : 1 - 1;
     * 0 === 0 ? 3 - 1 : 0 - 1
     */
    // current => current === 0 ? 3 - 1 : current - 1;
    setCurrentSlide(current => current === 0 ? sliderLength - 1 : current - 1);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, [])

  const auto = useCallback(() => {
    slideInterval.current = setInterval(nextSlide, intervalTime);
  }, [intervalTime, nextSlide])
  
  useEffect(() => {
    if (autoSlide) {
      auto();
    }
    
    /** Cleanup logic function
     * The clean up function runs not only during unmount, but before every re-render with changed dependencies
     * Your cleanup logic should be "symmetrical" to the setup logic, and should stop or undo whatever setup did
     */
    return () => clearInterval(slideInterval);
  }, [ auto, autoSlide, slideInterval ])

  return (
    <div className="slider">
      <BsArrowLeftCircle className="arrow prev" onClick={prevSlide} />
      <BsArrowRightCircle className="arrow next" onClick={nextSlide} />

      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <>
                <img src={image} alt="Slide" />
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <a href="#products" className="--btn --btn-primary">
                    Shop Now
                  </a>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Slider;
