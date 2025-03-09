'use client';
import Link from "next/link"
import StaticNavBar from "./StaticNavBar"
import { useInView } from "react-intersection-observer";
import { usePathname } from "next/navigation";

const NavigationBar = () => {

  const navigationItems = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' },
    { name: 'Projects', link: '/projects' },
    { name: 'blog', link: 'https://parzival-blog.vercel.app/' },
  ];

  const navigationPage = [
    { name: 'About', link: 'about' },
    { name: 'Experience', link: 'experiences' },
    { name: 'Contact', link: 'contact' },
  ]

  const {ref: _ref_, inView: _view} = useInView({
    // triggerOnce : true,
    threshold : 0.5,
    rootMargin : "200px",
    delay : 500,
  })

  const path = usePathname();


  return (
    <nav className="">
      <ul className="flex justify-center items-center gap-8 h-16 dark:bg-slate-900 shadow-xs dark:shadow-slate-800 px-10" ref={_ref_}>
        {navigationItems.map((item, index) => {
          return (
            <>
              {path === item.link ? (
                <li key={index} className="first:mr-auto">
                  <Link href={item.link} className="active_navigation">
                    {item.name}
                  </Link>
                </li>
              ) : (
                <li key={index} className="first:mr-auto">
                  <Link href={item.link} className="animation_navigation">
                    {item.name}
                  </Link>
                </li>
              )
              }
            </>
          )
        })}
      </ul>
      <StaticNavBar data={navigationPage} isShow={_view} active={path} />
    </nav>
  )
}

export default NavigationBar