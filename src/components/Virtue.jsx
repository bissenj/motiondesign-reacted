/*
    Recreate this design
    https://dribbble.com/shots/5219377-Virtue-026

    Resources
    https://css-tricks.com/tips-for-writing-animation-code-efficiently/
*/

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './Virtue.module.css'


export default function VirtueDemo() {
  const [refresh, setRefresh] = useState(0);

  const app = useRef();
  // const circle = useRef();
  // const box = useRef();
  const contentBox = useRef();
  const menuBox = useRef();
  const menuTitle = useRef();
  const menuLinksContainer = useRef();
  const titleLetters = useRef([]);
  const menuLinks = useRef([]);
  const headerMenu = useRef();
  const imageWall = useRef();
  const heroImage = useRef();
  const button = useRef();
  const articleTitle = useRef();
  const articleText = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {      
      let tl = gsap.timeline({repeat: 0, repeatDelay: 2});   
      
      // Fade content box in
      tl.from(contentBox.current, { opacity: 0, duration: 1.0});

      // Slide content box down page
      tl.to(contentBox.current, { translateY: '80vh', duration: 1.2, ease: 'expo'});

      // Slide menu and content down
      tl.to(contentBox.current, { translateY: '100vh', duration: 1.2, ease: 'power4.out'}, '-=0.4');            
      tl.from(menuBox.current, { height: 60, translateY: '-20', duration: 1.2, ease: 'power4.out'}, '<');            
      tl.from(headerMenu.current, { opacity: 0, duration: 0.6, ease: 'power1.out'}, '<');

      // Animate menu title      
      tl.from(menuTitle.current, { translateX: 0, opacity: 0, duration: 1.2, ease: 'power1.inOut'}, '-=0.5');      

      // Animate menu letters   
      let i = 0;         
      for(i = 0; i < titleLetters.current.length; i++) {
        //console.log('i: ', i, titleLetters.current[i]);
        if (titleLetters.current[i]) {
          tl.from(titleLetters.current[i], { opacity: 0, rotateZ: 20, duration: 0.9, ease: 'power1.out'}, '-=0.8');
          //tl.to(titleLetters.current[i], { opacity: 1, duration: 0.5, ease: 'power1.out'});
        }
      }

      // Animate menu links
      let ml_stagger = '-=1.3';
      tl.from(menuLinks.current[2], { opacity: 0, duration: 1.5, ease: 'power1.out'}, '-=0.5');
      tl.from(menuLinks.current[2], { translateX: -8, duration: 0.3, ease: 'power1.in'}, ml_stagger);          

      tl.from(menuLinks.current[1], { opacity: 0, duration: 1.5, ease: 'power1.out'}, '<');
      tl.from(menuLinks.current[1], { translateX: -8, duration: 0.3, ease: 'power1.in'}, ml_stagger);      

      tl.from(menuLinks.current[0], { opacity: 0, duration: 1.5, ease: 'power1.out'}, '<');
      tl.from(menuLinks.current[0], { translateX: -8, duration: 0.3, ease: 'power1.in'}, ml_stagger); 
      
      //tl.from(menuLinks.current[1], { opacity: 0, translateX: -8, duration: 1.5,}, '-=1.2');
      //tl.from(menuLinks.current[2], { opacity: 0, translateX: -8, duration: 1.5,}, '-=1.2');

      // Image reveal
      tl.from(heroImage.current, { opacity: 0, duration: 0.2, ease: 'power1.inOut'}, '<');      
      tl.to(imageWall.current, { translateY: '100vh', duration: 0.7, ease: 'power4.in'}, '<');      
      tl.from(heroImage.current, { transform: 'scale(1.4)', duration: 0.2,  ease: 'power4.out'}, '<');
      tl.to(heroImage.current, { transform: 'scale(1.0)', duration: 1.5,  ease: 'power4.out'}, '-=0.5');

      // Article Links      
       tl.from(button.current, { translateY: '25px', duration: 0.7, ease: 'power4.out' }, '-=1.0');       
       tl.from(articleTitle.current, { translateY: '25px', duration: 0.7, ease: 'power4.out' }, '-=0.4');       
       tl.from(articleText.current, { translateY: '30px', opacity: 0, duration: 0.9, ease: 'power4.out' }, '-=0.2');       

    }, app);
    
    return () => ctx.revert();
  }, [refresh]);

  return (
    <div ref={app} className={styles.App}>
      <div ref={contentBox} className={styles.contentBox}>
        {/* TOP HEADER */}
        <div className={styles.topHeader}>
          <div ref={headerMenu} className={styles.headerMenu}>
              <span>&#10035; Menu</span>
              <span>Eng &#10035;</span>
          </div>
        </div>

        {/* MENU */}
        <div ref={menuBox} className={styles.menuBox}>          
          <div className={styles.menu}>
            <h1 ref={menuTitle} className={styles.title}>
              <div ref={el => {titleLetters.current.push(el)}} style={{display: 'inline'}}> V </div>
              <div ref={el => {titleLetters.current.push(el)}} style={{display: 'inline'}}> i </div>
              <div ref={el => {titleLetters.current.push(el)}} style={{display: 'inline'}}> r </div>
              <div ref={el => {titleLetters.current.push(el)}} style={{display: 'inline'}}> t </div>
              <div ref={el => {titleLetters.current.push(el)}} style={{display: 'inline'}}> u </div>
              <div ref={el => {titleLetters.current.push(el)}} style={{display: 'inline'}}> e </div>              
            </h1>            
            <div ref={menuLinksContainer} name='menu-links-container' className={styles.menuLinksContainer}>
              <div ref={el => {menuLinks.current.push(el)}} name='menu-links-1'>                
                <h3>Our Shop</h3>
                <p>Into Deep Emotions</p>
              </div>

              <div ref={el => {menuLinks.current.push(el)}} name='menu-links-2'>                
                <h3>Process</h3>
                <p>Monochrome Insights</p>
              </div>

              <div ref={el => {menuLinks.current.push(el)}} name='menu-links-3'>  
                <h3>The Magazine</h3>
                <p>Coastal California City</p>              
              </div>
            </div>
          </div>
        </div>

        {/* IMAGE */}
        <div className={styles.imageBox}>
          <div  ref={imageWall} className={styles.imageWall}></div>
          <img ref={heroImage} src='/img/fox.jpg' />
          <div className={styles.articleSummary}>

            <div style={{overflow:'hidden'}}>
              <button ref={button}>Play</button>
            </div>

            <div style={{overflow:'hidden'}}>
              <h2 ref={articleTitle}>Stealing Beauty.</h2>
            </div>

            <div style={{overflow:'hidden'}}>
              <p ref={articleText}>Not unlike the culture of it's namesake city, <u>New York Fashion Week</u> has long held a reputation, </p>              
            </div>
            
          </div>
        </div>

      </div>  

      <div className={styles.cta}
        onClick={() => {console.log('click'); setRefresh(refresh + 1)}}
      >
        <span>&#x21bb;</span>
      </div>
    </div>
  );

}