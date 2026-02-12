import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare } from 'react-icons/fa'
import gsap from 'gsap'

const Footer = () => {
    const containerRef = useRef(null)
    const elementRefs = useRef([])

    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
            )
        }
        if (elementRefs.current.length) {
            gsap.fromTo(
                elementRefs.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.2,
                    delay: 0.3,
                    ease: "power2.out"
                }
            )
        }
    }, [])

    return (
        <footer ref={containerRef} className='bg-gray-900 text-gray-200 py-10'>
            <div className='max-w-7xl mx-auto px-4 md:flex md:justify-between'>
                {/* info */}
                <div ref={(el) => (elementRefs.current[0] = el)} className='mb-6 md:mb-0'>
                    <Link to='/'>
                        <h1 className='text-red-500 text-2xl font-bold'>HashStore</h1>
                    </Link>
                    <p className='mt-2 text-sm'>Powering Your World with the Best in Electronics.</p>
                    <p className='mt-2 text-sm'>123 Electronics St, Style City, NY 10001</p>
                    <p className='text-sm'>Email: support@HashStore.com</p>
                    <p className='text-sm'>Phone: (123) 456-7890</p>
                </div>
                {/* customer service link */}
                <div ref={(el) => (elementRefs.current[1] = el)} className='mb-6 md:mb-0'>
                    <h3 className='text-xl font-semibold'>Customer Service</h3>
                    <ul className='mt-2 text-sm space-y-2'>
                        <li>Contact Us</li>
                        <li>Shipping & Returns</li>
                        <li>FAQs</li>
                        <li>Order Tracking</li>
                        <li>Size Guide</li>
                    </ul>
                </div>
                {/* social media links */}
                <div ref={(el) => (elementRefs.current[2] = el)} className='mb-6 md:mb-0'>
                    <h3 className='text-xl font-semibold'>Follow Us</h3>
                    <div className='flex space-x-4 mt-2'>
                        <FaFacebook />
                        <FaInstagram />
                        <FaTwitterSquare />
                        <FaPinterest />
                    </div>
                </div>
                {/* newsletter subscription */}
                <div ref={(el) => (elementRefs.current[3] = el)}>
                    <h3 className='text-xl font-semibold'>Stay in the Loop</h3>
                    <p className='mt-2 text-sm'>Subscribe to get special offers, free giveaways, and more</p>
                    <form action="" className='mt-4 flex'>
                        <input
                            type="email"
                            placeholder='Your email address'
                            className='w-full p-2 rounded-l-md  text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500'
                        />
                        <button type='submit' className='bg-red-600 text-white px-4 rounded-r-md hover:bg-red-700'>Subscribe</button>
                    </form>
                </div>
            </div>
            {/* bottom section */}
            <div ref={(el) => (elementRefs.current[4] = el)} className='mt-8 border-t border-gray-700 pt-6 text-center text-sm'>
                <p>&copy; {new Date().getFullYear()} <span className='text-red-500'>HashStore</span>. All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer
